//@ui5-bundle expensecreate/Component-preload.js
sap.ui.require.preload({
	"expensecreate/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","expensecreate/model/models"],function(e,t,i){"use strict";return e.extend("expensecreate.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"expensecreate/controller/App.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("expensecreate.controller.App",{onInit:function(){}})});
},
	"expensecreate/controller/Main.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("expensecreate.controller.Main",{onInit:function(){}})});
},
	"expensecreate/i18n/i18n.properties":'# This is the resource bundle for expensecreate\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Expense App\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=Expense App',
	"expensecreate/manifest.json":'{"_version":"1.60.0","sap.app":{"id":"expensecreate","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.15.3","toolsId":"e973691d-0e7c-4900-9620-7edbd5989997"},"dataSources":{"mainService":{"uri":"odata/v4/expense/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"expense-create-display":{"semanticObject":"expense-create","action":"display","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.120.21","libs":{"sap.m":{},"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"expensecreate.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"expensecreate.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteMain","pattern":":?query:","target":["TargetMain"]}],"targets":{"TargetMain":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"Main","viewName":"Main"}}},"rootView":{"viewName":"expensecreate.view.App","type":"XML","async":true,"id":"App"}},"sap.cloud":{"public":true,"service":"expenseapp.service"}}',
	"expensecreate/model/models.js":function(){
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"expensecreate/view/App.view.xml":'<mvc:View controllerName="expensecreate.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"expensecreate/view/Main.view.xml":'<mvc:View controllerName="expensecreate.controller.Main"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><Page id="page" title="{i18n>title}"><content /></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
