"""Start a local PostgreSQL cluster using bundled binaries (still PostgreSQL).

Used when a system PostgreSQL install is not available. Data lives in .pgdata/.
"""

from __future__ import annotations

import os
import subprocess
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PGDATA = ROOT / ".pgdata"
LOG = PGDATA / "server.log"
BIN = Path(__file__).resolve().parents[1] / ".venv" / "Lib" / "site-packages" / "embedded_postgres" / "pginstall" / "bin"
PORT = "54329"
USER = "postgres"
DB = "sharepal"


def exe(name: str) -> str:
    candidate = BIN / f"{name}.exe"
    if candidate.exists():
        return str(candidate)
    return str(BIN / name)


def run(args: list[str], timeout: int = 60) -> subprocess.CompletedProcess[str]:
    env = os.environ.copy()
    env["PATH"] = str(BIN) + os.pathsep + env.get("PATH", "")
    env["PGPORT"] = PORT
    return subprocess.run(
        args,
        cwd=str(BIN),
        env=env,
        check=True,
        timeout=timeout,
        capture_output=True,
        text=True,
    )


def ready() -> bool:
    try:
        run([exe("pg_isready"), "-h", "127.0.0.1", "-p", PORT, "-U", USER], timeout=10)
        return True
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, FileNotFoundError):
        return False


def main() -> None:
    PGDATA.mkdir(parents=True, exist_ok=True)
    if not (PGDATA / "PG_VERSION").exists():
        print("Initializing PostgreSQL cluster...")
        run(
            [
                exe("initdb"),
                "-D",
                str(PGDATA),
                "-U",
                USER,
                "--auth=trust",
                "--encoding=UTF8",
                "--locale=C",
            ],
            timeout=90,
        )
    if not ready():
        print("Starting PostgreSQL...")
        run(
            [
                exe("pg_ctl"),
                "-D",
                str(PGDATA),
                "-l",
                str(LOG),
                "-w",
                "-t",
                "20",
                "-o",
                f"-p {PORT} -h 127.0.0.1",
                "start",
            ],
            timeout=30,
        )
        for _ in range(20):
            if ready():
                break
            time.sleep(0.5)
        else:
            raise SystemExit("PostgreSQL did not become ready")
    try:
        run([exe("createdb"), "-h", "127.0.0.1", "-p", PORT, "-U", USER, DB], timeout=20)
        print(f"Created database {DB}")
    except subprocess.CalledProcessError as exc:
        if "already exists" not in (exc.stderr or "") + (exc.stdout or ""):
            print(exc.stdout)
            print(exc.stderr)
    url = f"postgresql+psycopg://{USER}@127.0.0.1:{PORT}/{DB}"
    print(url)


if __name__ == "__main__":
    main()
