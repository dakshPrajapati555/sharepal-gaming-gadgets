def derive_category(name: str) -> str:
    """Map a supplied product name to a filterable category.

    The JSON has no category field. This is a seed-time transform only.
    """
    lowered = name.lower()
    if "portal" in lowered:
        return "Accessory"
    if "racing wheel" in lowered:
        return "Racing Wheel"
    if "digital game" in lowered:
        return "Game Bundle"
    if lowered.startswith(("fc25", "fc24", "fc26", "fc27")) and "ps5" not in lowered:
        return "Game Bundle"
    return "PS5 Console"
