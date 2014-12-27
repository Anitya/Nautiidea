OpenLayers.LayerFeatureAgent = OpenLayers.Class({
    cache: null,
    initialize: function(a, b) {
        OpenLayers.Util.extend(this, b);
        this.options = b;
        this.layer = a
    },
    activate: function() {
        if (!this.activated) this.cache = {},
        this.activated = !0,
        this.layer.events.on({
            click: this.onClick,
            scope: this
        })
    },
    deactivate: function() {
        if (this.activated) this.activated = !1,
        this.cache = {},
        this.layer.events.un({
            click: this.onClick,
            scope: this
        })
    },
    onClick: function(a) {
        a = this.getFeatures(a.clientX, a.clientY);
        if (1 < a.length) this.layer.events.triggerEvent("multipleselected", {
            features: a
        });
        else {
            var b;
            for (i = 0, len = a.length; i < len && !(b = a[i], b = this.layer.events.triggerEvent("featureselected", {
                feature: b
            }), !1 === b); ++i);
        }
    },
    getFeatures: function(a, b) {
        var c = [],
        d = [],
        e = [],
        f,
        g,
        h;
        f = this.layer;
        if ("none" !== f.div.style.display) {
            if (f instanceof OpenLayers.Layer.Vector) for (g = document.elementFromPoint(a, b); g && (g._featureId || g.nearestViewportElement);)(h = g._featureId ? f.getFeatureById(g._featureId) : f.getFeatureById(g.nearestViewportElement._featureId)) && c.push(h),
            g.style.display = "none",
            d.push(g),
            g = document.elementFromPoint(a, b);
            e.push(f);
            f.div.style.display = "none"
        }
        for (f = 0, g = d.length; f < g; ++f) d[f].style.display = "";
        for (f = e.length - 1; 0 <= f; --f) e[f].div.style.display = "block";
        return c
    },
    destroy: function() {
        this.deactivate();
        delete this.cache;
        delete this.layer
    },
    highlight: function(a) {
        a._prevHighlighter = a._lastHighlighter;
        a._lastHighlighter = this.id;
        this.layer.drawFeature(a, this.selectStyle || this.renderIntent)
    },
    unhighlight: function(a) {
        if (void 0 == a._prevHighlighter) delete a._lastHighlighter;
        else {
            if (a._prevHighlighter != this.id) a._lastHighlighter = a._prevHighlighter;
            delete a._prevHighlighter
        }
        this.layer.drawFeature(a, a.style || this.layer.style || "default")
    },
    CLASS_NAME: "OpenLayers.LayerFeatureAgent"
});
Ext.override(Ext.dd.DragTracker, {
    onMouseMove: function(a) {
        if (this.active && Ext.isIE && !Ext.isIE9 && !a.browserEvent.button) a.preventDefault(),
        this.onMouseUp(a);
        else {
            a.preventDefault();
            var b = a.getXY(),
            c = this.startXY;
            this.lastXY = b;
            if (!this.active) if (Math.abs(c[0] - b[0]) > this.tolerance || Math.abs(c[1] - b[1]) > this.tolerance) this.triggerStart(a);
            else return;
            this.fireEvent("mousemove", this, a);
            this.onDrag(a);
            this.fireEvent("drag", this, a)
        }
    }
});
var GeoExplorer = Ext.extend(gxp.Viewer, {
    localGeoServerBaseUrl: "",
    localCSWBaseUrl: "",
    useMapOverlay: null,
    siteUrl: "",
    fromLayer: !1,
    mapPanel: null,
    toolbar: null,
    capGrid: null,
    modified: 0,
    popupCache: null,
    urlPortRegEx: /^(http[s]?:\/\/[^:]*)(:80|:443)?\//,
    searchFields: [],
    gxSearchBar: null,
    loginWin: null,
    registerWin: null,
    worldMapSourceKey: null,
    hglSourceKey: null,
    addLayersButtonText: "UT:Add Layers",
    arcGisRestLabel: "UT: Add ArcGIS REST Server",
    areaActionText: "UT:Area",
    backgroundContainerText: "UT:Background",
    capGridAddLayersText: "UT:Add Layers",
    capGridDoneText: "UT:Done",
    capGridText: "UT:Available Layers",
    connErrorTitleText: "UT:Connection Error",
    connErrorText: "UT:The server returned an error",
    connErrorDetailsText: "UT:Details...",
    feedAdditionLabel: "UT:Add feeds",
    flickrText: "UT:Flickr",
    googleEarthBtnText: "UT:Google Earth",
    heightLabel: "UT: Height",
    helpLabel: "UT: Help",
    infoButtonText: "UT:Info",
    largeSizeLabel: "UT:Large",
    layerAdditionLabel: "UT: Add another server",
    layerLocalLabel: "UT:Upload your own data",
    layerContainerText: "UT:Map Layers",
    layerPropertiesText: "UT: Layer Properties",
    layerPropertiesTipText: "UT: Change layer format and style",
    layerStylesText: "UT:Edit Styles",
    layerStylesTipText: "UT:Edit layer styles",
    layerSelectionLabel: "UT:View available data from:",
    layersContainerText: "UT:Data",
    layersPanelText: "UT:Layers",
    legendPanelText: "UT:Legend",
    lengthActionText: "UT:Length",
    loadingMapMessage: "UT:Loading Map...",
    mapSizeLabel: "UT: Map Size",
    maxMapLayers: 75,
    maxLayersTitle: "UT:Warning",
    maxLayersText: "UT:You now have %n layers in your map.  With more than %max layers you may experience problems with layer ordering, info balloon display, and general performance. ",
    measureSplitText: "UT:Measure",
    metadataFormCancelText: "UT:Cancel",
    metadataFormSaveAsCopyText: "UT:Save as Copy",
    metadataFormSaveText: "UT:Save",
    metadataFormCopyText: "UT:Copy",
    metaDataHeader: "UT:About this Map View",
    metaDataMapAbstract: "UT:Abstract (brief description)",
    metaDataMapIntroText: "UT:Introduction (tell visitors more about your map view)",
    metaDataMapTitle: "UT:Title",
    metaDataMapUrl: "UT:UserUrl",
    miniSizeLabel: "UT: Mini",
    addCategoryActionText: "UT:Add Category",
    addCategoryActionTipText: "UT: Add a new category to the layer tree",
    renameCategoryActionText: "UT: Rename Category",
    renameCategoryActionTipText: "UT: Rename this category",
    removeCategoryActionText: "UT: Remove Category",
    removeCategoryActionTipText: "UT: Remove this category and layers",
    navActionTipText: "UT:Pan Map",
    navNextAction: "UT:Zoom to Next Extent",
    navPreviousActionText: "UT:Zoom to Previous Extent",
    premiumSizeLabel: "UT: Premium",
    printTipText: "UT:Print Map",
    printBtnText: "UT:Print",
    printWindowTitleText: "UT:Print Preview",
    propertiesText: "UT:Properties",
    publishActionText: "UT:Link To Map",
    publishBtnText: "UT:Link",
    removeLayerActionText: "UT:Remove Layer",
    removeLayerActionTipText: "UT:Remove Layer",
    revisionBtnText: "UT:Revisions",
    saveFailMessage: "UT: Sorry, your map could not be saved.",
    saveFailTitle: "UT: Error While Saving",
    saveMapText: "UT: Save Map",
    saveMapBtnText: "UT: Save",
    saveMapAsText: "UT: Copy",
    saveNotAuthorizedMessage: "UT: You Must be logged in to save this map.",
    shareLayerText: "UT: Share Layer",
    smallSizeLabel: "UT: Small",
    sourceLoadFailureMessage: "UT: Error contacting server.\n Please check the url and try again.",
    switchTo3DActionText: "UT:Switch to Google Earth 3D Viewer",
    streetViewBtnText: "UT:Street View",
    unknownMapMessage: "UT: The map that you are trying to load does not exist.  Creating a new map instead.",
    unknownMapTitle: "UT: Unknown Map",
    unsupportedLayersTitleText: "UT:Unsupported Layers",
    unsupportedLayersText: "UT:The following layers cannot be printed:",
    widthLabel: "UT: Width",
    zoomInActionText: "UT:Zoom In",
    zoomOutActionText: "UT:Zoom Out",
    zoomSelectorText: "UT:Zoom level",
    zoomSliderTipText: "UT: Zoom Level",
    zoomToLayerExtentText: "UT:Zoom to Layer Extent",
    zoomVisibleButtonText: "UT:Zoom to Original Map Extent",
    picasaText: "Picasa",
    youTubeText: "YouTube",
    hglText: "Harvard Geospatial Library",
    moreText: "More...",
    uploadLayerText: "Upload Layer",
    createLayerText: "Create Layer",
    rectifyLayerText: "Rectify Layer",
    worldmapDataText: "WorldMap Data",
    externalDataText: "External Data",
    leavePageWarningText: "If you leave this page, unsaved changes will be lost.",
    constructor: function(a) {
        this.config = a;
        this.popupCache = {};
        this.propDlgCache = {};
        this.addEvents("saved", "beforeunload", "setLayerTree");
        Ext.preg("gx_wmssource", gxp.plugins.WMSSource);
        Ext.preg("gx_olsource", gxp.plugins.OLSource);
        Ext.preg("gx_googlesource", gxp.plugins.GoogleSource);
        Ext.preg("gx_gnsource", gxp.plugins.GeoNodeSource);
        Ext.util.Observable.observeClass(Ext.data.Connection);
        Ext.data.Connection.on({
            beforerequest: function(a, c) {
                var d = c.url.replace(this.urlPortRegEx, "$1/");
                if (this.localGeoServerBaseUrl) {
                    if (0 == d.indexOf(this.localGeoServerBaseUrl)) {
                        c.url = d.replace(RegExp("^" + this.localGeoServerBaseUrl), "/geoserver/");
                        return
                    }
                    var e = this.localGeoServerBaseUrl.replace(this.urlPortRegEx, "$1/");
                    if (0 === d.indexOf(e + "rest/")) {
                        c.url = d.replace(RegExp("^" + e), "/geoserver/");
                        return
                    }
                }
                if (this.proxy && 0 !== c.url.indexOf(this.proxy) && 0 === c.url.indexOf("http")) d = c.url.replace(/&$/, "").split("?"),
                e = Ext.apply(d[1] && Ext.urlDecode(d[1]) || {},
                c.params),
                d = Ext.urlAppend(d[0], Ext.urlEncode(e)),
                e.keepPostParams || delete c.params,
                c.url = this.proxy + encodeURIComponent(d)
            },
            requestexception: function(a, c, d) {
                if (!d.failure) this.mapPlugins[0].busyMask && this.mapPlugins[0].busyMask.hide(),
                a = d.url,
                401 == c.status && a.indexOf("http" != 0) && -1 === a.indexOf(this.proxy) && this.showLoginWindow(d)
            },
            scope: this
        });
        Ext.util.Observable.observeClass(gxp.form.ColorField);
        gxp.form.ColorField.on({
            render: function(a) { (new Styler.ColorManager).register(a)
            }
        });
        window.onbeforeunload = function() {
            if (!1 === this.fireEvent("beforeunload")) return this.leavePageWarningText
        }.createDelegate(this);
        Ext.form.ComboBox.prototype.getListParent = function() {
            return this.el.up(".x-window") || document.body
        };
        Ext.Window.prototype.shadow = !1;
        if (!a.map) a.map = {};
        a.map.numZoomLevels = 22;
        OpenLayers.Map.prototype.Z_INDEX_BASE = {
            BaseLayer: 100,
            Overlay: 325,
            Feature: 3E3,
            Popup: 3025,
            Control: 4E3
        };
        GeoExplorer.superclass.constructor.apply(this, arguments);
        this.mapID = this.initialConfig.id
    },
    displayXHRTrouble: function(a) {
        a.status && Ext.Msg.show({
            title: this.connErrorTitleText,
            msg: this.connErrorText + ": " + a.status + " " + a.statusText,
            icon: Ext.MessageBox.ERROR,
            buttons: {
                ok: this.connErrorDetailsText,
                cancel: !0
            },
            fn: function(b) {
                if ("ok" == b) {
                    var c = new Ext.Window({
                        title: a.status + " " + a.statusText,
                        width: 400,
                        height: 300,
                        items: {
                            xtype: "container",
                            cls: "error-details",
                            html: a.responseText
                        },
                        autoScroll: !0,
                        buttons: [{
                            text: "OK",
                            handler: function() {
                                c.close()
                            }
                        }]
                    });
                    c.show()
                }
            }
        })
    },
    loadConfig: function(a) {
        var b = function(a, b) {
            b.headers = {
                "X-CSRFToken": Ext.util.Cookies.get("csrftoken")
            }
        },
        c = !1,
        d;
        for (d in a.sources) {
            var e = a.sources[d];
            if ("gxp_cataloguesource" === e.ptype && e.url === a.localCSWBaseUrl) {
                c = !0;
                Ext.apply(e.proxyOptions, {
                    listeners: {
                        beforeload: b
                    }
                });
                break
            }
        } ! 1 === c && (a.sources.csw = {
            ptype: "gxp_cataloguesource",
            url: a.localCSWBaseUrl,
            proxyOptions: {
                listeners: {
                    beforeload: b
                }
            }
        });
        a.tools = (a.tools || []).concat({
            ptype: "gxp_layermanager",
            groups: a.map.groups || a.treeconfig,
            id: "treecontentmgr",
            outputConfig: {
                id: "treecontent",
                autoScroll: !0,
                tbar: {
                    id: "treetbar"
                }
            },
            outputTarget: "westpanel"
        },
        {
            ptype: "gxp_zoomtolayerextent",
            actionTarget: "treecontent.contextMenu"
        },
        {
            ptype: "gxp_addcategory",
            actionTarget: ["treecontent.contextMenu"]
        },
        {
            ptype: "gxp_renamecategory",
            actionTarget: ["treecontent.contextMenu"]
        },
        {
            ptype: "gxp_removecategory",
            actionTarget: ["treecontent.contextMenu"]
        },
        {
            ptype: "gxp_removelayer",
            actionTarget: ["treecontent.contextMenu"]
        },
        {
            ptype: "gxp_layerproperties",
            layerPanelConfig: {
                gxp_wmslayerpanel: {
                    rasterStyling: !0
                }
            },
            actionTarget: ["treecontent.contextMenu"]
        },
        {
            ptype: "gxp_layershare",
            actionTarget: ["treecontent.contextMenu"]
        },
        {
            ptype: "gxp_styler",
            rasterStyling: !0,
            actionTarget: ["treecontent.contextMenu"]
        });
        GeoExplorer.superclass.loadConfig.apply(this, arguments);
        gxp.plugins.FeatureManager.prototype.redrawMatchingLayers = function(a) {
            var b = a.get("name"),
            c = a.get("source"),
            d = !1;
            this.target.mapPanel.layers.each(function(a) {
                a.get("source") === c && a.get("name") === b && (a = a.getLayer(), a.redraw(!0), d || Ext.Ajax.request({
                    url: "/data/" + a.params.LAYERS + "/ajax_layer_update/",
                    method: "POST",
                    params: {
                        layername: a.params.LAYERS
                    },
                    success: function() {},
                    failure: function() {}
                }), d = !0)
            })
        };
        var f = gxp.plugins.FeatureEditorGrid.prototype.initComponent;
        gxp.plugins.FeatureEditorGrid.prototype.initComponent = function() {
            f.apply(this);
            void 0 != this.customEditors.Description && void 0 == this.customEditors.Description.field.maxLength && this.customEditors.Description.addListener("startedit",
            function() {
                var a = new Ext.Window({
                    title: "HTML Editor",
                    renderTo: Ext.getBody(),
                    width: 600,
                    height: 300,
                    frame: !0,
                    layout: "fit",
                    closeAction: "destroy",
                    items: [{
                        xtype: "panel",
                        layout: "fit",
                        style: {
                            height: 190
                        },
                        items: [{
                            xtype: "textarea",
                            id: "html_textarea",
                            value: this.getValue(),
                            style: {
                                height: 190
                            }
                        }]
                    }],
                    bbar: ["->", new Ext.Button({
                        text: "Save",
                        cls: "x-btn-text",
                        handler: function() {
                            this.editing = !0;
                            this.setValue(nicEditors.findEditor("html_textarea").getContent());
                            this.completeEdit();
                            a.destroy()
                        },
                        scope: this
                    }), new Ext.Button({
                        text: "Cancel",
                        cls: "x-btn-text",
                        handler: function() {
                            a.destroy()
                        },
                        scope: this
                    })]
                });
                a.show(); (new nicEditor({
                    fullPanel: !0,
                    maxHeight: 190,
                    iconsPath: nicEditIconsPath
                })).panelInstance("html_textarea");
                return ! 0
            })
        }
    },
    checkLayerPermissions: function(a) {
        var b = this.tools.gn_layer_editor.actions,
        c = function(a) {
            for (var c = 0; c < b.length; c++) a ? b[c].enable() : b[c].disable()
        };
        Ext.getCmp("treecontent").getSelectionModel().getSelectedNode();
        if (null == a) c(!1);
        else {
            var d = a.getLayer();
            this.layerSources[a.get("source")] instanceof gxp.plugins.GeoNodeSource ? Ext.Ajax.request({
                url: "/data/" + d.params.LAYERS + "/ajax-edit-check",
                method: "POST",
                success: function(a) {
                    200 != a.status ? c(!1) : (d.displayOutsideMaxExtent = !0, d.redraw(), c(!0))
                },
                failure: function() {
                    c(!1)
                }
            }) : c(!1)
        }
    },
    showLoginWindow: function(a) {
        this.loginWin = null;
        var b = function() {
            c = this.loginWin.items.get(0);
            c.getForm().submit({
                waitMsg: "Logging in...",
                success: function(b, c) {
                    this.loginWin.close();
                    this.propDlgCache = {};
                    document.cookie = c.response.getResponseHeader("Set-Cookie");
                    a && Ext.Ajax.request(a)
                },
                failure: function(a) {
                    var b = a.items.get(0),
                    a = a.items.get(1);
                    b.markInvalid();
                    a.markInvalid();
                    b.focus(!0)
                },
                scope: this
            })
        }.bind(this);
        this.loginWin = new Ext.Window({
            title: "WorldMap Login",
            modal: !0,
            width: 230,
            autoHeight: !0,
            layout: "fit",
            items: [{
                xtype: "form",
                autoHeight: !0,
                labelWidth: 55,
                border: !1,
                bodyStyle: "padding: 10px;",
                url: "/accounts/ajax_login",
                waitMsgTarget: !0,
                errorReader: {
                    read: function(a) {
                        return {
                            success: 200 == a.status,
                            records: []
                        }
                    }
                },
                defaults: {
                    anchor: "100%"
                },
                items: [{
                    xtype: "textfield",
                    name: "username",
                    fieldLabel: "Username"
                },
                {
                    xtype: "textfield",
                    name: "password",
                    fieldLabel: "Password",
                    inputType: "password"
                },
                {
                    xtype: "hidden",
                    name: "csrfmiddlewaretoken",
                    value: this.csrfToken
                },
                {
                    xtype: "button",
                    text: "Login",
                    inputType: "submit",
                    handler: b
                }]
            }],
            keys: {
                key: Ext.EventObject.ENTER,
                fn: b
            }
        });
        var c = this.loginWin.items.get(0);
        c.items.get(0).focus(!1, 100);
        this.loginWin.show()
    },
    addInfo: function() {
        this.mapPanel.layers.queryBy(function(a) {
            return a.get("queryable")
        }).each(function(a) {
            var b = a.getLayer();
            "HighlightWMS" != b.name && !b.attributes && (b = "" != a.get("group") && void 0 != a.get("group") && a.get("group") ? a.get("group") : "General", a.set("group", b))
        },
        this)
    },
    removeFromSelectControl: function(a) {
        if (this.selectControl) {
            a = a.getLayer();
            if (null != this.selectControl.layers) for (var b = 0; b < this.selectControl.layers.length; b++) {
                var c = this.selectControl.layers;
                this.selectControl.layers[b].id === a.id && (c.splice(b, 1), this.selectControl.setLayer(c))
            }
            null != this.selectControl.layer && a.id === this.selectControl.layer.id && this.selectControl.setLayer([])
        }
    },
    initMapPanel: function() {
        this.mapItems = [{
            xtype: "gx_zoomslider",
            vertical: !0,
            height: 100,
            plugins: new GeoExt.ZoomSliderTip({
                template: "<div>" + this.zoomSliderTipText + ": {zoom}<div>"
            })
        }];
        OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
        OpenLayers.Util.onImageLoadErrorColor = "transparent";
        GeoExplorer.superclass.initMapPanel.apply(this, arguments);
        this.mapPlugins = [{
            ptype: "gxp_loadingindicator",
            onlyShowOnFirstLoad: !0
        }];
        this.mapPanel.map.events.register("preaddlayer", this,
        function(a) {
            var b = a.layer;
            if (b instanceof OpenLayers.Layer.WMS) b.events.on({
                loadend: function() {
                    Ext.Ajax.request({
                        url: "/data/layerstats/",
                        method: "POST",
                        params: {
                            layername: b.params.LAYERS
                        }
                    });
                    b.events.unregister("loadend", this, arguments.callee)
                },
                scope: this
            })
        })
    },
    initPortal: function() {
        this.on("beforeunload",
        function() {
            if (this.modified && this.config.edit_map) return this.showMetadataForm(),
            !1
        },
        this);
        this.mapPanel.add(this.createMapOverlay());
        if (!this.busyMask) this.busyMask = new Ext.LoadMask(Ext.getBody(), {
            msg: this.loadingMapMessage
        });
        this.busyMask.show();
        var a = new Ext.Button({
            id: "worldmap_addlayers_button",
            tooltip: this.addLayersButtonText,
            disabled: !1,
            text: '<span class="x-btn-text">' + this.addLayersButtonText + "</span>",
            handler: this.showSearchWindow,
            scope: this
        });
        this.on("ready",
        function() {
            this.addInfo();
            this.mapPanel.layers.on({
                update: function() {
                    this.modified |= 1
                },
                add: function() {
                    this.modified |= 1
                },
                remove: function() {
                    this.modified |= 1
                },
                scope: this
            });
            this.busyMask && this.busyMask.hide();
            this.config.first_visit && this.showInfoWindow();
            this.selectControl && this.selectControl.activate();
            var a = null,
            b;
            for (b in this.layerSources) source = this.layerSources[b],
            source instanceof gxp.plugins.GeoNodeSource && (a = b);
            b = null;
            for (var c in this.tools) {
                var d = this.tools[c];
                if ("gxp_addlayers" === d.ptype) b = d,
                b.startSourceId = a,
                b.catalogSourceKey = a;
                else if ("gxp_layermanager" == d.ptype) this.layerTree = d,
                this.fireEvent("setLayerTree")
            }
            if (null !== b) b.layerTree = this.layerTree,
            !this.fromLayer && !this.mapID && b.showCapabilitiesGrid()
        },
        this);
        this.gxSearchBar = new gxp.SearchBar({
            target: this
        });
        var b = new Ext.Panel({
            anchor: "100% 5%",
            items: [this.gxSearchBar]
        }),
        b = new Ext.Panel({
            layout: "fit",
            id: "westpanel",
            border: !1,
            collapseMode: "mini",
            header: !1,
            split: !0,
            bbar: [b],
            region: "west",
            width: 250
        }),
        c = new Ext.Panel({
            id: "gridWinPanel",
            collapseMode: "mini",
            title: "Identify Results",
            region: "west",
            autoScroll: !0,
            split: !0,
            items: [],
            width: 200
        }),
        d = new Ext.Panel({
            id: "gridResultsPanel",
            title: "Feature Details",
            region: "center",
            collapseMode: "mini",
            autoScroll: !0,
            split: !0,
            items: [],
            width: 400
        });
        new Ext.Window({
            id: "queryPanel",
            layout: "border",
            closeAction: "hide",
            items: [c, d],
            width: 600,
            height: 400
        });
        this.toolbar = new Ext.Toolbar({
            disabled: !0,
            id: "paneltbar",
            items: [a, this.createTools()]
        });
        this.on("ready",
        function() {
            var a = this.toolbar.items.filterBy(function(a) {
                return a.initialConfig && a.initialConfig.disabled
            });
            this.toolbar.enable();
            a.each(function(a) {
                a.disable()
            })
        },
        this);
        this.googleEarthPanel = new gxp.GoogleEarthPanel({
            mapPanel: this.mapPanel,
            listeners: {
                beforeadd: function(a) {
                    return "background" !== a.get("group")
                },
                show: function() {
                    Ext.getCmp("treecontent").contextMenu.on("beforeshow", OpenLayers.Function.False);
                    this.on("beforelayerselectionchange", OpenLayers.Function.False);
                    Ext.getCmp("treetbar").disable()
                },
                hide: function() {
                    var a = Ext.getCmp("treecontent");
                    a && (a.contextMenu.un("beforeshow", OpenLayers.Function.False), this.un("beforelayerselectionchange", OpenLayers.Function.False), Ext.getCmp("treetbar").enable())
                },
                scope: this
            }
        });
        this.mapPanelContainer = new Ext.Panel({
            layout: "card",
            region: "center",
            id: "mapPnlCntr",
            defaults: {
                border: !1
            },
            items: [this.mapPanel, this.googleEarthPanel],
            activeItem: 0
        });
        a = new Ext.Panel({
            region: "north",
            autoHeight: !0,
            contentEl: "header-wrapper"
        });
        Lang.registerLinks();
        this.portalItems = [a, {
            region: "center",
            xtype: "container",
            layout: "fit",
            border: !1,
            hideBorders: !0,
            items: {
                layout: "border",
                deferredRender: !1,
                tbar: this.toolbar,
                items: [this.mapPanelContainer, b],
                ref: "../../main"
            }
        }];
        GeoExplorer.superclass.initPortal.apply(this, arguments)
    },
    reloadWorldMapSource: function(a) {
        null == this.worldMapSourceKey && this.setWorldMapSourceKey();
        this.addWorldMapLayers(a)
    },
    setWorldMapSourceKey: function() {
        for (var a in this.layerSources) if (source = this.layerSources[a], source instanceof gxp.plugins.GeoNodeSource && 0 === source.url.replace(this.urlPortRegEx, "$1/").indexOf(this.localGeoServerBaseUrl.replace(this.urlPortRegEx, "$1/"))) this.worldMapSourceKey = a
    },
    setHGLSourceKey: function() {
        for (var a in this.layerSources) if (source = this.layerSources[a], source instanceof gxp.plugins.HGLSource) this.hglSourceKey = a;
        if (null == this.hglSourceKey) this.hglSourceKey = this.addLayerSource({
            config: {
                url: "http://hgl.harvard.edu/cgi-bin/tilecache/tilecache.cgi?",
                ptype: "gxp_hglsource"
            }
        }).id
    },
    addWorldMapLayers: function(a) {
        null == this.worldMapSourceKey && this.setWorldMapSourceKey();
        var b = this.layerSources[this.worldMapSourceKey];
        b && this.addLayerAjax(b, this.worldMapSourceKey, a)
    },
    getMapProjection: function() {
        var a = this.mapPanel.map.projection;
        return this.target.mapPanel.map.getProjectionObject() || a && new OpenLayers.Projection(a) || new OpenLayers.Projection("EPSG:4326")
    },
    addLayerAjax: function(a, b, c) {
        for (var d = this,
        e = this.mapPanel.layers,
        f = a instanceof gxp.plugins.GeoNodeSource && 0 === a.url.replace(this.urlPortRegEx, "$1/").indexOf(this.localGeoServerBaseUrl.replace(this.urlPortRegEx, "$1/")), g = 0, h = c.length; g < h; ++g) {
            var j = c[g];
            if (f) {
                var k = c[g].get("name");
                c[g].get("tiled");
                Ext.Ajax.request({
                    url: "/maps/addgeonodelayer/?" + j.get("name"),
                    method: "POST",
                    params: {
                        layername: j.get("name")
                    },
                    success: function(c) {
                        k = Ext.util.JSON.decode(c.responseText).layer;
                        k.source = b;
                        k.buffer = 0;
                        k.tiled = !0;
                        c = a.createLayerRecord(k);
                        c.selected = !0;
                        if (c) if ("background" === c.get("group")) {
                            var f = e.queryBy(function(a) {
                                return "background" === a.get("group")
                            }).getCount();
                            e.insert(f, [c])
                        } else category = c.get("group"),
                        (!category || "" == category) && c.set("group", "General"),
                        d.layerTree.addCategoryFolder({
                            group: c.get("group")
                        },
                        !0),
                        e.add([c]),
                        d.layerTree.overlayRoot.findDescendant("layer", c.getLayer()).select()
                    },
                    failure: function() {}
                })
            } else if (k = c[g].get("name"), j = a.createLayerRecord({
                name: k,
                source: b,
                buffer: 0
            })) if ("background" === j.get("group")) {
                var l = e.queryBy(function(a) {
                    return "background" === a.get("group")
                }).getCount();
                e.insert(l, [j])
            } else category = "General",
            j.set("group", category),
            d.layerTree.addCategoryFolder({
                group: j.get("group")
            },
            !0),
            e.add([j]);
            this.searchWindow.hide()
        }
    },
    initSearchPanel: function() {
        null == this.worldMapSourceKey && this.setWorldMapSourceKey();
        var a = {},
        b;
        for (b in this.layerSources) {
            var c = this.layerSources[b];
            if (c instanceof gxp.plugins.CatalogueSource) {
                var d = {};
                d[b] = c;
                Ext.apply(a, d)
            }
        }
    },
    initCapGrid: function() {
        var a, b, c = [],
        d;
        for (d in this.layerSources) b = this.layerSources[d],
        b instanceof gxp.plugins.GeoNodeSource && 0 === b.url.replace(this.urlPortRegEx, "$1/").indexOf(this.localGeoServerBaseUrl.replace(this.urlPortRegEx, "$1/")) || b.store && c.push([d, this.layerSources[d].title || d]);
        c[0] && c[0][0] && (a = c[0][0]);
        var e = new Ext.data.ArrayStore({
            fields: ["id", "title"],
            data: c
        }),
        f = new GeoExplorer.CapabilitiesRowExpander({
            ows: this.localGeoServerBaseUrl + "ows"
        });
        d = function() {
            var a = h.getValue(),
            b = this.layerSources[a],
            c = g.getSelectionModel().getSelections();
            this.addLayerAjax(b, a, c)
        };
        b = null;
        a && (b = this.layerSources[a], b.store.filterBy(function(a) {
            return !! b.getProjection(a)
        },
        this));
        var g = new Ext.grid.GridPanel({
            store: null != b ? b.store: [],
            height: 300,
            region: "center",
            autoScroll: !0,
            autoExpandColumn: "title",
            plugins: [f],
            colModel: new Ext.grid.ColumnModel([f, {
                id: "title",
                header: "Title",
                dataIndex: "title",
                sortable: !0
            }]),
            listeners: {
                rowdblclick: d,
                scope: this
            }
        }),
        h = new Ext.form.ComboBox({
            store: e,
            valueField: "id",
            displayField: "title",
            triggerAction: "all",
            editable: !1,
            allowBlank: !1,
            forceSelection: !0,
            mode: "local",
            value: a,
            listeners: {
                select: function(a, b) {
                    var c = this.layerSources[b.get("id")],
                    d = c.store;
                    d.setDefaultSort("title", "asc");
                    d.filterBy(function(a) {
                        return !! c.getProjection(a)
                    },
                    this);
                    f.ows = d.url;
                    g.reconfigure(d, g.getColumnModel());
                    g.getView().focusRow(0)
                },
                scope: this
            }
        });
        a = new Ext.Button({
            text: this.layerAdditionLabel,
            iconCls: "icon-add",
            cls: "x-btn-link-medium x-btn-text",
            handler: function() {
                k.show()
            }
        });
        var c = new Ext.Button({
            text: this.feedAdditionLabel,
            iconCls: "icon-add",
            cls: "x-btn-link-medium x-btn-text",
            handler: function() {
                this.showFeedDialog();
                this.searchWindow.hide();
                k.hide()
            },
            scope: this
        }),
        j = this,
        k = new gxp.NewSourceWindow({
            modal: !0,
            listeners: {
                "server-added": function(a, b) {
                    k.setLoading();
                    j.addLayerSource({
                        config: {
                            url: a,
                            ptype: b
                        },
                        callback: function(a) {
                            a = new e.recordType({
                                id: a,
                                title: j.layerSources[a].title || "Untitled"
                            });
                            e.insert(0, [a]);
                            h.onSelect(a, 0);
                            k.hide()
                        },
                        fallback: function() {
                            k.setError("Error contacting server.\nPlease check the url and try again.");
                            j.busyMask.hide()
                        },
                        scope: j
                    })
                }
            },
            addSource: function(a, b, c, d) {
                j.busyMask = d.loadMask
            }
        });
        d = new Ext.Button({
            text: "Add Layers",
            iconCls: "gxp-icon-addlayers",
            handler: d,
            scope: this
        });
        var l = {
            xtype: "box",
            autoEl: {
                tag: "span",
                html: this.layerSelectionLabel
            }
        };
        a = new Ext.Panel({
            frame: !1,
            border: !1,
            region: "north",
            height: 40,
            layout: new Ext.layout.HBoxLayout({
                defaultMargins: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 0
                }
            }),
            items: [l, h, {
                xtype: "spacer",
                width: 20
            },
            a, c]
        });
        c = new Ext.Panel({
            frame: !1,
            border: !1,
            region: "south",
            layout: new Ext.layout.HBoxLayout({
                defaultMargins: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 0
                }
            }),
            items: [d]
        });
        this.capGrid = new Ext.Panel({
            autoScroll: !0,
            title: this.externalDataText,
            header: !1,
            layout: "border",
            border: !1,
            renderTo: "externalDiv",
            padding: "2 0 0 20",
            items: [a, g, c],
            listeners: {
                hide: function() {
                    g.getSelectionModel().clearSelections()
                }
            }
        })
    },
    showCapabilitiesGrid: function() {
        this.capGrid || this.initCapGrid();
        this.capGrid.show()
    },
    createMapOverlay: function() {
        var a = new Ext.BoxComponent({
            html: '<div class="cga-link" onclick="javascript:window.open(\'http://gis.harvard.edu\', \'_blank\');"><a href="http://gis.harvard.edu">Center for Geographic Analysis</a></div>'
        }),
        b = new Ext.BoxComponent({
            autoEl: {
                tag: "div",
                cls: "olControlScaleLine overlay-element overlay-scaleline"
            }
        });
        b.on("render",
        function() {
            var a = new OpenLayers.Control.ScaleLine({
                div: b.getEl().dom,
                geodesic: !0
            });
            this.mapPanel.map.addControl(a);
            a.activate()
        },
        this);
        var c = new Ext.Panel({
            cls: "overlay-element overlay-scalechooser",
            ctCls: "transparent-panel",
            border: !1
        });
        this.on("ready",
        function() {
            function a() {
                var c = b.queryBy(function(a) {
                    return this.mapPanel.map.getZoom() == a.data.level
                },
                this);
                0 < c.length ? (c = c.items[0], d.setValue("1 : " + parseInt(c.data.scale, 10))) : d.rendered && d.clearValue()
            }
            var b = new GeoExt.data.ScaleStore({
                map: this.mapPanel.map
            }),
            d = new Ext.form.ComboBox({
                emptyText: this.zoomSelectorText,
                tpl: '<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',
                editable: !1,
                triggerAction: "all",
                mode: "local",
                store: b,
                width: 110
            });
            d.on({
                click: function(a) {
                    a.stopEvent()
                },
                mousedown: function(a) {
                    a.stopEvent()
                },
                select: function(a, b) {
                    this.mapPanel.map.zoomTo(b.data.level)
                },
                scope: this
            });
            a.call(this);
            this.mapPanel.map.events.register("zoomend", this, a);
            c.add(d);
            c.doLayout()
        },
        this);
        var d = new Ext.Panel({
            cls: "map-overlay",
            items: [b, c, a]
        });
        d.on("afterlayout",
        function() {
            b.getEl().dom.style.position = "relative";
            b.getEl().dom.style.display = "inline";
            d.getEl().on("click",
            function(a) {
                a.stopEvent()
            });
            d.getEl().on("mousedown",
            function(a) {
                a.stopEvent()
            })
        },
        this);
        return d
    },
    createTools: function() {
        var a = new Ext.Button({
            tooltip: this.infoButtonText,
            text: '<span class="x-btn-text">' + this.infoButtonText + "</span>",
            handler: this.showInfoWindow,
            scope: this
        });
        this.mapPanel.add(new Ext.Button({
            text: this.moreText,
            cls: "more-overlay-element",
            id: "moreBtn",
            menu: {
                items: [{
                    text: this.flickrText,
                    iconCls: "icon-flickr",
                    scope: this,
                    disabled: !1,
                    hidden: !1,
                    handler: function() {
                        this.showFeedDialog("gx_flickrsource")
                    },
                    scope: this
                },
                {
                    text: this.picasaText,
                    iconCls: "icon-picasa",
                    scope: this,
                    disabled: !1,
                    hidden: !1,
                    handler: function() {
                        this.showFeedDialog("gx_picasasource")
                    },
                    scope: this
                },
                {
                    text: this.youTubeText,
                    iconCls: "icon-youtube",
                    scope: this,
                    disabled: !1,
                    hidden: !1,
                    handler: function() {
                        this.showFeedDialog("gx_youtubesource")
                    },
                    scope: this
                },
                {
                    text: this.hglText,
                    iconCls: "icon-harvard",
                    scope: this,
                    handler: function() {
                        this.showFeedDialog("gx_hglfeedsource")
                    },
                    scope: this
                }]
            }
        }));
        var b = new Ext.Action({
            id: "worldmap_publish_tool",
            tooltip: this.publishActionText,
            handler: this.makeExportDialog,
            scope: this,
            text: '<span class="x-btn-text">' + this.publishBtnText + "</span>",
            disabled: !this.mapID
        }),
        c = this.config.edit_map || "boston" !== this.about.urlsuffix ? this.saveMapBtnText: this.saveMapAsText,
        a = [new Ext.Button({
            tooltip: c,
            handler: this.showMetadataForm,
            scope: this,
            disabled: !this.config.edit_map && "boston" !== this.about.urlsuffix,
            text: '<span class="x-btn-text">' + c + "</span>"
        }), b, a, "->"];
        "boston" == this.about.urlsuffix && a.splice(13, 0, new GeoExplorer.SocialExplorer(this));
        this.on("saved",
        function() {
            b.enable();
            this.modified ^= this.modified & 1
        },
        this);
        return a
    },
    makeExportDialog: function() {
        var a = this.getState(),
        b = [];
        for (x = 0, max = this.layerTree.overlayRoot.childNodes.length; x < max; x++) node = this.layerTree.overlayRoot.childNodes[x],
        b.push({
            group: node.text,
            expanded: node.expanded.toString()
        });
        a.map.groups = b;
        Ext.Ajax.request({
            url: "/maps/snapshot/create",
            method: "POST",
            jsonData: a,
            success: function(a) {
                a = a.responseText;
                null != a && (new Ext.Window({
                    title: this.publishActionText,
                    layout: "fit",
                    width: 380,
                    autoHeight: !0,
                    items: [{
                        xtype: "gx_linkembedmapdialog",
                        linkUrl: this.rest + (this.about.urlsuffix ? this.about.urlsuffix: this.mapID) + "/" + a,
                        linkMessage: '<span style="font-size:10pt;">Paste link in email or IM:</span>',
                        publishMessage: '<span style="font-size:10pt;">Paste HTML to embed in website:</span>',
                        url: this.rest + (this.about.urlsuffix ? this.about.urlsuffix: this.mapID) + "/" + a + "/embed"
                    }]
                })).show()
            },
            failure: function() {
                return ! 1
            },
            scope: this
        })
    },
    initMetadataForm: function() {
        var a = this,
        b = Ext.getCmp("gx_saveButton"),
        c = Ext.getCmp("gx_saveAsButton"),
        d = new Ext.form.TextField({
            width: "95%",
            fieldLabel: this.metaDataMapTitle,
            value: this.config.edit_map ? this.about.title: "",
            allowBlank: !1,
            enableKeyEvents: !0,
            listeners: {
                valid: function() {
                    e.isValid() && (this.config.edit_map && b.enable(), c.hidden || c.enable())
                },
                invalid: function() {
                    b.disable();
                    c.hidden || c.disable()
                },
                scope: this
            }
        });
        Ext.apply(Ext.form.VTypes, {
            UniqueMapId: this.mapID,
            UniqueUrl: function(a, b) {
                if (!a.match(/^(\w+[-]*)+$/g)) return this.UniqueUrlText = "URL's can only contain letters, numbers, dashes & underscores.",
                !1;
                Ext.Ajax.request({
                    url: "/maps/checkurl/",
                    method: "POST",
                    params: {
                        query: a,
                        mapid: this.UniqueMapId
                    },
                    success: function(c) {
                        if (0 < Ext.decode(c.responseText).count) {
                            this.UniqueUrlText = "The following URL's are already taken:";
                            var c = Ext.decode(c.responseText).urls,
                            d = !0,
                            e;
                            for (e in c) void 0 != c[e].url && null != c[e].url && (this.UniqueUrlText += "<br/>" + c[e].url),
                            c[e].url == a && (d = !1);
                            d || b.markInvalid(this.UniqueUrlText)
                        }
                    },
                    failure: function() {
                        return ! 1
                    },
                    scope: this
                });
                return ! 0
            },
            UniqueUrlText: "The following URL's are already taken, please choose another"
        });
        var e = new Ext.form.TextField({
            width: "30%",
            fieldLabel: this.metaDataMapUrl + "<br/><span style='font-style:italic;'>http://" + document.location.hostname + "/maps/</span>",
            labelSeparator: "",
            enableKeyEvents: !0,
            validationEvent: "onblur",
            vtype: "UniqueUrl",
            itemCls: "x-form-field-inline",
            ctCls: "x-form-field-inline",
            value: this.config.edit_map ? this.about.urlsuffix: "",
            listeners: {
                valid: function() {
                    d.isValid() && (this.config.edit_map && b.enable(), c.hidden || c.enable())
                },
                invalid: function() {
                    b.disable();
                    c.hidden || c.disable()
                },
                scope: this
            }
        }),
        f = function(b) {
            Ext.getCmp("gx_saveButton").disable();
            Ext.getCmp("gx_saveAsButton").disable();
            Ext.Ajax.request({
                url: "/maps/checkurl/",
                method: "POST",
                params: {
                    query: e.getValue(),
                    mapid: b ? 0 : a.mapID
                },
                success: function(c) {
                    var f = "",
                    h = !0;
                    if (0 < Ext.decode(c.responseText).count) {
                        var f = "The following URL's are already taken:",
                        c = Ext.decode(c.responseText).urls,
                        j;
                        for (j in c) void 0 != c[j].url && null != c[j].url && (f += "<br/>" + c[j].url),
                        c[j].url == e.getValue() && (h = !1);
                        if (!h) return e.markInvalid(f),
                        Ext.getCmp("gx_saveButton").enable(),
                        Ext.getCmp("gx_saveAsButton").enable(),
                        !1
                    }
                    if (h) a.about.title = Ext.util.Format.stripTags(d.getValue()),
                    a.about["abstract"] = Ext.util.Format.stripTags(g.getValue()),
                    a.about.urlsuffix = e.getValue(),
                    a.about.introtext = nicEditors.findEditor("intro_text_area").getContent(),
                    a.save(b),
                    a.initInfoTextWindow()
                },
                failure: function() {
                    Ext.getCmp("gx_saveButton").enable();
                    Ext.getCmp("gx_saveAsButton").enable();
                    return ! 1
                },
                scope: this
            })
        },
        g = new Ext.form.TextArea({
            width: "95%",
            height: 50,
            fieldLabel: this.metaDataMapAbstract,
            value: this.about["abstract"]
        }),
        h = new Ext.form.TextArea({
            width: 550,
            height: 200,
            fieldLabel: this.metaDataMapIntroText,
            id: "intro_text_area",
            value: this.about.introtext
        }),
        j = new Ext.FormPanel({
            bodyStyle: {
                padding: "5px"
            },
            labelAlign: "top",
            items: [d, e, g, h]
        });
        j.enable();
        b = new Ext.Button({
            id: "gx_saveButton",
            text: this.metadataFormSaveText,
            cls: "x-btn-text",
            disabled: !this.about.title || !this.config.edit_map,
            handler: function() {
                f(!1)
            },
            scope: this
        });
        c = new Ext.Button({
            id: "gx_saveAsButton",
            text: this.metadataFormSaveAsCopyText,
            cls: "x-btn-text",
            disabled: !this.about.title,
            hidden: "boston" !== this.about.urlsuffix,
            handler: function() {
                f(!0)
            },
            scope: this
        });
        this.metadataForm = new Ext.Window({
            title: this.metaDataHeader,
            closeAction: "hide",
            items: j,
            modal: !0,
            width: 600,
            autoHeight: !0,
            bbar: ["->", b, c, new Ext.Button({
                text: this.metadataFormCancelText,
                cls: "x-btn-text",
                handler: function() {
                    d.setValue(this.about.title);
                    g.setValue(this.about["abstract"]);
                    e.setValue(this.about.urlsuffix);
                    h.setValue(this.about.introtext);
                    this.metadataForm.hide()
                },
                scope: this
            })]
        })
    },
    initInfoTextWindow: function() {
        this.infoTextPanel = new Ext.FormPanel({
            bodyStyle: {
                padding: "5px"
            },
            labelAlign: "top",
            preventBodyReset: !0,
            autoScroll: !1,
            html: this.about.introtext
        });
        this.infoTextPanel.enable();
        this.infoTextWindow = new Ext.Window({
            title: this.about.title,
            closeAction: "hide",
            items: this.infoTextPanel,
            modal: !0,
            width: 500,
            height: 400,
            autoScroll: !0
        })
    },
    initHelpTextWindow: function() {
        this.helpTextPanel = new Ext.FormPanel({
            bodyStyle: {
                padding: "5px"
            },
            labelAlign: "top",
            preventBodyReset: !0,
            autoScroll: !1,
            autoHeight: !0,
            autoLoad: {
                url: "/maphelp",
                scripts: !0
            }
        });
        this.helpTextPanel.enable();
        this.helpTextWindow = new Ext.Window({
            title: this.helpLabel,
            closeAction: "hide",
            items: this.helpTextPanel,
            modal: !0,
            width: 1E3,
            height: 500,
            autoScroll: !0
        })
    },
    initUploadPanel: function() {
        this.uploadPanel = new Ext.Panel({
            id: "worldmap_update_panel",
            title: this.uploadLayerText,
            header: !1,
            autoLoad: {
                url: "/data/upload/?tab=true",
                scripts: !0
            },
            listeners: {
                activate: function(a) {
                    a.getUpdater().refresh()
                }
            },
            renderTo: "uploadDiv",
            autoScroll: !0
        })
    },
    initCreatePanel: function() {
        this.createPanel = new Ext.Panel({
            id: "worldmap_create_panel",
            title: this.createLayerText,
            header: !1,
            autoLoad: {
                url: "/data/create_pg_layer/?tab=true",
                scripts: !0
            },
            listeners: {
                activate: function(a) {
                    a.getUpdater().refresh()
                }
            },
            renderTo: "createDiv",
            autoScroll: !0
        })
    },
    initWarperPanel: function() {
        this.warperPanel = new Ext.Panel({
            id: "worldmap_warper_panel",
            title: this.rectifyLayerText,
            header: !1,
            contentEl: "warpDiv",
            autoScroll: !0
        })
    },
    initTabPanel: function() {
        this.dataTabPanel = new Ext.TabPanel({
            activeTab: 0,
            region: "center",
            items: [{
                contentEl: "searchDiv",
                title: this.worldmapDataText,
                autoScroll: !0
            },
            this.capGrid]
        });
        this.config.edit_map && Ext.get("uploadDiv") && (this.dataTabPanel.add(this.uploadPanel), this.config.db_datastore && this.dataTabPanel.add(this.createPanel));
        this.dataTabPanel.add(this.warperPanel)
    },
    getBoundingBoxConfig: function() {
        var a = this.getState();
        a.tools = [];
        var b = this.mapPanel.map.getCenter();
        Ext.apply(a.map, {
            center: [b.lon, b.lat],
            zoom: this.mapPanel.map.zoom,
            layers: []
        });
        this.mapPanel.layers.each(function(b) {
            if ("background" === b.get("group")) {
                var d = b.getLayer();
                if (d.displayInLayerSwitcher && !0 === d.getVisibility()) {
                    var d = b.get("source"),
                    e = this.layerSources[d];
                    if (!e) throw Error("Could not find source for layer '" + b.get("name") + "'");
                    a.map.layers.push(e.getConfigForRecord(b));
                    a.sources[d] || (a.sources[d] = Ext.apply({},
                    e.initialConfig))
                }
            }
        },
        this);
        return a
    },
    initSearchWindow: function() {
        var a = this.mapPanel.map.getExtent().transform(new OpenLayers.Projection(this.mapPanel.map.projection), new OpenLayers.Projection("EPSG:4326"));
        this.bbox = new GeoNode.BoundingBoxWidget({
            proxy: "/proxy/?url=",
            viewerConfig: this.getBoundingBoxConfig(),
            renderTo: "refine",
            height: 275,
            isEnabled: !0,
            useGxpViewer: !0
        });
        this.searchTable = new GeoNode.SearchTable({
            renderTo: "search_results",
            trackSelection: !0,
            permalinkURL: "/data/search",
            searchURL: "/data/search/api",
            layerDetailURL: "/data/search/detail",
            constraints: [this.bbox],
            searchParams: {
                limit: 10,
                bbox: a.toBBOX()
            },
            searchOnLoad: !1
        });
        this.searchTable.hookupSearchButtons("refine");
        new GeoNode.DataCart({
            store: this.searchTable.dataCart,
            renderTo: "data_cart",
            addToMapButtonFunction: this.addWorldMapLayers,
            addToMapButtonTarget: this
        });
        this.capGrid || this.initCapGrid(); ! this.uploadPanel && this.config.edit_map && Ext.get("uploadDiv") && this.initUploadPanel(); ! this.createPanel && this.config.edit_map && !0 === this.config.db_datastore && this.initCreatePanel();
        this.warperPanel || this.initWarperPanel();
        this.dataTabPanel || this.initTabPanel();
        this.searchWindow = new Ext.Window({
            id: "ge_searchWindow",
            title: "Add Layers",
            closeAction: "hide",
            layout: "fit",
            width: 850,
            height: 600,
            items: [this.dataTabPanel],
            modal: !0,
            autoScroll: !0,
            bodyStyle: "background-color:#FFF"
        })
    },
    showFeedDialog: function(a) {
        if (!this.feedDialog) this.feedDialog = new gxp.FeedSourceDialog({
            title: "Add a GeoRSS Feed",
            closeAction: "hide",
            target: this,
            listeners: {
                "feed-added": function(a, c) {
                    var d = {
                        config: {
                            ptype: a
                        }
                    };
                    if (c.url) d.config.url = c.url;
                    d = this.addLayerSource(d);
                    c.source = d.id;
                    d = d.createLayerRecord(c);
                    this.layerTree.addCategoryFolder({
                        group: d.get("group")
                    },
                    !0);
                    this.mapPanel.layers.add([d]);
                    this.layerTree.overlayRoot.findDescendant("layer", d.getLayer()).select()
                },
                scope: this
            },
            scope: this
        });
        this.feedDialog.show();
        this.feedDialog.alignTo(document, "t-t");
        a && this.feedDialog.sourceTypeRadioList.setValue(a)
    },
    showSearchWindow: function() {
        this.searchWindow || this.initSearchWindow();
        this.searchWindow.show();
        this.searchWindow.alignTo(document, "tl-tl");
        this.searchTable.doSearch();
        this.mapPanel.layers.data.items.length > this.maxMapLayers && Ext.Msg.alert(this.maxLayersTitle, this.maxLayersText.replace("%n", this.mapPanel.layers.data.items.length).replace("%max", this.maxMapLayers))
    },
    showInfoWindow: function() {
        this.infoTextWindow || this.initInfoTextWindow();
        this.infoTextWindow.show();
        this.infoTextWindow.alignTo(document, "t-t")
    },
    showMetadataForm: function() {
        this.metadataForm ? this.metadataForm.show() : (this.initMetadataForm(), this.metadataForm.show(), (new nicEditor({
            fullPanel: !0,
            maxHeight: 200,
            iconsPath: nicEditIconsPath
        })).panelInstance("intro_text_area"));
        this.metadataForm.alignTo(document, "t-t")
    },
    updateURL: function() {
        return this.rest + this.mapID + "/data"
    },
    save: function(a) {
        var b = this.getState(),
        c = [];
        for (x = 0, max = this.layerTree.overlayRoot.childNodes.length; x < max; x++) node = this.layerTree.overlayRoot.childNodes[x],
        c.push({
            group: node.text,
            expanded: node.expanded.toString()
        });
        b.map.groups = c;
        if (!this.mapID || a) Ext.Ajax.request({
            url: this.rest,
            method: "POST",
            jsonData: b,
            success: function(a) {
                var b = a.getResponseHeader("Location"),
                b = b.replace(/^\s*/, ""),
                b = b.replace(/\s*$/, "");
                this.mapID = b = b.match(/[\d]*$/)[0];
                this.fireEvent("saved", b);
                this.metadataForm.hide();
                Ext.Msg.wait("Saving Map", "Your new map is being saved...");
                window.location = a.getResponseHeader("Location")
            },
            failure: function(a, b) {
                401 === a.status ? this.showLoginWindow(b) : Ext.Msg.alert("Error", a.responseText);
                Ext.getCmp("gx_saveButton").enable();
                Ext.getCmp("gx_saveAsButton").enable()
            },
            scope: this
        });
        else {
            var d = Ext.getCmp("gx_saveAsButton");
            Ext.Ajax.request({
                url: this.updateURL(),
                method: "PUT",
                jsonData: b,
                success: function() {
                    this.fireEvent("saved", this.mapID);
                    this.metadataForm.hide();
                    Ext.getCmp("gx_saveButton").enable();
                    d.hidden || d.enable()
                },
                failure: function(a, b) {
                    401 === a.status ? this.showLoginWindow(b) : (Ext.Msg.alert("Error", a.responseText), Ext.getCmp("gx_saveButton").enable(), d.hidden || d.enable())
                },
                scope: this
            })
        }
    },
    addHGL: function(a, b) {
        Ext.Ajax.request({
            url: "/hglServiceStarter/" + b,
            method: "POST",
            success: function() {
                null == this.hglSourceKey && this.setHGLSourceKey();
                var c = this.layerSources[this.hglSourceKey];
                c && (c = c.createLayerRecord({
                    title: a,
                    name: b,
                    source: this.hglSourceKey,
                    url: c.url,
                    group: "Harvard Geospatial Library",
                    properties: "gxp_wmslayerpanel",
                    fixed: !0,
                    selected: !1,
                    queryable: !0,
                    disabled: !1,
                    "abstract": "",
                    styles: [],
                    format: "image/png"
                }), this.layerTree.addCategoryFolder(c.get("group"), !0), this.mapPanel.layers.add([c]), this.layerTree.overlayRoot.findDescendant("layer", c.getLayer()).select())
            },
            failure: function() {
                Ext.Msg.alert("Restricted", "Access to this layer is restricted")
            },
            scope: this
        })
    }
});
Ext.namespace("GeoExplorer");
GeoExplorer.Viewer = Ext.extend(GeoExplorer, {
    loadConfig: function(a) {
        var b, c;
        for (c in a.sources) {
            b = a.sources[c];
            if (!b.ptype || /wmsc?source/.test(b.ptype)) b.forceLazy = !1 === a.useCapabilities;
            if (!1 === a.useToolbar) {
                b = !0;
                for (var d, e = a.map.layers.length - 1; 0 <= e; --e) d = a.map.layers[e],
                d.source == c && (!1 === d.visibility ? a.map.layers.remove(d) : b = !1);
                b && delete a.sources[c]
            }
        }
        if (!1 !== a.useToolbar) a.tools = (a.tools || []).concat({
            ptype: "gxp_styler",
            id: "styler",
            rasterStyling: !0,
            actionTarget: void 0
        });
        GeoExplorer.superclass.loadConfig.apply(this, arguments)
    },
    initPortal: function() { ! 1 !== this.useMapOverlay && this.mapPanel.add(this.createMapOverlay());
        if (!1 !== this.useToolbar) this.toolbar = new Ext.Toolbar({
            xtype: "toolbar",
            region: "north",
            autoHeight: !0,
            disabled: !0,
            items: this.createTools()
        }),
        this.on("ready",
        function() {
            this.toolbar.enable()
        },
        this);
        this.mapPanelContainer = new Ext.Panel({
            layout: "card",
            region: "center",
            ref: "../main",
            tbar: this.toolbar,
            defaults: {
                border: !1
            },
            items: [this.mapPanel],
            ref: "../main",
            activeItem: 0
        });
        window.google && google.earth && this.mapPanelContainer.add(new gxp.GoogleEarthPanel({
            mapPanel: this.mapPanel,
            listeners: {
                beforeadd: function(a) {
                    return "background" !== a.get("group")
                }
            }
        }));
        this.portalItems = [this.mapPanelContainer];
        GeoExplorer.superclass.initPortal.apply(this, arguments)
    },
    addLayerSource: function(a) {
        GeoExplorer.superclass.addLayerSource.apply(this, arguments)
    },
    createTools: function() {
        var a = GeoExplorer.Viewer.superclass.createTools.apply(this, arguments),
        b = new Ext.Button({
            tooltip: "Layer Switcher",
            iconCls: "icon-layer-switcher",
            menu: new gxp.menu.LayerMenu({
                layers: this.mapPanel.layers
            })
        });
        a.unshift("-");
        a.unshift(b);
        b = new Ext.Button({
            tooltip: "About this map",
            iconCls: "icon-about",
            handler: this.displayAppInfo,
            scope: this
        });
        a.push("->");
        a.push(b);
        return a
    }
});
GeoExplorer.SocialExplorer = function(a) {
    var b = "http://www.socialexplorer.com/pub/maps/map3.aspx?g=0&mapi=SE0012&themei=B23A1CEE3D8D405BA2B079DDF5DE9402";
    if (a.config.social_explorer && a.config.social_explorer[0]) b = a.config.social_explorer[0].url;
    var c = new Ext.data.SimpleStore({
        fields: ["dataFieldName", "displayFieldName"],
        data: [[0, "Yelp"], [1, "Bing Map"], [2, "Social Explorer"]],
        autoLoad: !1
    });
    return new Ext.form.ComboBox({
        id: "jumpbar",
        store: c,
        displayField: "displayFieldName",
        valueField: "dataFieldName",
        typeAhead: !0,
        forceSelection: !0,
        fieldLabel: "ComboBox",
        emptyText: "Jump to...",
        mode: "local",
        triggerAction: "all",
        selectOnFocus: !0,
        editable: !0,
        listeners: {
            select: function(c, e) {
                displayProjection = new OpenLayers.Projection("EPSG:4326");
                if (0 == e.data.dataFieldName) {
                    var f = a.mapPanel.map.getExtent(),
                    f = f.transform(a.mapPanel.map.getProjectionObject(), displayProjection);
                    window.open("http://www.yelp.com/search?find_desc=&ns=1&rpp=10#l=g:" + f.left + "%2C" + f.bottom + "%2C" + f.right + "%2C" + f.top + "&sortby=category")
                } else 1 == e.data.dataFieldName ? (f = a.mapPanel.map.getCenter().transform(a.mapPanel.map.getProjectionObject(), displayProjection), window.open("http://www.bing.com/maps/default.aspx?v=2&FORM=LMLTCP&cp=" + f.lat + "~" + f.lon + "&style=r&lvl=" + a.mapPanel.map.getZoom() + "&tilt=-90&dir=0&alt=-1000&phx=0&phy=0&phscl=1&encType=1")) : 2 == e.data.dataFieldName && (f = a.mapPanel.map.getExtent(), f = f.transform(a.mapPanel.map.getProjectionObject(), displayProjection), window.open(b + "&l=" + f.left + "&r=" + f.right + "&t=" + f.top + "&b=" + f.bottom + "&rndi=1"))
            }
        }
    })
};
function ConvertLonToAlbersEqArea(a) {
    return roundNumber(87832.461034585 * (a + 100), 2)
}
function ConvertLatToAlbersEqArea(a) {
    var a = Math.sin(3.14159265358979 * a / 180),
    b = 0.0818191955335 * a;
    return roundNumber(0.5 * 0.993305619242251 * (a / (1 - b * b) - 6.111035396275441 * Math.log((1 - b) / (1 + b))) / 1.237057815E-7, 2)
}
function roundNumber(a, b) {
    return 8191 < a && 10485 > a ? Math.round((a - 5E3) * Math.pow(10, b)) / Math.pow(10, b) + 5E3: Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
}
Ext.namespace("GeoExplorer");
GeoExplorer.CapabilitiesRowExpander = Ext.extend(Ext.grid.RowExpander, {
    categoryText: "UT:Category:",
    categoryEmptyText: "UT:No category is provided for this layer.",
    abstractText: "UT:Abstract:",
    attributionEmptyText: "UT: No attribution information is provided for this layer.",
    attributionText: "UT:Provided by:",
    downloadText: "UT:Download:",
    keywordEmptyText: "UT: No keywords are listed for this layer.",
    keywordText: "UT:Keywords:",
    metadataEmptyText: "UT: No metadata URLs are defined for this layer.",
    metadataText: "UT:Metadata Links:",
    ows: null,
    constructor: function(a) {
        a = a || {};
        a.tpl = a.tpl || this.getDefaultTemplate();
        var b, c;
        b = this;
        c = Ext.apply({
            ows: function() {
                return b.ows
            }
        },
        this.templateLibrary);
        c.metadataEmptyText = this.metadataEmptyText;
        c.keywordEmptyText = this.keywordEmptyText;
        c.attributionEmptyText = this.attributionEmptyText;
        Ext.apply(a.tpl, c);
        GeoExplorer.CapabilitiesRowExpander.superclass.constructor.call(this, a);
        this.on("beforeexpand",
        function(a, b, c) {
            a = b.store;
            if (a instanceof GeoExt.data.WMSCapabilitiesStore) {
                var g = a.reader.raw.capability.request.describelayer;
                g && Ext.Ajax.request({
                    url: g.href,
                    params: {
                        REQUEST: "DescribeLayer",
                        VERSION: a.reader.raw.version,
                        LAYERS: b.get("layer").params.LAYERS
                    },
                    disableCaching: !1,
                    success: function(a) {
                        a = (new OpenLayers.Format.WMSDescribeLayer).read(a.responseXML && a.responseXML.documentElement ? a.responseXML: a.responseText);
                        a.length && "WFS" === a[0].owsType && Ext.get(Ext.query(".wfs.nodisplay", c)).removeClass("nodisplay")
                    },
                    failure: function() {},
                    scope: this
                });
                return ! 0
            }
        },
        this)
    },
    getDefaultTemplate: function() {
        return new Ext.Template("<p><b>" + this.categoryText + "</b> {category}</p><p><b>" + this.abstractText + "</b> {abstract}</p><p><b>" + this.attributionText + "</b> {attribution:this.attributionLink}</p><p><b>" + this.metadataText + "</b> {metadataURLs:this.metadataLinks}</p><p><b>" + this.keywordText + "</b> {keywords:this.keywordList}</p>")
    },
    templateLibrary: {
        wmsParams: function(a, b, c) {
            if (null != b.llbbox) {
                var c = c || 8.5 / 11,
                d, e, f;
                d = (b.llbbox[2] - b.llbbox[0]) / (b.llbbox[3] - b.llbbox[1]);
                f = e = 1;
                d > c ? f = d / c: e = c / d;
                return {
                    service: "wms",
                    request: "GetMap",
                    bbox: this.adjustBounds(e, f, b.llbbox).toString(),
                    layers: a,
                    srs: "EPSG:4326",
                    width: 425,
                    height: 550
                }
            }
        },
        adjustBounds: function(a, b, c) {
            var d, e, f;
            d = c[2] - c[0];
            e = c[3] - c[1];
            f = (c[2] + c[0]) / 2;
            c = (c[3] + c[1]) / 2;
            return [f - a * d / 2, c - b * e / 2, f + a * d / 2, c + b * e / 2]
        },
        wfsParams: function(a) {
            return {
                service: "wfs",
                request: "GetFeature",
                typeName: a
            }
        },
        showDownload: function(a) {
            return a && -1 !== a.indexOf("application/vnd.google-earth.kmz+xml") && -1 !== a.indexOf("application/pdf") && -1 !== a.indexOf("image/geotiff") ? "": "nodisplay"
        },
        shpUrl: function(a, b) {
            var c = Ext.apply(this.wfsParams(a, b), {
                outputFormat: "SHAPE-ZIP"
            });
            return this.ows() + "?" + Ext.urlEncode(c)
        },
        pdfUrl: function(a, b) {
            var c = Ext.apply(this.wmsParams(a, b), {
                format: "application/pdf"
            });
            return this.ows() + "?" + Ext.urlEncode(c)
        },
        kmlUrl: function(a, b) {
            var c = Ext.apply(this.wmsParams(a, b), {
                format: "application/vnd.google-earth.kmz+xml",
                height: 2048,
                width: 2048
            },
            1);
            return this.ows() + "?" + Ext.urlEncode(c)
        },
        geoTiffUrl: function(a, b) {
            var c = Ext.apply(this.wmsParams(a, b), {
                format: "image/geotiff"
            });
            return this.ows() + "?" + Ext.urlEncode(c)
        },
        metadataLinks: function(a) {
            if (null == a || 0 === a.length) return "<em>" + this.metadataEmptyText + "</em>";
            var b, c, d;
            c = [];
            for (b = 0, d = a.length; b < d; b++) c.push('<a target="_blank" href="' + a[b].href + '"> ' + a[b].type + "</a>");
            return c.join(", ")
        },
        keywordList: function(a) {
            return null == a || 0 === a.length ? "<em>" + this.keywordEmptyText + "</em>": a.join(", ")
        },
        attributionLink: function(a) {
            return null == a || null == a.href ? "<em>" + this.attributionEmptyText + "</em>": '<a href="' + a.href + '"> ' + a.title + "</a>"
        }
    }
});
GeoExplorer.GeopsGetFeatureInfo = OpenLayers.Class(OpenLayers.Control.WMSGetFeatureInfo, {
    infoFormat: "text/json",
    format: null,
    radius: 10,
    buildWMSOptions: function(a, b, c, d) {
        for (var e = [], f = [], g = 0, h = b.length; g < h; g++) null != b[g].params.LAYERS && (e = e.concat(b[g].params.LAYERS), f = f.concat(this.getStyleNames(b[g])));
        b = b[0];
        g = this.map.getProjection(); (h = new OpenLayers.Projection("EPSG:4326")) && h.equals(this.map.getProjectionObject()) && (g = h.getCode());
        var h = 5 * this.map.resolution,
        h = h * h + h * h,
        j = this.map.getLonLatFromViewPortPx(c),
        j = "orddist(point(goog_x,goog_y), point(" + j.lon + "," + j.lat + "))",
        h = (b.params.SQL + " AND  " + j + " < " + h + " order by " + j + " LIMIT " + this.maxFeatures).toLowerCase(),
        d = OpenLayers.Util.extend({
            service: "WMS",
            version: b.params.VERSION,
            SQL: h,
            request: "GetFeatureInfo",
            exceptions: b.params.EXCEPTIONS,
            bbox: this.map.getExtent().toBBOX(null, b.reverseAxisOrder()),
            feature_count: this.maxFeatures,
            height: this.map.getSize().h,
            width: this.map.getSize().w,
            format: d,
            COLUMNS: "all",
            info_format: b.params.INFO_FORMAT || this.infoFormat
        },
        1.3 <= parseFloat(b.params.VERSION) ? {
            crs: g,
            i: parseInt(c.x),
            j: parseInt(c.y)
        }: {
            srs: g,
            x: parseInt(c.x),
            y: parseInt(c.y)
        });
        0 != e.length && (d = OpenLayers.Util.extend({
            layers: e,
            query_layers: e,
            styles: f
        },
        d));
        OpenLayers.Util.applyDefaults(d, this.vendorParams);
        return {
            url: a,
            params: OpenLayers.Util.upperCaseObject(d),
            callback: function(b) {
                this.handleResponse(c, b, a)
            },
            scope: this
        }
    },
    CLASS_NAME: "GeoExplorer.GeopsGetFeatureInfo"
});
Ext.namespace("GeoExt");
GeoExt.GeopsLegend = Ext.extend(GeoExt.WMSLegend, {
    initComponent: function() {
        GeoExt.GeopsLegend.superclass.initComponent.call(this);
        var a = this.layerRecord.getLayer();
        this._noMap = !a.map;
        a.events.register("moveend", this, this.onLayerMoveend);
        a.events.register("update", this, this.onLayerMoveend);
        this.update()
    },
    onLayerMoveend: function(a) {
        if (!0 === a.zoomChanged && !0 === this.useScaleParameter || this._noMap) delete this._noMap,
        this.update()
    },
    getLegendUrl: function() {
        var a = this.layerRecord,
        b = a.getLayer();
        return ! 0 === b.getVisibility() ? a.get("url") + "?TRANSPARENT=TRUE&TILED=false&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&LAYER=heatmap&FORMAT=image%2Fgif&SQL=" + b.params.SQL + "&MAXVAL=" + Ext.getCmp("slider_maxval").getValue() + "&BLUR=" + Ext.getCmp("slider_blur").getValue() + "&MIN=" + Ext.getCmp("slider_blur").getValue() + "&RND=" + b.params.RND: ""
    }
});
GeoExt.GeopsLegend.supports = function(a) {
    return a.getLayer() instanceof OpenLayers.Layer.WMS ? 1 : 0
};
GeoExt.LayerLegend.types.gx_geopslegend = GeoExt.GeopsLegend;
Ext.reg("gx_geopslegend", GeoExt.GeopsLegend);
Ext.namespace("gxp");
GeoExplorer.ViewerMobile = Ext.extend(GeoExplorer, {
    initMapPanel: function() {
        this.mapItems = [];
        OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
        OpenLayers.Util.onImageLoadErrorColor = "transparent";
        GeoExplorer.superclass.initMapPanel.apply(this, arguments);
        this.mapPlugins = [{
            ptype: "gxp_loadingindicator",
            onlyShowOnFirstLoad: !0
        }];
        this.mapPanel.map.events.register("preaddlayer", this,
        function(a) {
            var b = a.layer;
            if (b instanceof OpenLayers.Layer.WMS) b.events.on({
                loadend: function() {
                    Ext.Ajax.request({
                        url: "/data/layerstats/",
                        method: "POST",
                        params: {
                            layername: b.params.LAYERS
                        }
                    });
                    b.events.unregister("loadend", this, arguments.callee)
                },
                scope: this
            })
        });
        this.westPanel = new Ext.Panel({
            layout: "fit",
            id: "westpanel",
            border: !1,
            collapsed: !0,
            split: !0,
            region: "west",
            autoScroll: !0,
            width: "90%",
            title: "Layers",
            plugins: {
                init: function(a) {
                    if (a.collapsed) {
                        var b = a.region;
                        if ("east" == b || "west" == b) a.on("render",
                        function() {
                            var c = a.ownerCt;
                            c.on("afterlayout",
                            function() {
                                a.collapsedTitleEl = c.layout[b].collapsedEl.createChild({
                                    tag: "span",
                                    cls: "css-vertical-text",
                                    html: a.title
                                });
                                a.setTitle = Ext.Panel.prototype.setTitle.createSequence(function(b) {
                                    a.collapsedTitleEl.dom.innerHTML = b
                                })
                            },
                            !1, {
                                single: !0
                            })
                        })
                    }
                }
            }
        })
    },
    loadConfig: function(a) {
        var b, c;
        for (c in a.sources) {
            b = a.sources[c];
            if (!b.ptype || /wmsc?source/.test(b.ptype)) b.forceLazy = !1 === a.useCapabilities;
            if (!1 === a.useToolbar) {
                b = !0;
                for (var d, e = a.map.layers.length - 1; 0 <= e; --e) d = a.map.layers[e],
                d.source == c && (!1 === d.visibility ? a.map.layers.remove(d) : b = !1);
                b && delete a.sources[c]
            }
        }
        if (!1 !== a.useToolbar) a.tools = (a.tools || []).concat({
            ptype: "gxp_styler",
            id: "styler",
            rasterStyling: !0,
            actionTarget: void 0
        },
        {
            ptype: "gxp_layermanager",
            groups: a.map.groups || a.treeconfig,
            id: "treecontentmgr",
            autoScroll: !0,
            outputConfig: {
                id: "treecontent",
                width: "100%",
                autoScroll: !0
            },
            outputTarget: "westpanel"
        });
        GeoExplorer.superclass.loadConfig.apply(this, arguments)
    },
    initInfoTextWindow: function() {
        this.infoTextPanel = new Ext.FormPanel({
            layout: "fit",
            bodyStyle: {
                padding: "5px"
            },
            labelAlign: "top",
            preventBodyReset: !0,
            autoScroll: !1,
            autoWidth: !0,
            html: this.about.introtext
        });
        this.infoTextWindow = new Ext.Window({
            title: this.about.title,
            closeAction: "hide",
            items: this.infoTextPanel,
            modal: !0,
            width: "100%",
            autoHeight: !0,
            autoScroll: !0,
            bbar: [{
                text: "Close",
                width: "100%",
                handler: function() {
                    this.infoTextWindow.close()
                },
                scope: this
            }]
        })
    },
    initPortal: function() { ! 1 !== this.useMapOverlay && this.mapPanel.add(this.createMapOverlay());
        if (!1 !== this.useToolbar) this.toolbar = new Ext.Toolbar({
            xtype: "toolbar",
            region: "north",
            autoHeight: !1,
            height: "50px",
            disabled: !0,
            items: this.createTools()
        }),
        this.on("ready",
        function() {
            this.toolbar.enable()
        },
        this);
        this.mapPanelContainer = new Ext.Panel({
            layout: "card",
            region: "center",
            ref: "../main",
            tbar: this.toolbar,
            defaults: {
                border: !1
            },
            items: [this.mapPanel],
            ref: "../main",
            activeItem: 0
        });
        this.portalItems = [this.mapPanelContainer, this.westPanel];
        var a = new Ext.Panel({
            id: "gridWinPanel",
            collapseMode: "mini",
            title: "Identify Results",
            region: "west",
            autoScroll: !0,
            split: !0,
            items: []
        }),
        b = new Ext.Panel({
            id: "gridResultsPanel",
            title: "Feature Details",
            region: "center",
            collapseMode: "mini",
            autoScroll: !0,
            split: !0,
            items: []
        });
        new Ext.Window({
            id: "queryPanel",
            layout: "border",
            closeAction: "hide",
            items: [a, b],
            width: "100%",
            height: 400
        });
        this.about.introtext = "Hello";
        GeoExplorer.superclass.initPortal.apply(this, arguments);
        if (this.config.first_visit_mobile) this.about.introtext = Ext.get("mobile_intro").dom.innerHTML,
        this.infoTextWindow || this.initInfoTextWindow(),
        this.infoTextWindow.show(),
        this.infoTextWindow.alignTo(document, "tl-tl")
    },
    addLayerSource: function(a) {
        GeoExplorer.superclass.addLayerSource.apply(this, arguments)
    },
    createTools: function() {
        var a = GeoExplorer.Viewer.superclass.createTools.apply(this, arguments),
        b = new Ext.Button({
            tooltip: "Layer Switcher",
            text: "Layers",
            menu: new gxp.menu.LayerMenu({
                layers: this.mapPanel.layers
            })
        });
        a.unshift("-");
        a.unshift(b);
        b = new Ext.Button({
            tooltip: "About this map",
            text: "About",
            handler: this.displayAppInfo,
            scope: this
        });
        a.push("->");
        a.push(b);
        return a
    }
});
Ext.namespace("gxp");
GeoExplorer.ViewerPrint = Ext.extend(GeoExplorer.Viewer, {
    printMsg: "Press OK to print this page as is.  \t If you would like to adjust the map extent, press Cancel, \t then use your browser's print button when you are ready",
    printTitle: "Print",
    initMapPanel: function() {
        this.mapItems = [];
        OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
        OpenLayers.Util.onImageLoadErrorColor = "transparent";
        GeoExplorer.superclass.initMapPanel.apply(this, arguments)
    },
    initPortal: function() {
        function a(a) {
            "ok" == a && window.print()
        } ! 1 !== this.useMapOverlay && this.mapPanel.add(this.createMapOverlay());
        if (!1 !== this.useToolbar) this.toolbar = new Ext.Toolbar({
            xtype: "toolbar",
            region: "north",
            autoHeight: !0,
            disabled: !0,
            items: this.createTools()
        }),
        this.on("ready",
        function() {
            this.toolbar.enable()
        },
        this);
        this.mapPanelContainer = new Ext.Panel({
            layout: "card",
            region: "center",
            ref: "../main",
            tbar: this.toolbar,
            defaults: {
                border: !1
            },
            items: [this.mapPanel],
            ref: "../main",
            activeItem: 0
        });
        window.google && google.earth && this.mapPanelContainer.add(new gxp.GoogleEarthPanel({
            mapPanel: this.mapPanel,
            listeners: {
                beforeadd: function(a) {
                    return "background" !== a.get("group")
                }
            }
        }));
        this.portalItems = [this.mapPanelContainer];
        this.on("portalready",
        function() {
            Ext.Msg.show({
                title: this.printTitle,
                msg: this.printMsg,
                buttons: Ext.Msg.OKCANCEL,
                fn: a
            })
        });
        GeoExplorer.superclass.initPortal.apply(this, arguments)
    }
});