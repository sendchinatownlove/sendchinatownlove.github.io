/*! For license information please see 16.0cb2f88a.chunk.js.LICENSE.txt */
(this.webpackJsonpsendchinatownlove=this.webpackJsonpsendchinatownlove||[]).push([[16],{124:function(t,n,e){"use strict";e.d(n,"A",(function(){return b})),e.d(n,"x",(function(){return _})),e.d(n,"z",(function(){return x})),e.d(n,"y",(function(){return w})),e.d(n,"D",(function(){return y})),e.d(n,"B",(function(){return g})),e.d(n,"J",(function(){return k})),e.d(n,"o",(function(){return j})),e.d(n,"f",(function(){return O})),e.d(n,"v",(function(){return A})),e.d(n,"g",(function(){return N})),e.d(n,"j",(function(){return D})),e.d(n,"i",(function(){return P})),e.d(n,"k",(function(){return H})),e.d(n,"d",(function(){return Q})),e.d(n,"q",(function(){return U})),e.d(n,"r",(function(){return q})),e.d(n,"t",(function(){return L})),e.d(n,"h",(function(){return Z})),e.d(n,"c",(function(){return J})),e.d(n,"H",(function(){return C})),e.d(n,"a",(function(){return I})),e.d(n,"I",(function(){return z})),e.d(n,"u",(function(){return R})),e.d(n,"s",(function(){return S})),e.d(n,"l",(function(){return T})),e.d(n,"G",(function(){return K})),e.d(n,"m",(function(){return X})),e.d(n,"e",(function(){return Y})),e.d(n,"p",(function(){return B})),e.d(n,"E",(function(){return W})),e.d(n,"b",(function(){return M})),e.d(n,"n",(function(){return G})),e.d(n,"F",(function(){return V})),e.d(n,"w",(function(){return F})),e.d(n,"C",(function(){return $}));var r=e(122),a=e.n(r),c=e(123),u=e(144),i=e.n(u),o=(e(145),"https://api.sendchinatownlove.com/"),s=o+"sellers/",p=o+"charges",f=o+"gift_cards/",h=o+"campaigns/",d=o+"fees/",l=o+"participating_sellers/",m=o+"contacts/",v=o+"sponsor_sellers/",b=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get(s,{params:{locale:E(n)}});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),_=function(){var t=Object(c.a)(a.a.mark((function t(n,e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get(s+n,{params:{locale:E(e)}});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),x=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get(s+n+"/open_hour");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),w=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get(s+n+"/delivery_options");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),y=function(){var t=Object(c.a)(a.a.mark((function t(n,e,r,u,o,s,f,h){var d,l,m,v;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return d=u.email,l=u.name,m=u.idempotency_key,v=u.is_subscribed,t.next=5,i.a.post(p,{is_square:!0,nonce:n,line_items:r,email:d,name:l,seller_id:e,project_id:f,idempotency_key:m,is_subscribed:v,is_distribution:o,campaign_id:s,metadata:h},{headers:{"Access-Control-Allow-Origin":"*"}}).then(function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",n);case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}()).catch((function(t){throw t}));case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})));return function(n,e,r,a,c,u,i,o){return t.apply(this,arguments)}}(),g=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(f+n).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),k=function(){var t=Object(c.a)(a.a.mark((function t(n,e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.put(f+n,{amount:e}).then((function(t){return t})).catch((function(t){throw t})));case 1:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),j=function(){var t=Object(c.a)(a.a.mark((function t(n,e){var r,c,u=arguments;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=u.length>2&&void 0!==u[2]&&u[2],c=r?"?filterGAM=true":"",t.abrupt("return",i.a.get(s+n+"/gift_cards/"+e+c).then((function(t){return t})));case 3:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}();function E(t){switch(t){case"cn":return"zh-CN";case"en":default:return"en"}}var O=function(){var t=Object(c.a)(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get(h).then((function(t){return t})).catch((function(t){return t}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),A=function(){var t=Object(c.a)(a.a.mark((function t(){var n,e=arguments;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.length>0&&void 0!==e[0]?e[0]:1,t.next=3,i.a.get("".concat(h,"?inactive=true&items=10&page=").concat(n)).then((function(t){return t})).catch((function(t){return t}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),N=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get(s+n+"/campaigns").then((function(t){return t})).catch((function(t){return t}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),D=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get(d+n).then((function(t){return t})).catch((function(t){return t}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),P=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get("https://api.sendchinatownlove.com/distributors/"+n).then((function(t){return t})).catch((function(t){return t}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),H=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get("https://api.sendchinatownlove.com/nonprofits/"+n).then((function(t){return t})).catch((function(t){return t}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),Q=function(){var t=Object(c.a)(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(l).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),U=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(l+n).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),q=function(){var t=Object(c.a)(a.a.mark((function t(n,e,r,c,u,o){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(l+n+"/tickets/"+e,{params:{page:r,items:c,printed:u,associated:o}}).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n,e,r,a,c,u){return t.apply(this,arguments)}}(),L=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(m,{params:{email:n}}).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),Z=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(m+n).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),J=function(){var t=Object(c.a)(a.a.mark((function t(n,e){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={},r=e?{email:n,instagram:e}:{email:n},t.abrupt("return",i.a.post(m,r).then((function(t){return t})).catch((function(t){return t})));case 3:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),C=function(){var t=Object(c.a)(a.a.mark((function t(n,e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.put(m+n,{instagram:e}).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),I=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get("https://api.sendchinatownlove.com/tickets/"+n).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),z=function(){var t=Object(c.a)(a.a.mark((function t(n,e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.put("https://api.sendchinatownlove.com/tickets/"+n,{contact_id:e}).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),R=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(m+n+"/tickets").then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),S=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get("https://api.sendchinatownlove.com/participating_sellers/"+n).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),T=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(m+n).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),K=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.post(m+n+"/rewards").then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),X=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get("https://api.sendchinatownlove.com/locations/"+n).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),Y=function(){var t=Object(c.a)(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(v).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),B=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(v+n).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),W=function(){var t=Object(c.a)(a.a.mark((function t(n,e,r){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.put(m+n+"/tickets/"+e,{tickets:r}).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n,e,r){return t.apply(this,arguments)}}(),M=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.post(m+n+"/lyft_rewards/").then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),G=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get(m+n+"/lyft_rewards/").then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),V=function(){var t=Object(c.a)(a.a.mark((function t(n,e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.post(m+n+"/lyft_rewards/"+e+"/redeem/").then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),F=function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.a.get("https://api.sendchinatownlove.com/projects/"+n).then((function(t){return t})).catch((function(t){return t})));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),$=1},125:function(t,n,e){var r;!function(){"use strict";var e={}.hasOwnProperty;function a(){for(var t=[],n=0;n<arguments.length;n++){var r=arguments[n];if(r){var c=typeof r;if("string"===c||"number"===c)t.push(r);else if(Array.isArray(r)&&r.length){var u=a.apply(null,r);u&&t.push(u)}else if("object"===c)for(var i in r)e.call(r,i)&&r[i]&&t.push(i)}}return t.join(" ")}t.exports?(a.default=a,t.exports=a):void 0===(r=function(){return a}.apply(n,[]))||(t.exports=r)}()},183:function(t,n,e){t.exports={header__merchant:"styles_header__merchant__392NU",header__voucherAmount:"styles_header__voucherAmount__25DBT",heading__merchantName:"styles_heading__merchantName__2lMVl",heading__amount:"styles_heading__amount__m7bMn",header__address:"styles_header__address__1PIb6",text__amountDescription:"styles_text__amountDescription__305SB",faq:"styles_faq__2RuBo",faq__p:"styles_faq__p__3GtgS",boldText:"styles_boldText__33lxV",body__voucherCode:"styles_body__voucherCode__306Ja",heading__voucherCode:"styles_heading__voucherCode__11GVm",text__codeDescription:"styles_text__codeDescription__pk_W-",body__separator:"styles_body__separator__2kNcO",separator__text:"styles_separator__text__3Vc-t",separator__textCenter:"styles_separator__textCenter__2Vi88",separator__textBottom:"styles_separator__textBottom__2RIGi",body__QrImage:"styles_body__QrImage__cdASY",qrImage:"styles_qrImage__1Pgck"}},417:function(t,n){t.exports="data:image/png;base64,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"},443:function(t,n,e){"use strict";e.r(n);var r=e(2),a=e(11),c=e(0),u=e.n(c),i=e(5),o=e(3),s=e(183),p=e.n(s),f=function(t){var n=t.value;return u.a.createElement("section",null,u.a.createElement("h1",{className:p.a.heading__amount},"$".concat((n/100).toFixed(2))),u.a.createElement("span",{className:p.a.text__amountDescription},"Single-meal Voucher"),u.a.createElement("span",{className:p.a.text__amountDescription},"\u5355\u9910\u793c\u54c1\u5361"))},h=function(t){var n=t.voucherCode;return u.a.createElement("section",{className:p.a.body__voucherCode},u.a.createElement("div",null,u.a.createElement("span",{className:p.a.boldText},"VOUCHER CODE \u9910\u5238\u53f7\u7801:"),u.a.createElement("h1",{className:p.a.heading__voucherCode},"".concat(n))),u.a.createElement("div",null,u.a.createElement("span",{className:p.a.text__codeDescription},"Show the Voucher Code when redeeming in person"),u.a.createElement("span",{className:p.a.text__codeDescription},"\u51fa\u793a\u9910\u5238\u53f7\u7801\u4ee5\u5151\u6362\u9910")))},d=e(417),l=e.n(d),m=function(t){var n=t.qrUrl;return u.a.createElement("section",{className:p.a.body__QrImage},u.a.createElement("img",{className:p.a.qrImage,src:n||l.a,alt:"QR Code"}),u.a.createElement("span",null,"Scan the QR code to redeem with your phone"),u.a.createElement("span",null,"\u626b\u63cf QR \u7801\u4ee5\u5151\u6362\u9910"))},v=e(125),b=e.n(v),_=function(){return u.a.createElement("div",{className:p.a.body__separator},u.a.createElement("span",{className:b()(p.a.separator__text,p.a.separator__textCenter)},"OR"),u.a.createElement("span",{className:b()(p.a.separator__text,p.a.separator__textBottom)},"\u6216"))},x=function(t){var n=t.cnName,e=t.name,r=t.address1,a=t.city,c=t.state,i=t.zipCode,o=t.expirationDate;return u.a.createElement("section",{className:p.a.header__merchant},u.a.createElement("div",null,u.a.createElement("h1",{className:p.a.heading__merchantName},"".concat(n," ").concat(e)),u.a.createElement("span",{className:p.a.header__address},"".concat(r)),u.a.createElement("span",{className:p.a.header__address},"".concat(a,", ").concat(c," ").concat(i))),u.a.createElement("p",null,"Expiration Date \u6709\u6548\u671f\u9650: ".concat(o)))},w=e(55),y=e.n(w);function g(){var t=Object(r.a)(["\n  font-style: italics;\n  margin-right: 7px;\n"]);return g=function(){return t},t}function k(){var t=Object(r.a)(["\n  height: 100%;\n"]);return k=function(){return t},t}function j(){var t=Object(r.a)(["\n  height: 100%;\n"]);return j=function(){return t},t}function E(){var t=Object(r.a)(["\n  display: flex;\n  justify-content: space-between;\n  padding: 0 26px 26px;\n  font-size: 10px;\n  align-items: flex-end;\n  height: 60px;\n  background: white;\n"]);return E=function(){return t},t}var O=function(t){var n=t.distributorImage;return u.a.createElement(N,null,u.a.createElement(P,{src:y.a,alt:"scl"}),u.a.createElement(D,null,u.a.createElement(H,null,"In partnership with:"),u.a.createElement(P,{src:n,alt:"distributor logo"})))};O.defaultProps={distributorImage:"https://storage.googleapis.com/sendchinatownlove-assets/public/assets/think-chinatown/think-chinatown-logo.png"};var A=O,N=o.a.footer(E()),D=o.a.div(j()),P=o.a.img(k()),H=o.a.span(g()),Q=function(t){var n=t.name,e=t.cnName;return u.a.createElement("article",{className:p.a.faq},u.a.createElement("p",{className:b()(p.a.boldText,p.a.faq__p)},"To redeem, the voucher must be printed and given to the merchant at time of redemption OR the QR code must be scanned with a phone. Voucher may only be used once for the entirety of the balance."),u.a.createElement("p",{className:p.a.faq__p},"By proceeding with your purchase, you understand that the voucher card is not redeemable for cash and can only be used at ".concat(n,". All purchases are final. In the event that the merchant is no longer open at the time of redemption, Send Chinatown Love Inc. will not be able to refund your purchase. Vouchers may be redeemed before or on the date of expiration.")),u.a.createElement("p",{className:b()(p.a.boldText,p.a.faq__p)},"\u5151\u6362\u9910\u65f6\uff0c\u8bf7\u5217\u5370\u672c\u5238\u4ea4\u7ed9\u5546\u5bb6\uff0c\u6216\u4f7f\u7528\u624b\u673a\u626b\u63cf QR \u7801\u3002\u6b64\u9910\u5238\u53ea\u80fd\u5355\u6b21\u4f7f\u7528, \u4e0d\u53ef\u627e\u96f6\u3002"),u.a.createElement("p",{className:p.a.faq__p},"\u6b64\u9910\u5238\u4e0d\u53ef\u5151\u6362\u4e3a\u73b0\u91d1\u4e26\u53ea\u80fd\u7528\u4e8e".concat(e,"\u3002\u6240\u6709\u6d88\u8d39\u4e0d\u5f97\u9000\u6362\u3002\u82e5\u6b64\u5546\u5bb6\u5728\u5151\u6362\u65f6\u5df2\u7ecf\u4e0d\u518d\u8425\u4e1a\uff0c\u732e\u7231\u534e\u57e0 Send Chinatown Love \u5c06\u4e0d\u4f1a\u9000\u6b3e\u3002\u9910\u5238\u53ef\u4ee5\u901a\u8fc7 QR \u7801\u5728\u6709\u6548\u671f\u9650\u4e4b\u524d\u6216\u5f53\u65e5\u5151\u6362\u3002"))," ","\u200b")};function U(){var t=Object(r.a)(["\n  width: 83%;\n  height: 180px;\n  display: flex;\n  margin: 0 auto 20px auto;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  font-size: 10px;\n  padding: 0 18px 0;\n  @media print {\n    height: 22vh;\n  }\n"]);return U=function(){return t},t}function q(){var t=Object(r.a)(["\n  width: 83%;\n  height: 30%;\n  background: white;\n  border-radius: 10px;\n  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n  padding: 21px 16px;\n  display: flex;\n  justify-content: space-around;\n  margin: 0 auto;\n  font-size: 12px;\n  @media print {\n    font-size: 10px;\n    height: 22vh;\n  }\n"]);return q=function(){return t},t}function L(){var t=Object(r.a)(["\n  width: 50%;\n  max-width: 600px;\n  background-color: #faf4ea;\n  padding-top: 26px;\n  height: 760px;\n  &:first-child {\n    border-right: 1px solid lightgrey;\n  }\n  @media print {\n    padding-top: 36px;\n    width: 50vw;\n    height: 100vh;\n    overflow-y: visible;\n    display: grid;\n    grid-template-rows: 1fr 1fr 1fr 1fr;\n  }\n"]);return L=function(){return t},t}var Z=function(t){var n=t.name,e=t.cn_name,r=t.address1,a=t.city,c=t.state,i=t.zip_code,o=t.voucher_code,s=t.value,p=t.qr_url,d=t.expiration_date,l=t.distributor_image;return u.a.createElement(C,null,u.a.createElement(I,null,u.a.createElement(x,{address1:r,name:n,cnName:e,zipCode:i,state:c,expirationDate:d,city:a}),u.a.createElement(f,{value:s})),"\u200b",u.a.createElement(z,null,u.a.createElement(h,{voucherCode:o}),u.a.createElement(_,null),u.a.createElement(m,{qrUrl:p})),u.a.createElement(Q,{cnName:e,name:n}),u.a.createElement(A,{distributorImage:l}))},J=Z;Z.defaultProps={name:"Lanzhou Ramen",cn_name:"\u5170\u5dde\u62c9\u9762",voucher_code:"AH2-TA",address1:"107 E Broadway",city:"New York",state:"NY",zip_code:"10002",qr_url:"",value:2e3,expiration_date:"12/32/2020"};var C=o.a.article(L()),I=o.a.header(q()),z=o.a.div(U()),R=e(124);function S(){var t=Object(r.a)(["\n  width: 100vw;\n  @media print {\n    & ",":not(:last-child) {\n      margin-bottom: 36px;\n    }\n  }\n"]);return S=function(){return t},t}function T(){var t=Object(r.a)(["\n  width: 100vw;\n  height: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  @media (min-width: 1440px) {\n    width: 1200px;\n  }\n"]);return T=function(){return t},t}var K=function(t){var n=t.vouchers,e=Object(c.useState)(""),r=Object(a.a)(e,2),o=r[0],s=r[1],p=Object(i.i)().distributor_id;Object(c.useEffect)((function(){p&&Object(R.i)(p).then((function(t){var n=t.data;s(n.image_url)}))}),[p]);var f=o&&function(t,n){for(var e,r=[],a=0;a<t.length;a++)if(a%2!==0){var c=t[a],i=u.a.createElement(X,{key:"Row: ".concat((a+1)/2)},u.a.createElement(J,Object.assign({},e,{key:a-1,distributor_image:n})),u.a.createElement(J,Object.assign({},c,{key:a,distributor_image:n})));r.push(i)}else e=t[a];return r}(n,o);return u.a.createElement(Y,null,f)};n.default=K;K.defaultProps={vouchers:[{name:"Lanzhou Ramen",cn_name:"\u5170\u5dde\u62c9\u9762",voucher_code:"AH2-TA",address1:"107 E Broadway",city:"New York",state:"NY",zip_code:"10002",qr_url:"",value:2e3,expiration_date:"12/32/2020"},{name:"Lanzhou Ramen",cn_name:"\u5170\u5dde\u62c9\u9762",voucher_code:"AH2-TA",address1:"107 E Broadway",city:"New York",state:"NY",zip_code:"10002",qr_url:"",value:2e3,expiration_date:"12/32/2020"},{},{},{},{},{},{}]};var X=o.a.div(T()),Y=o.a.div(S(),X)}}]);
//# sourceMappingURL=16.0cb2f88a.chunk.js.map