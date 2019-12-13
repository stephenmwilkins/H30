


from PIL import Image, ImageOps, ImageEnhance
import glob, os


for infile in glob.glob('original/*'):

    f = infile.split('/')[-1]
    im = Image.open(infile)

    print(f, im.size)

    ipad = ImageOps.fit(im, (512,768), method=Image.ANTIALIAS, bleed=0.0, centering=(0.5, 0.5))
    ipad.save(f'ipad/{f}')

    console = ImageOps.fit(im, (1080,1080), method=Image.ANTIALIAS, bleed=0.0, centering=(0.5, 0.5))
    console.save(f'console/{f}')
