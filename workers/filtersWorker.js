!function(a){function t(e){if(r[e])return r[e].exports;var n=r[e]={exports:{},id:e,loaded:!1};return a[e].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=a,t.c=r,t.p="",t(0)}([function(a,t){"use strict";function r(a,t,r){for(var n=e(r),o=0;o<a.height;o++)for(var i=0;i<a.width;i++){var f=4*(o*a.width+i);n(t,f)}postMessage({imageData:t.buffer,partData:a},[t.buffer])}function e(a){return u[a]}function n(a,t){a[t]=255-a[t],a[t+1]=255-a[t+1],a[t+2]=255-a[t+2]}function o(a,t){var r=f(a,t);a[t]=r,a[t+1]=r,a[t+2]=r}function i(a,t){var r=f(a,t);a[t]=r+50,a[t+1]=r+30,a[t+2]=r}function f(a,t){var r=a[t],e=a[t+1],n=a[t+2],o=Math.floor((r+e+n)/3);return o}var u={Negative:n,GrayScale:o,Sepia:i};onmessage=function(a){if(a.data.partData){var t=new Uint8ClampedArray(a.data.imageData),e=a.data.effect;r(a.data.partData,t,e)}}}]);