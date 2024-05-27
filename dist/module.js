"use strict";var Z=Object.create;var S=Object.defineProperty;var ee=Object.getOwnPropertyDescriptor;var te=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,oe=Object.prototype.hasOwnProperty;var ne=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),se=(t,e)=>{for(var r in e)S(t,r,{get:e[r],enumerable:!0})},A=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of te(e))!oe.call(t,s)&&s!==r&&S(t,s,{get:()=>e[s],enumerable:!(n=ee(e,s))||n.enumerable});return t};var l=(t,e,r)=>(r=t!=null?Z(re(t)):{},A(e||!t||!t.__esModule?S(r,"default",{value:t,enumerable:!0}):r,t)),ie=t=>A(S({},"__esModule",{value:!0}),t);var W=ne((he,ae)=>{ae.exports={license:"MIT",repository:{type:"git",url:"https://github.com/cezaraugusto/webpack-mkcert-plugin.git"},engines:{node:">=18"},name:"webpack-mkcert-plugin",version:"0.1.2",description:"Use certificates for webpack that are trusted by your local machine, avoiding browser security warnings during development.",main:"./dist/module.js",types:"./dist/module.d.ts",files:["dist"],author:{name:"Cezar Augusto",email:"boss@cezaraugusto.net",url:"https://cezaraugusto.com"},scripts:{clean:"rm -rf dist",watch:"yarn compile --watch",compile:"tsup-node ./module.ts --format cjs --dts --target=node18 --minify",lint:'eslint "./**/*.ts*"',test:"jest"},keywords:["webpack","plugin","mkcert","cert","certificate","https"],peerDependencies:{webpack:"^5.0.0"},dependencies:{"@colors/colors":"^1.6.0","semver-compare":"^1.0.0"},devDependencies:{"@types/jest":"^29.5.12","@types/node":"^18.11.9","@types/semver-compare":"^1.0.1",eslint:"^8.56.0","eslint-config-extension-create":"*",jest:"^29.7.0","ts-jest":"^29.1.2","ts-loader":"^9.5.1",tsconfig:"*",tsup:"^8.0.1",webpack:"~5.89.0","webpack-cli":"^5.1.4"}}});var ke={};se(ke,{default:()=>$});module.exports=ie(ke);var h=l(require("fs")),D=l(require("path"));var X=l(require("os")),c=l(require("fs")),p=l(require("path")),Q=require("child_process");var V=l(require("https"));var g=l(require("path")),o=require("@colors/colors/safe");function R(t,e,r){return`
Running secure local connection via ${(0,o.bold)("mkcert")}. Certificate files found:
\u251C\u2500 ${(0,o.underline)(g.default.join(r,t))}
\u2514\u2500 ${(0,o.underline)(g.default.join(r,e))}`}function U(t,e,r){return`
Success! ${(0,o.bold)("cert")} and ${(0,o.bold)("key")} files successfuly created:
\u251C\u2500 ${(0,o.underline)(g.default.join(t.startsWith("/")?"":r,t))}
\u2514\u2500 ${(0,o.underline)(g.default.join(e.startsWith("/")?"":r,e))}`}function _(){return`Starting ${(0,o.bold)((0,o.bold)("mkcert"))} download...`}function B(){return`Can't get download information for ${(0,o.bold)((0,o.bold)("mkcert"))}. Skipping init step...`}function M(){return`${(0,o.italic)("autoUpgrade")} option is enabled. Upgrading ${(0,o.bold)((0,o.bold)("mkcert"))}...`}function T(){return`Could not get download information of ${(0,o.bold)((0,o.bold)("mkcert"))}. Skipping update step...`}function O(){return`Could not get remote ${(0,o.bold)((0,o.bold)("mkcert"))} information. Ensure you are connected to the internet and try again.`}function H(){return`${(0,o.italic)("force")} option is enabled. Regenerating certificate...`}function j(){return`
This installation requires a secure local connection. Generating a new localhost certificate via ${(0,o.bold)("mkcert")}...`}function q(){return`
Note that certificate installations need manual user approval.
If your system prompts for a password, please enter it to continue.
This is a required step to install the certificate into your keychain.

Read more about this process at ${(0,o.underline)("https://github.com/FiloSottile/mkcert")}.`}function G(t){return`Could not generate certificate for ${t}. ${(0,o.bold)((0,o.bold)("mkcert"))} does not exist.`}function L(){return`Found ${(0,o.bold)((0,o.bold)("mkcert"))} binary. Running...`}function N(t,e){return`Too many redirects (${(0,o.bold)(t.toString())}). Last URL: ${(0,o.underline)(e)}.`}function P(t){return`on(data): ${t}`}function z(t){return`Downloading the ${(0,o.bold)((0,o.bold)("mkcert"))} binary from ${(0,o.underline)(t)}...`}function J(t){return`Download successful. ${(0,o.bold)((0,o.bold)("mkcert"))} binary saved to ${(0,o.underline)(t)}`}var K=5;async function f({url:t,headers:e,responseType:r,redirectAttempts:n=0}){let s=W();return await new Promise((i,a)=>{let x=[],d=V.default.get(t,{headers:{"User-Agent":`webpack-mkcert-plugin/v${s.version}`,Accept:"application/json, text/plain, */*",...e},timeout:1e4},u=>{let{headers:F,statusCode:C}=u;if(C&&F.location&&C>=300&&C<=399){if(n>=K){a(new Error(N(K,t)));return}f({url:F.location,headers:e,responseType:r,redirectAttempts:n+1}).then(i).catch(a);return}u.on("data",m=>{x.push(m),t.includes("/download/")&&P(m)}),u.on("end",()=>{let m=Buffer.concat(x);switch(r){case"json":try{let E=JSON.parse(m.toString());i(E)}catch(E){a(new Error(`Failed to parse JSON response: ${E.message}`))}break;case"arrayBuffer":i(m);break;default:a(new Error(`Unsupported response type: ${r}`))}}),u.on("error",m=>{a(new Error(`Request failed: ${m.message}`))})});d.on("timeout",()=>{d.destroy(),a(new Error("Request timed out"))}),d.on("error",u=>{a(new Error(`Request failed: ${u.message}`))})})}function ce(){switch(process.platform){case"win32":return"windows-amd64.exe";case"linux":return process.arch==="arm64"?"linux-arm64":process.arch==="arm"?"linux-arm":"linux-amd64";case"darwin":return"darwin-amd64";default:throw new Error("Unsupported platform")}}async function b(){let e=await f({url:"https://api.github.com/repos/FiloSottile/mkcert/releases/latest",headers:{Accept:"application/vnd.github+json"},responseType:"json"}),n=e.assets.find(({name:i})=>i.includes(ce()))?.browser_download_url,s=e.tag_name;if(!(n&&s)){console.error(O());return}return{downloadUrl:n,version:s}}var k=l(require("fs")),Y=l(require("path"));async function I(t,e){console.log(z(t));let r=await f({url:t,headers:{},responseType:"arrayBuffer"}),n=Y.default.dirname(e);k.default.existsSync(n)||k.default.mkdirSync(n,{recursive:!0}),k.default.writeFileSync(e,r),k.default.chmodSync(e,511),console.log(J(e))}var ue=process.platform==="win32"?"mkcert.exe":"mkcert",v=p.default.resolve(__dirname,ue);function le(){let t=X.default.networkInterfaces(),e=[];for(let r in t){let n=t[r];if(n)for(let s of n)s.family==="IPv4"&&e.push(s.address)}return["localhost",...e]}var w=class{options;constructor(e){this.options=e}getBinary(){return c.default.existsSync(v)?v:void 0}async downloadBinary(){_();let e=await b();if(!e||!e?.downloadUrl){console.error(B());return}await I(e?.downloadUrl,v)}async upgradeMkcertBinary(){if(console.log(M()),!await b()){console.error(T());return}}async runBinary(e){c.default.existsSync(v)?this.options.autoUpgrade?await this.upgradeMkcertBinary():console.log(L()):await this.downloadBinary();let r=le();return[...new Set([...r,...e])].filter(i=>!!i)}createCertificate(e,r,n){let s=e.join(" "),i=this.getBinary();i||(console.log(G(s)),process.exit(1)),c.default.existsSync(p.default.dirname(r))||c.default.mkdirSync(p.default.dirname(n)),c.default.existsSync(p.default.dirname(n))||c.default.mkdirSync(p.default.dirname(n));let a=`"${i}" -install -key-file "${r}" -cert-file "${n}" ${s}`;(0,Q.exec)(a,{env:{...process.env,JAVA_HOME:void 0}})}async installCertificate(e){c.default.existsSync(this.options.outputDir)||c.default.mkdirSync(this.options.outputDir,{recursive:!0});let r=p.default.resolve(this.options.outputDir,this.options.key),n=p.default.resolve(this.options.outputDir,this.options.cert),s=this.options.force,i=!(c.default.existsSync(n)&&c.default.existsSync(r));if(s&&console.log(H()),i||s){let a=await this.runBinary(e);this.createCertificate(a,r,n)}}};var pe=D.default.resolve(__dirname,"certs"),me=["localhost"],de="dev.key",fe="dev.cert",ge=!1,ye=!1,$=class{options;constructor(e={}){this.options={hosts:e.hosts||me,key:e.key||de,cert:e.cert||fe,outputDir:e.outputDir||pe,autoUpgrade:e.autoUpgrade||ge,force:e.force||ye}}async ensureCertificates(){let{force:e,key:r,cert:n,hosts:s,outputDir:i}=this.options,a=D.default.join(i,n),x=D.default.join(i,r),d=!h.default.existsSync(a)&&!h.default.existsSync(x);if(h.default.existsSync(i)||h.default.mkdirSync(i,{recursive:!0}),d&&(console.log(j()),console.log(q())),!d&&!e){console.log(R(n,r,i));return}try{await new w(this.options).installCertificate(s||[]),console.log(U(n.toString(),r.toString(),i))}catch(u){console.error(u)}}apply(e){e.hooks.afterCompile.tapPromise("MkcertWebpackPlugin",async()=>{try{await this.ensureCertificates()}catch(r){console.error(r)}})}};
