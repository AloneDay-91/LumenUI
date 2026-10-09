from PIL import Image, ImageDraw, ImageFont
F="/workspace/lumen-ui-logo/final"
FONT="/usr/share/fonts/truetype/sand-box/google/Inter/Inter-VariableFont_opsz,wght.ttf"
MONO="/usr/share/fonts/truetype/sand-box/google/JetBrains Mono/JetBrainsMono-VariableFont_wght.ttf"
W,H=1800,1500
B=Image.new("RGB",(W,H),"#ffffff"); d=ImageDraw.Draw(B)
f1=ImageFont.truetype(FONT,30); fl=ImageFont.truetype(MONO,16)
d.text((40,30),"Lumen UI — brand kit",fill="#171717",font=f1)
def L(p): return Image.open(f"{F}/{p}").convert("RGBA")
def panel(x,y,w,h,bg,img,label,maxw=None,maxh=None):
    d.rounded_rectangle([x,y,x+w,y+h],radius=16,fill=bg,outline="#d8d7d4")
    im=img.copy(); im.thumbnail((maxw or w-80,maxh or h-70))
    B.paste(im,(x+(w-im.width)//2,y+(h-im.height)//2-8),im)
    d.text((x+16,y+h-28),label,fill="#737373" if bg!="#111111" else "#a1a1a1",font=fl)
# row1 horizontal lockups
panel(40,90,840,260,"#fcfcf9",L("png/lockup-horizontal/lumen-lockup-horizontal-black-2048.png"),"lockup horizontal · #171717",maxw=620)
panel(920,90,840,260,"#111111",L("png/lockup-horizontal/lumen-lockup-horizontal-light-2048.png"),"lockup horizontal · #f5f4ef",maxw=620)
# row2 symbols + stacked + wordmark
y=380
panel(40,y,300,300,"#fcfcf9",L("png/symbol/black/lumen-symbol-black-1024.png"),"K2 symbole",200,200)
panel(360,y,300,300,"#111111",L("png/symbol/light/lumen-symbol-light-1024.png"),"K2 symbole",200,200)
panel(680,y,300,300,"#fcfcf9",L("png/symbol-small/black/lumen-symbol-small-black-1024.png"),"K4 petite taille",200,200)
panel(1000,y,300,300,"#111111",L("png/symbol-small/light/lumen-symbol-small-light-1024.png"),"K4 petite taille",200,200)
panel(1320,y,440,300,"#fcfcf9",L("png/lockup-stacked/lumen-lockup-stacked-black-1024.png"),"lockup vertical",280,200)
# row3 wordmark, pure versions
y=710
panel(40,y,560,180,"#fcfcf9",L("png/wordmark/lumen-wordmark-black-1024.png"),"wordmark seul",maxw=380)
panel(620,y,560,180,"#ffffff",L("png/lockup-horizontal/lumen-lockup-horizontal-pure-black-1024.png"),"noir pur #000",maxw=380)
panel(1200,y,560,180,"#000000",L("png/lockup-horizontal/lumen-lockup-horizontal-pure-white-1024.png"),"blanc pur #fff",maxw=380)
# row4 icons
y=920
d.rounded_rectangle([40,y,1760,y+240],radius=16,fill="#f3f3f0",outline="#d8d7d4")
x=80
for p,lab in (("favicon/favicon-16.png","16"),("favicon/favicon-32.png","32"),("favicon/favicon-48.png","48"),("app-icon/apple-touch-icon.png","apple 180"),("app-icon/android-chrome-192x192.png","android 192"),("app-icon/maskable-512x512.png","maskable 512 (→180)")):
    im=L(p)
    if im.width>180: im=im.resize((180,180),Image.LANCZOS)
    B.paste(im,(x,y+30+(180-im.height)//2),im); d.text((x,y+212),lab,fill="#737373",font=fl); x+=max(im.width,60)+70
# row5 OG
y=1190
for i,s in enumerate(("dark","light")):
    im=L(f"social/og-image-{s}.png").resize((540,284),Image.LANCZOS); B.paste(im,(40+i*580,y),im)
    d.text((40+i*580,y+290),f"og-image-{s}.png · 1200×630",fill="#737373",font=fl)
d.text((1240,y+20),"Couleurs",fill="#171717",font=ImageFont.truetype(FONT,22))
for i,(c,n) in enumerate((("#171717","#171717 noir"),("#f5f4ef","#f5f4ef clair"),("#000000","#000000"),("#ffffff","#ffffff"))):
    d.rounded_rectangle([1240,y+60+i*50,1280,y+100+i*50],radius=6,fill=c,outline="#d8d7d4"); d.text((1295,y+70+i*50),n,fill="#171717",font=fl)
B.save(f"{F}/overview.png")
