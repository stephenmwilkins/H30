


from PIL import Image, ImageOps, ImageEnhance
import glob, os


# 5120 x 2880 # max resolution
# 2560 x 1440 # default
# 3200 x 1800

for infile in glob.glob('original/*'):

    f = infile.split('/')[-1]
    im = Image.open(infile)

    print(f, im.size)

    thumb = ImageOps.fit(im, (180,180), method=Image.ANTIALIAS, bleed=0.0, centering=(0.5, 0.5))
    thumb.save(f'thumb/{f}')

    thumbg = ImageEnhance.Color(thumb).enhance(0.2)
    thumbg.save(f'thumbg/{f}')

    ipad = ImageOps.fit(im, (820,461), method=Image.ANTIALIAS, bleed=0.0, centering=(0.5, 0.5))
    ipad.save(f'preview_ipad/{f}')

    console = ImageOps.fit(im, (1080,1080), method=Image.ANTIALIAS, bleed=0.0, centering=(0.5, 0.5))
    console.save(f'preview_console/{f}')
