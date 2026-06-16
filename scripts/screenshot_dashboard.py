"""Screenshot helper for VisiDoc prototype comparison."""
import sys
import asyncio
from pathlib import Path

from playwright.async_api import async_playwright


async def shoot(url: str, out: str, viewport=(1440, 1800), full_page=True):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": viewport[0], "height": viewport[1]})
        page = await ctx.new_page()
        await page.goto(url, wait_until="networkidle", timeout=20000)
        await page.wait_for_timeout(800)
        await page.screenshot(path=out, full_page=full_page)
        await browser.close()
        print(f"OK -> {out}")


if __name__ == "__main__":
    url = sys.argv[1]
    out = sys.argv[2]
    vp_w = int(sys.argv[3]) if len(sys.argv) > 3 else 1440
    vp_h = int(sys.argv[4]) if len(sys.argv) > 4 else 1800
    full = (sys.argv[5].lower() != "viewport") if len(sys.argv) > 5 else True
    asyncio.run(shoot(url, out, (vp_w, vp_h), full_page=full))
