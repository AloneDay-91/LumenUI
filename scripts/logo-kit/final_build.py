import os, io, json, cairosvg
from PIL import Image, ImageDraw, ImageFont
exec(open("/workspace/lumen-ui-logo/v5/lib5.py").read().replace('/v5"','/final"'))
F="/workspace/lumen-ui-logo/final"
K2=kdiag(9,[4,4,4,4,4,2,2,1])()      # 9x9 units
K4=kz(7,[4,4,4,4,2,2,2],r=0.1)()      # 7x7 units
MARKS={"K2":(K2,9),"K4":(K4,7)}
COL={"black":"#171717","light":"#f5f4ef","pure-black":"#000000","pure-white":"#ffffff"}
BG={"black":"#fcfcf9","light":"#111111","pure-black":"#ffffff","pure-white":"#000000"}
def P(g,s=1,ox=0,oy=0): return to_path(g,s,ox,oy)
def mk(*p): os.makedirs(os.path.join(F,*p),exist_ok=True); return os.path.join(F,*p)
def save_png(svg,path,w,h=None):
    cairosvg.svg2png(bytestring=svg.encode(),write_to=path,output_width=w,output_height=h or w)
def svg(vb,body,w=None,h=None):
    wh=f' width="{w}" height="{h}"' if w else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"{wh}>{body}</svg>\n'
def rect(vb,bg):
    x,y,w,h=vb; return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{bg}"/>'
SIZES=[64,128,256,512,1024,2048]
# ---- symbols ----
for name,(g,N) in MARKS.items():
    tag={"K2":"symbol","K4":"symbol-small"}[name]
    for cn,c in COL.items():
        body=f'<title>Lumen UI</title><path fill-rule="evenodd" fill="{c}" d="{P(g)}"/>'
        open(f"{mk('svg',tag)}/lumen-{tag}-{cn}.svg","w").write(svg(f"0 0 {N} {N}",body,N*16,N*16))
        pad=N*0.18; vb=(-pad,-pad,N+2*pad,N+2*pad)
        sb=svg(" ".join(f"{v:g}" for v in vb),rect(vb,BG[cn])+body)
        open(f"{mk('svg',tag)}/lumen-{tag}-{cn}-on-bg.svg","w").write(sb)
        for s in SIZES:
            save_png(svg(f"0 0 {N} {N}",body),f"{mk('png',tag,cn)}/lumen-{tag}-{cn}-{s}.png",s)
            save_png(sb,f"{mk('png',tag,cn+'-on-bg')}/lumen-{tag}-{cn}-on-bg-{s}.png",s)
# ---- wordmark / lockups (cap height = 100 units) ----
SIZE=100*upm/CAP
def word(x0,base): return text_path("Lumen UI",SIZE,x0,base)
def lockup_h(c):
    H=120; s=H/9; top=-10
    d=P(K2,s,0,top); t,xe=word(9*s+62,100)
    return f'<path fill-rule="evenodd" fill="{c}" d="{d}"/><path fill="{c}" d="{t}"/>',(-20,top-20,xe+40,H+40)
def wordmark(c):
    t,xe=word(0,100); return f'<path fill="{c}" d="{t}"/>',(-15,-15,xe+30,130)
def stacked(c):
    t,xe=word(0,0); H=230; s=H/9; sx=(xe-H)/2
    d=P(K2,s,sx,-100-80-H)
    return f'<path fill-rule="evenodd" fill="{c}" d="{d}"/><path fill="{c}" d="{t}"/>',(-40,-100-80-H-40,xe+80,H+80+100+80)
for kind,fn in (("lockup-horizontal",lockup_h),("wordmark",wordmark),("lockup-stacked",stacked)):
    for cn in ("black","light","pure-black","pure-white"):
        body,vb=fn(COL[cn]); vbs=" ".join(f"{v:.2f}" for v in vb)
        a=svg(vbs,f'<title>Lumen UI</title>'+body); b=svg(vbs,rect(vb,BG[cn])+body)
        open(f"{mk('svg',kind)}/lumen-{kind}-{cn}.svg","w").write(a)
        open(f"{mk('svg',kind)}/lumen-{kind}-{cn}-on-bg.svg","w").write(b)
        for w in (1024,2048):
            h=round(w*vb[3]/vb[2])
            save_png(a,f"{mk('png',kind)}/lumen-{kind}-{cn}-{w}.png",w,h)
            save_png(b,f"{mk('png',kind)}/lumen-{kind}-{cn}-on-bg-{w}.png",w,h)
# ---- favicons (K4, pixel-aligned: 7 modules + 0.5 module padding = 8) ----
fav=mk("favicon")
k4=P(K4)
fsvg=lambda c,bg=None: svg("-0.5 -0.5 8 8",(rect((-0.5,-0.5,8,8),bg) if bg else "")+f'<path fill-rule="evenodd" fill="{c}" d="{k4}"/>')
imgs={}
for s in (16,32,48):
    save_png(fsvg("#171717"),f"{fav}/favicon-{s}.png",s); imgs[s]=Image.open(f"{fav}/favicon-{s}.png")
imgs[48].save(f"{fav}/favicon.ico",sizes=[(16,16),(32,32),(48,48)],append_images=[imgs[16],imgs[32]])
open(f"{fav}/icon.svg","w").write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 8 8" fill="none">
  <title>Lumen UI</title>
  <style>
    path {{ fill: #171717; }}
    @media (prefers-color-scheme: dark) {{ path {{ fill: #f5f4ef; }} }}
  </style>
  <path fill-rule="evenodd" d="{k4}"/>
</svg>
''')
# app icons (K2 on #111, integer module sizes)
app=mk("app-icon")
def appicon(size,module,path,bg="#111111",col="#f5f4ef"):
    m=9*module; pad=(size-m)/2; u=size/module  # viewBox in module units
    vb=(-pad/module,-pad/module,size/module,size/module)
    s=svg(" ".join(f"{v:.4f}" for v in vb),rect(vb,bg)+f'<path fill-rule="evenodd" fill="{col}" d="{P(K2)}"/>')
    save_png(s,path,size); return s
appicon(180,14,f"{app}/apple-touch-icon.png")
appicon(192,14,f"{app}/android-chrome-192x192.png")
appicon(512,36,f"{app}/android-chrome-512x512.png")
appicon(512,28,f"{app}/maskable-512x512.png")
open(f"{app}/site.webmanifest","w").write(json.dumps({"name":"Lumen UI","short_name":"Lumen UI","icons":[
 {"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},
 {"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"},
 {"src":"/maskable-512x512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}],
 "theme_color":"#111111","background_color":"#111111","display":"standalone"},indent=2)+"\n")
open(f"{F}/head-snippet.html","w").write('''<!-- Lumen UI — favicons & icônes (fichiers à placer à la racine du site / dossier public) -->
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="icon" href="/favicon-16.png" type="image/png" sizes="16x16">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#fcfcf9" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#111111" media="(prefers-color-scheme: dark)">
<meta property="og:image" content="/og-image-dark.png">
''')
# ---- OG images ----
og=mk("social")
for cn,bg,suffix in (("light","#111111","dark"),("black","#fcfcf9","light")):
    body,vb=lockup_h(COL[cn]); W=1200;H=630; lw=620; sc=lw/vb[2]
    tx=(W-lw)/2-vb[0]*sc; ty=(H-vb[3]*sc)/2-vb[1]*sc
    s=svg(f"0 0 {W} {H}",f'<rect width="{W}" height="{H}" fill="{bg}"/><g transform="translate({tx:.2f},{ty:.2f}) scale({sc:.4f})">{body}</g>')
    open(f"{og}/og-image-{suffix}.svg","w").write(s); save_png(s,f"{og}/og-image-{suffix}.png",W,H)
