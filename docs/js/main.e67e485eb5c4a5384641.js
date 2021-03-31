(()=>{var t={353:t=>{t.exports='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1"> <meta http-equiv="X-UA-Compatible" content="ie=edge"> <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"> <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"> <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"> <link rel="manifest" href="/site.webmanifest"> <meta name="description" content=""/> <meta name="keywords" content=""> <meta name="author" content="Dmytro Anikin"> <title>Smooth Scroll</title> </head> <body> <main> <div data-scroll> <section class="section color1">Section 1</section> <section class="section color2">Section 2</section> <section class="section color3">Section 3</section> <section class="section color4">Section 4</section> <section class="section color5">Section 5</section> </div> </main> </body> </html>'}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var o=e[i]={exports:{}};return t[i](o,o.exports,s),o.exports}s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";s(353);const t=document.body;let e;const i=()=>{e={width:window.innerWidth,height:window.innerHeight}};let n;i(),window.addEventListener("resize",i),window.onbeforeunload=function(){window.scrollTo(0,0)};const o=()=>{n=window.pageYOffset||document.documentElement.scrollTop};window.addEventListener("scroll",o);class r{constructor(){this.DOM={main:document.querySelector("main")},this.DOM.scrollable=this.DOM.main.querySelector("div[data-scroll]"),this.scrlStyles={translationY:{previous:0,current:0,ease:.1,setValue:()=>n}},this.bodySize(),this.update(),this.mainStyles(),this.bodyResize(),requestAnimationFrame((()=>this.render()))}update(){for(const t in this.scrlStyles)this.scrlStyles[t].current=this.scrlStyles[t].previous=this.scrlStyles[t].setValue();this.setPosition()}setPosition(){(Math.round(this.scrlStyles.translationY.previous)!==Math.round(this.scrlStyles.translationY.current)||this.scrlStyles.translationY.previous<10)&&(this.DOM.scrollable.style.transform=`translate3d(0,${-1*this.scrlStyles.translationY.previous}px,0)`)}bodySize(){t.style.height=`${this.DOM.scrollable.scrollHeight}px`}mainStyles(){this.DOM.main.style.position="fixed",this.DOM.main.style.width=this.DOM.main.style.height="100%",this.DOM.main.style.top=this.DOM.main.style.left=0,this.DOM.main.style.overflow="hidden"}bodyResize(){window.addEventListener("resize",(()=>this.bodySize()))}render(){for(const i in this.scrlStyles)this.scrlStyles[i].current=this.scrlStyles[i].setValue(),this.scrlStyles[i].previous=(t=this.scrlStyles[i].previous,e=this.scrlStyles[i].current,(1-(s=this.scrlStyles[i].ease))*t+s*e);var t,e,s;this.setPosition(),requestAnimationFrame((()=>this.render()))}}window.onload=function(){o(),new r}})()})();