"use strict";(self.webpackChunksafu_zk=self.webpackChunksafu_zk||[]).push([[583],{8047:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var i=t(4848),r=t(8453);const o={title:"Vulnerable Circuit Challenges"},a="Ghotala Circuits",s={type:"mdx",permalink:"/safu-zk/challenges",source:"@site/src/pages/challenges.md",title:"Vulnerable Circuit Challenges",description:"This section has a collection of a few standard and non-standard circuit implementations that are vulnerable. Figure out how you can break these circuits.",frontMatter:{title:"Vulnerable Circuit Challenges"},unlisted:!1},c={},l=[{value:"1. IsZero",id:"1-iszero",level:2},{value:"1.1 IsZero Solution",id:"11-iszero-solution",level:3},{value:"2. Calculating the Average",id:"2-calculating-the-average",level:2}];function u(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"ghotala-circuits",children:"Ghotala Circuits"}),"\n",(0,i.jsx)(n.p,{children:"This section has a collection of a few standard and non-standard circuit implementations that are vulnerable. Figure out how you can break these circuits."}),"\n",(0,i.jsx)(n.h2,{id:"1-iszero",children:"1. IsZero"}),"\n",(0,i.jsxs)(n.p,{children:["This circuits returns 1 if the input signal ",(0,i.jsx)(n.em,{children:"in"})," is 0 otherwise returns 0 for non-zero values. Figure out how can you break this circuit."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-circom",children:"pragma circom 2.1.6;\n\ntemplate isZeroUnsafe() {\n\n    signal input in;\n    signal output out;\n\n    signal inter <-- in == 0 ? 1 : 0;\n\n    out <== inter;\n}\n\ncomponent main = isZeroUnsafe();\n"})}),"\n",(0,i.jsx)(n.h3,{id:"11-iszero-solution",children:"1.1 IsZero Solution"}),"\n",(0,i.jsx)(n.p,{children:"The solution to this problem was discussed on twitter. Please have a look at the entire thread to understand how people thought about the problem as well."}),"\n",(0,i.jsxs)(n.p,{children:["Solution: ",(0,i.jsx)(n.a,{href:"https://x.com/saxenism/status/1784546740999188833",children:"Solution tweet"})]}),"\n",(0,i.jsx)(n.h2,{id:"2-calculating-the-average",children:"2. Calculating the Average"}),"\n",(0,i.jsxs)(n.p,{children:["This circuit calculate the average of the ",(0,i.jsx)(n.code,{children:"n"})," numbers that are supplied to it via the input signal array ",(0,i.jsx)(n.code,{children:"in[n]"}),". Something is wrong with this circuit, to be precise a constraint is missing."]}),"\n",(0,i.jsx)(n.p,{children:"This example is taken from a very well respected Circom source. So, this bug has been out in the wild for quite a while (~9 months). Can you figure out what's wrong here?"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-circom",children:'pragma circom 2.1.6;\n\ninclude "node_modules/circomlib/circuits/comparators.circom";\n\nfunction invert(x) {\n    return 1 / x;\n}\n\ntemplate Average(n) {\n\n    signal input in[n];\n    signal denominator;\n    signal output out;\n\n    var sum;\n    for (var i = 0; i < n; i++) {\n        sum += in[i];\n    }\n\n    denominator <-- invert(n);\n\n    component eq = IsEqual();\n    eq.in[0] <== denominator;\n    eq.in[1] <== n;\n\n    out <== sum * denominator;\n}\n\ncomponent main  = Average(5);\n\n'})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>s});var i=t(6540);const r={},o=i.createContext(r);function a(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);