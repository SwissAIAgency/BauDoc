"""Compose a side-by-side dashboard comparison image."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

base = Path(r"C:\Users\joshu\SwissAIAgencyUseCases\BauDocu\baufortschritt-dokumentation-app\frontend\prototypes\screenshots")
before = Image.open(base / "dashboard-before.png")
after = Image.open(base / "dashboard-after.png")

# Crop to dashboard area (top 1200px, exclude sidebar at 240px width)
# We want a clean dashboard view
W = 1200  # final width per panel
H = 1200  # final height per panel
crop_box = (240, 60, 240 + W, 60 + H)
b_crop = before.crop(crop_box)
a_crop = after.crop(crop_box)

# Side by side
gap = 20
out_w = W * 2 + gap
out_h = H + 80  # space for label
out = Image.new("RGB", (out_w, out_h), (24, 28, 32))
out.paste(b_crop, (0, 60))
out.paste(a_crop, (W + gap, 60))

# Labels
draw = ImageDraw.Draw(out)
try:
    font = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 28)
    sub = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 16)
except Exception:
    font = ImageFont.load_default()
    sub = font

draw.text((20, 18), "VORHER · Borders + flach", fill=(163, 172, 184), font=font)
draw.text((W + gap + 20, 18), "NACHHER · Surfaces + Edge-Shadow", fill=(102, 128, 72), font=font)

out_path = base / "dashboard-comparison.png"
out.save(out_path, optimize=True)
print(f"OK -> {out_path} {out.size}")
