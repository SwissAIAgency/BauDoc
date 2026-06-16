"""Crop a high-res hero+kpi+row3 region from the existing full-page screenshots."""
from PIL import Image
from pathlib import Path

base = Path(r"C:\Users\joshu\SwissAIAgencyUseCases\BauDocu\baufortschritt-dokumentation-app\frontend\prototypes\screenshots")
for name in ("dashboard-before.png", "dashboard-after.png"):
    img = Image.open(base / name)
    w, h = img.size
    print(f"{name}: {w}x{h}")
    # Hero + KPI grid (top ~900px at 1440 wide), then 3-col row to ~1500
    # Crop generously; we want enough to see borders/shadows clearly.
    crop = img.crop((0, 0, w, min(1600, h)))
    out = base / name.replace(".png", "-crop.png")
    crop.save(out, optimize=True)
    print(f"  -> {out.name} {crop.size}")
