Ext.namespace("gxp");
gxp.util = {
    _uniqueNames: {},
    getOGCExceptionText: function(a) {
        var b;
        a && a.exceptions ? (b = [], Ext.each(a.exceptions,
        function(a) {
            Ext.each(a.texts,
            function(a) {
                b.push(a)
            })
        }), b = b.join("\n")) : b = "Unknown error (no exception report).";
        return b
    },
    dispatch: function(a, b, d) {
        function e() {++k;
            k === j && b.call(d, m)
        }
        function g(b) {
            window.setTimeout(function() {
                a[b].apply(d, [e, m])
            })
        }
        for (var b = b || Ext.emptyFn,
        d = d || this,
        j = a.length,
        k = 0,
        m = {},
        n = 0; n < j; ++n) g(n)
    },
    uniqueName: function(a, b) {
        var b = b || " ",
        d = RegExp(b + "[0-9]*$"),
        e = a.replace(d, ""),
        d = d.exec(a),
        d = void 0 !== this._uniqueNames[e] ? this._uniqueNames[e] : d instanceof Array ? Number(d[0]) : void 0,
        g = e;
        void 0 !== d && (d++, g += b + d);
        this._uniqueNames[e] = d || 0;
        return g
    },
    getAbsoluteUrl: function(a) {
        var b;
        Ext.isIE ? (b = document.createElement("<a href='" + a + "'/>"), b.style.display = "none", document.body.appendChild(b), b.href = b.href, document.body.removeChild(b)) : (b = document.createElement("a"), b.href = a);
        return b.href
    },
    md5: function() {
        function a(a) {
            return String.fromCharCode(a & 255) + String.fromCharCode(a >>> 8 & 255) + String.fromCharCode(a >>> 16 & 255) + String.fromCharCode(a >>> 24 & 255)
        }
        function b(a) {
            for (; 0 > a;) a += 4294967296;
            for (; 4294967295 < a;) a -= 4294967296;
            return a
        }
        var d = [0, 3614090360, 3905402710, 606105819, 3250441966, 4118548399, 1200080426, 2821735955, 4249261313, 1770035416, 2336552879, 4294925233, 2304563134, 1804603682, 4254626195, 2792965006, 1236535329, 4129170786, 3225465664, 643717713, 3921069994, 3593408605, 38016083, 3634488961, 3889429448, 568446438, 3275163606, 4107603335, 1163531501, 2850285829, 4243563512, 1735328473, 2368359562, 4294588738, 2272392833, 1839030562, 4259657740, 2763975236, 1272893353, 4139469664, 3200236656, 681279174, 3936430074, 3572445317, 76029189, 3654602809, 3873151461, 530742520, 3299628645, 4096336452, 1126891415, 2878612391, 4237533241, 1700485571, 2399980690, 4293915773, 2240044497, 1873313359, 4264355552, 2734768916, 1309151649, 4149444226, 3174756917, 718787259, 3951481745],
        e = [[function(a, b, d) {
            return a & b | ~a & d
        },
        [[0, 7, 1], [1, 12, 2], [2, 17, 3], [3, 22, 4], [4, 7, 5], [5, 12, 6], [6, 17, 7], [7, 22, 8], [8, 7, 9], [9, 12, 10], [10, 17, 11], [11, 22, 12], [12, 7, 13], [13, 12, 14], [14, 17, 15], [15, 22, 16]]], [function(a, b, d) {
            return a & d | b & ~d
        },
        [[1, 5, 17], [6, 9, 18], [11, 14, 19], [0, 20, 20], [5, 5, 21], [10, 9, 22], [15, 14, 23], [4, 20, 24], [9, 5, 25], [14, 9, 26], [3, 14, 27], [8, 20, 28], [13, 5, 29], [2, 9, 30], [7, 14, 31], [12, 20, 32]]], [function(a, b, d) {
            return a ^ b ^ d
        },
        [[5, 4, 33], [8, 11, 34], [11, 16, 35], [14, 23, 36], [1, 4, 37], [4, 11, 38], [7, 16, 39], [10, 23, 40], [13, 4, 41], [0, 11, 42], [3, 16, 43], [6, 23, 44], [9, 4, 45], [12, 11, 46], [15, 16, 47], [2, 23, 48]]], [function(a, b, d) {
            return b ^ (a | ~d)
        },
        [[0, 6, 49], [7, 10, 50], [14, 15, 51], [5, 21, 52], [12, 6, 53], [3, 10, 54], [10, 15, 55], [1, 21, 56], [8, 6, 57], [15, 10, 58], [6, 15, 59], [13, 21, 60], [4, 6, 61], [11, 10, 62], [2, 15, 63], [9, 21, 64]]]];
        return function(g) {
            var j, k, m, n, o, q, s, v, u, r, t;
            j = [1732584193, 4023233417, 2562383102, 271733878];
            k = g.length;
            m = k & 63;
            n = 56 > m ? 56 - m: 120 - m;
            if (0 < n) {
                g += "\u0080";
                for (m = 0; m < n - 1; m++) g += "\x00"
            }
            g += a(8 * k);
            g += a(0);
            k += n + 8;
            n = [0, 1, 2, 3];
            o = [16];
            q = [4];
            for (r = 0; r < k; r += 64) {
                for (m = 0, u = r; 16 > m; m++, u += 4) o[m] = g.charCodeAt(u) | g.charCodeAt(u + 1) << 8 | g.charCodeAt(u + 2) << 16 | g.charCodeAt(u + 3) << 24;
                for (m = 0; 4 > m; m++) q[m] = j[m];
                for (m = 0; 4 > m; m++) {
                    s = e[m][0];
                    v = e[m][1];
                    for (u = 0; 16 > u; u++) {
                        t = o;
                        var w = q,
                        z = v[u],
                        A = void 0,
                        B = void 0,
                        y = void 0,
                        D = void 0,
                        x = void 0,
                        C = void 0,
                        E = void 0,
                        y = x = void 0,
                        A = n[0],
                        B = n[1],
                        y = n[2],
                        D = n[3],
                        x = z[0],
                        C = z[1],
                        E = z[2],
                        y = s(w[B], w[y], w[D]),
                        x = w[A] + y + t[x] + d[E],
                        x = b(x),
                        x = x << C | x >>> 32 - C,
                        x = x + w[B];
                        w[A] = b(x);
                        t = n[0];
                        n[0] = n[3];
                        n[3] = n[2];
                        n[2] = n[1];
                        n[1] = t
                    }
                }
                for (m = 0; 4 > m; m++) j[m] += q[m],
                j[m] = b(j[m])
            }
            m = a(j[0]) + a(j[1]) + a(j[2]) + a(j[3]);
            j = "";
            for (g = 0; 16 > g; g++) k = m.charCodeAt(g),
            j += "0123456789abcdef".charAt(k >> 4 & 15),
            j += "0123456789abcdef".charAt(k & 15);
            return j
        }
    } ()
};
Ext.namespace("gxp.plugins");
gxp.plugins.LayerSource = Ext.extend(Ext.util.Observable, {
    store: null,
    lazy: !1,
    title: "",
    constructor: function(a) {
        this.initialConfig = a;
        Ext.apply(this, a);
        this.addEvents("ready", "failure");
        gxp.plugins.LayerSource.superclass.constructor.apply(this, arguments)
    },
    init: function(a) {
        this.target = a;
        this.createStore()
    },
    getMapProjection: function() {
        var a = this.target.mapPanel.map.projection;
        return this.target.mapPanel.map.getProjectionObject() || a && new OpenLayers.Projection(a) || new OpenLayers.Projection("EPSG:4326")
    },
    getProjection: function(a) {
        var a = a.getLayer(),
        b = this.getMapProjection();
        return (a.projection ? a.projection instanceof OpenLayers.Projection ? a.projection: new OpenLayers.Projection(a.projection) : b).equals(b) ? b: null
    },
    createStore: function() {
        this.fireEvent("ready", this)
    },
    createLayerRecord: function() {},
    getConfigForRecord: function(a) {
        var b = a.getLayer();
        return {
            source: a.get("source"),
            name: a.get("name"),
            title: a.get("title"),
            visibility: b.getVisibility(),
            opacity: b.opacity || void 0,
            group: a.get("group"),
            fixed: a.get("fixed"),
            selected: a.get("selected")
        }
    },
    getState: function() {
        return Ext.apply({},
        this.initialConfig)
    }
});
Ext.namespace("gxp");
gxp.EmbedMapDialog = Ext.extend(Ext.Container, {
    url: null,
    url: null,
    publishMessage: "Your map is ready to be published to the web! Simply copy the following HTML to embed the map in your website:",
    heightLabel: "Height",
    widthLabel: "Width",
    mapSizeLabel: "Map Size",
    miniSizeLabel: "Mini",
    smallSizeLabel: "Small",
    premiumSizeLabel: "Premium",
    largeSizeLabel: "Large",
    snippetArea: null,
    heightField: null,
    widthField: null,
    initComponent: function() {
        Ext.apply(this, this.getConfig());
        gxp.EmbedMapDialog.superclass.initComponent.call(this)
    },
    getIframeHTML: function() {
        return this.snippetArea.getValue()
    },
    updateSnippet: function() {
        this.snippetArea.setValue('<iframe style="border: none;" height="' + this.heightField.getValue() + '" width="' + this.widthField.getValue() + '" src="' + gxp.util.getAbsoluteUrl(this.url) + '"></iframe>'); ! 0 === this.snippetArea.isVisible() && this.snippetArea.focus(!0, 100)
    },
    getConfig: function() {
        this.snippetArea = new Ext.form.TextArea({
            height: 70,
            selectOnFocus: !0,
            readOnly: !0
        });
        var a = {
            change: this.updateSnippet,
            specialkey: function(a, d) {
                d.getKey() == d.ENTER && this.updateSnippet()
            },
            scope: this
        };
        this.heightField = new Ext.form.NumberField({
            width: 50,
            value: 400,
            listeners: a
        });
        this.widthField = new Ext.form.NumberField({
            width: 50,
            value: 600,
            listeners: a
        });
        return {
            border: !1,
            defaults: {
                border: !1,
                cls: "gxp-export-section",
                xtype: "container",
                layout: "fit"
            },
            items: [{
                items: [new Ext.Container({
                    layout: "column",
                    defaults: {
                        border: !1,
                        xtype: "box"
                    },
                    items: [{
                        autoEl: {
                            cls: "gxp-field-label",
                            html: this.mapSizeLabel
                        }
                    },
                    new Ext.form.ComboBox({
                        editable: !1,
                        width: 75,
                        store: new Ext.data.SimpleStore({
                            fields: ["name", "height", "width"],
                            data: [[this.miniSizeLabel, 100, 100], [this.smallSizeLabel, 200, 300], [this.largeSizeLabel, 400, 600], [this.premiumSizeLabel, 600, 800]]
                        }),
                        triggerAction: "all",
                        displayField: "name",
                        value: this.largeSizeLabel,
                        mode: "local",
                        listeners: {
                            select: function(a, d) {
                                this.widthField.setValue(d.get("width"));
                                this.heightField.setValue(d.get("height"));
                                this.updateSnippet()
                            },
                            scope: this
                        }
                    }), {
                        autoEl: {
                            cls: "gxp-field-label",
                            html: this.heightLabel
                        }
                    },
                    this.heightField, {
                        autoEl: {
                            cls: "gxp-field-label",
                            html: this.widthLabel
                        }
                    },
                    this.widthField]
                })]
            },
            {
                xtype: "box",
                autoEl: {
                    tag: "p",
                    html: this.publishMessage
                }
            },
            {
                items: [this.snippetArea]
            }],
            listeners: {
                afterrender: this.updateSnippet,
                scope: this
            }
        }
    }
});
Ext.reg("gxp_embedmapdialog", gxp.EmbedMapDialog);
Ext.namespace("gxp.data");
gxp.data.WFSProtocolProxy = Ext.extend(GeoExt.data.ProtocolProxy, {
    setFilter: function(a) {
        this.protocol.filter = a;
        this.protocol.options.filter = a
    },
    constructor: function(a) {
        Ext.applyIf(a, {
            version: "1.1.0"
        });
        if (! (this.protocol && this.protocol instanceof OpenLayers.Protocol)) a.protocol = new OpenLayers.Protocol.WFS(Ext.apply({
            version: a.version,
            srsName: a.srsName,
            url: a.url,
            featureType: a.featureType,
            featureNS: a.featureNS,
            geometryName: a.geometryName,
            schema: a.schema,
            filter: a.filter,
            maxFeatures: a.maxFeatures,
            multi: a.multi
        },
        a.protocol));
        gxp.data.WFSProtocolProxy.superclass.constructor.apply(this, arguments)
    },
    doRequest: function(a, b, d, e, g, j, k) {
        delete d.xaction;
        if (a === Ext.data.Api.actions.read) this.load(d, e, g, j, k);
        else {
            b instanceof Array || (b = [b]);
            var m = Array(b.length),
            n;
            Ext.each(b,
            function(a, b) {
                m[b] = a.getFeature();
                n = m[b];
                n.modified = Ext.apply(n.modified || {},
                {
                    attributes: Ext.apply(n.modified && n.modified.attributes || {},
                    a.modified)
                })
            },
            this);
            var o = {
                action: a,
                records: b,
                callback: g,
                scope: j
            },
            a = {
                callback: function(a) {
                    this.onProtocolCommit(a, o)
                },
                scope: this
            };
            Ext.applyIf(a, d);
            this.protocol.commit(m, a)
        }
    },
    onProtocolCommit: function(a, b) {
        if (a.success()) {
            var d = a.reqFeatures,
            e, g, j = [],
            k = a.insertIds || [],
            m,
            n,
            o = 0;
            for (m = 0, n = d.length; m < n; ++m) if (g = d[m], e = g.state) {
                if (e == OpenLayers.State.DELETE) j.push(g);
                else if (e == OpenLayers.State.INSERT) g.fid = k[o],
                ++o;
                else if (g.modified) g.modified = {};
                g.state = null
            }
            for (m = 0, n = j.length; m < n; ++m) g = j[m],
            g.layer && g.layer.destroyFeatures([g]);
            n = d.length;
            e = Array(n);
            for (m = 0; m < n; ++m) {
                g = d[m];
                e[m] = {
                    id: g.id,
                    feature: g,
                    state: null
                };
                var j = b.records[m].fields,
                q;
                for (q in g.attributes) j.containsKey(q) && (e[m][q] = g.attributes[q])
            }
            b.callback.call(b.scope, e, a.priv, !0)
        } else d = a.priv,
        200 <= d.status && 300 > d.status ? this.fireEvent("exception", this, "remote", b.action, b, a.error, b.records) : this.fireEvent("exception", this, "response", b.action, b, d),
        b.callback.call(b.scope, [], d, !1)
    }
});
Ext.namespace("gxp.data");
gxp.data.WFSFeatureStore = Ext.extend(GeoExt.data.FeatureStore, {
    setOgcFilter: function(a) {
        this.proxy.setFilter(a)
    },
    constructor: function(a) {
        if (! (a.proxy && a.proxy instanceof GeoExt.data.ProtocolProxy)) a.proxy = new gxp.data.WFSProtocolProxy(Ext.apply({
            srsName: a.srsName,
            url: a.url,
            featureType: a.featureType,
            featureNS: a.featureNS,
            geometryName: a.geometryName,
            schema: a.schema,
            filter: a.ogcFilter,
            maxFeatures: a.maxFeatures,
            multi: a.multi
        },
        a.proxy));
        if (!a.writer) a.writer = new Ext.data.DataWriter({
            write: Ext.emptyFn
        });
        gxp.data.WFSFeatureStore.superclass.constructor.apply(this, arguments);
        this.reader.extractValues = function(a) {
            return this.readRecords([a.feature]).records[0].data
        }.createDelegate(this.reader);
        this.reader.meta.idProperty = "id";
        this.reader.getId = function(a) {
            return a.id
        }
    }
});
Ext.namespace("gxp.plugins");
gxp.plugins.SchemaAnnotations = {
    getAnnotationsFromSchema: function(a) {
        var b = null,
        a = a.get("annotation");
        if (void 0 !== a) {
            var b = {},
            d = GeoExt.Lang.locale.split("-").shift(),
            e,
            g;
            for (e = 0, g = a.appinfo.length; e < g; ++e) {
                var j = Ext.decode(a.appinfo[e]);
                if (j.title && j.title[d]) {
                    b.label = j.title[d];
                    break
                }
            }
            for (e = 0, g = a.documentation.length; e < g; ++e) if (a.documentation[e].lang === d) {
                b.helpText = a.documentation[e].textContent;
                break
            }
        }
        return b
    }
};
Ext.namespace("gxp.plugins");
gxp.plugins.Tool = Ext.extend(Ext.util.Observable, {
    ptype: "gxp_tool",
    autoActivate: !0,
    actionTarget: "map.tbar",
    showButtonText: !1,
    output: null,
    constructor: function(a) {
        this.initialConfig = a || {};
        this.active = !1;
        Ext.apply(this, a);
        if (!this.id) this.id = Ext.id();
        this.output = [];
        this.addEvents("activate", "deactivate");
        gxp.plugins.Tool.superclass.constructor.apply(this, arguments)
    },
    init: function(a) {
        a.tools[this.id] = this;
        this.target = a;
        this.autoActivate && this.activate();
        this.target.on("portalready", this.addActions, this)
    },
    activate: function() {
        if (!1 === this.active) return this.active = !0,
        this.fireEvent("activate", this),
        !0
    },
    deactivate: function() {
        if (!0 === this.active) return this.active = !1,
        this.fireEvent("deactivate", this),
        !0
    },
    getContainer: function(a) {
        var b, d;
        b = a.split(".");
        if (d = b[0]) if ("map" == d) a = this.target.mapPanel;
        else {
            if (a = Ext.getCmp(d) || this.target.portal[d], !a) throw Error("Can't find component with id: " + d);
        } else a = this.target.portal;
        if (b = 1 < b.length && b[1]) a = (d = {
            tbar: "getTopToolbar",
            bbar: "getBottomToolbar",
            fbar: "getFooterToolbar"
        } [b]) ? a[d]() : a[b];
        return a
    },
    addActions: function(a) {
        a = a || this.actions;
        if (!a || null === this.actionTarget) this.addOutput();
        else {
            var b = this.actionTarget instanceof Array ? this.actionTarget: [this.actionTarget],
            a = a instanceof Array ? a: [a],
            d,
            e,
            g,
            j,
            k,
            m,
            n = null;
            for (g = b.length - 1; 0 <= g; --g) {
                if (d = b[g]) {
                    if (d instanceof Object) n = d.index,
                    d = d.target;
                    m = this.getContainer(d)
                }
                for (j = 0, k = a.length; j < k; ++j) {
                    if (! (a[j] instanceof Ext.Action || a[j] instanceof Ext.Component)) if ((e = Ext.getCmp(a[j])) && (a[j] = e), "string" != typeof a[j]) {
                        if (j == this.defaultAction) a[j].pressed = !0;
                        a[j] = new Ext.Action(a[j])
                    }
                    d = a[j];
                    if (j == this.defaultAction && d instanceof GeoExt.Action) d.isDisabled() ? d.activateOnEnable = !0 : d.control.activate();
                    if (m) {
                        this.showButtonText && d.setText(d.initialConfig.buttonText);
                        m instanceof Ext.menu.Menu ? d = Ext.apply(new Ext.menu.CheckItem(d), {
                            text: d.initialConfig.menuText,
                            group: d.initialConfig.toggleGroup,
                            groupClass: null
                        }) : m instanceof Ext.Toolbar || (d = new Ext.Button(d));
                        var o = null === n ? m.add(d) : m.insert(n, d);
                        d = d instanceof Ext.Button ? d: o;
                        null !== n && (n += 1);
                        if (null != this.outputAction && j == this.outputAction) d.on("click",
                        function() {
                            e ? this.outputTarget ? e.show() : e.ownerCt.ownerCt.show() : e = this.addOutput()
                        },
                        this)
                    }
                }
                m && (m.isVisible() ? m.doLayout() : m instanceof Ext.menu.Menu || m.show())
            }
            return this.actions = a
        }
    },
    addOutput: function(a) {
        if (a || this.outputConfig) {
            var a = a || {},
            b = this.outputTarget;
            b ? (b = this.getContainer(b), a instanceof Ext.Component || Ext.apply(a, this.outputConfig)) : (b = this.outputConfig || {},
            b = (new Ext.Window(Ext.apply({
                hideBorders: !0,
                shadow: !1,
                closeAction: "hide",
                autoHeight: !b.height,
                layout: b.height ? "fit": void 0,
                items: [{
                    defaults: Ext.applyIf({
                        autoHeight: !b.height && !(b.defaults && b.defaults.height)
                    },
                    b.defaults)
                }]
            },
            b))).show().items.get(0));
            if (b) return a = b.add(a),
            a.on("removed",
            function(a) {
                this.output.remove(a)
            },
            this, {
                single: !0
            }),
            a instanceof Ext.Window ? a.show() : b.doLayout(),
            this.output.push(a),
            a;
            a = this.ptype;
            window.console && console.error("Failed to create output for plugin with ptype: " + a)
        }
    },
    removeOutput: function() {
        for (var a, b = this.output.length - 1; 0 <= b; --b) if (a = this.output[b], this.outputTarget) if (a.ownerCt) {
            if (a.ownerCt.remove(a), a.ownerCt instanceof Ext.Window) a.ownerCt[a.ownerCt.closeAction]()
        } else a.remove();
        else a.findParentBy(function(a) {
            return a instanceof Ext.Window
        }).close();
        this.output = []
    },
    getState: function() {
        return Ext.apply({},
        this.initialConfig)
    }
});
Ext.preg(gxp.plugins.Tool.prototype.ptype, gxp.plugins.Tool);
Ext.namespace("gxp.plugins");
gxp.plugins.FeatureManager = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_featuremanager",
    maxFeatures: 100,
    paging: !0,
    pagingType: null,
    autoZoomPage: !1,
    autoSetLayer: !0,
    autoLoadFeatures: !1,
    layerRecord: null,
    featureStore: null,
    hitCountProtocol: null,
    featureLayer: null,
    schema: null,
    geometryType: null,
    toolsShowingLayer: null,
    selectStyle: null,
    style: null,
    pages: null,
    page: null,
    numberOfFeatures: null,
    numPages: null,
    pageIndex: null,
    constructor: function(a) {
        this.addEvents("beforequery", "query", "beforelayerchange", "layerchange", "beforesetpage", "setpage", "beforeclearfeatures", "clearfeatures", "beforesave", "exception");
        if (a && !a.pagingType) this.pagingType = gxp.plugins.FeatureManager.QUADTREE_PAGING;
        if (a && a.layer) this.autoSetLayer = !1;
        gxp.plugins.FeatureManager.superclass.constructor.apply(this, arguments)
    },
    init: function(a) {
        gxp.plugins.FeatureManager.superclass.init.apply(this, arguments);
        this.toolsShowingLayer = {};
        this.style = {
            all: new OpenLayers.Style(null, {
                rules: [new OpenLayers.Rule({
                    symbolizer: this.initialConfig.symbolizer || {
                        Point: {
                            pointRadius: 4,
                            graphicName: "square",
                            fillColor: "white",
                            fillOpacity: 1,
                            strokeWidth: 1,
                            strokeOpacity: 1,
                            strokeColor: "#333333"
                        },
                        Line: {
                            strokeWidth: 4,
                            strokeOpacity: 1,
                            strokeColor: "#ff9933"
                        },
                        Polygon: {
                            strokeWidth: 2,
                            strokeOpacity: 1,
                            strokeColor: "#ff6633",
                            fillColor: "white",
                            fillOpacity: 0.3
                        }
                    }
                })]
            }),
            selected: new OpenLayers.Style(null, {
                rules: [new OpenLayers.Rule({
                    symbolizer: {
                        display: "none"
                    }
                })]
            })
        };
        this.featureLayer = new OpenLayers.Layer.Vector(this.id, {
            displayInLayerSwitcher: !1,
            visibility: !1,
            styleMap: new OpenLayers.StyleMap({
                select: Ext.applyIf(Ext.apply({
                    display: ""
                },
                this.selectStyle), OpenLayers.Feature.Vector.style.select),
                vertex: this.style.all
            },
            {
                extendDefault: !1
            })
        });
        this.target.on({
            ready: function() {
                this.target.mapPanel.map.addLayer(this.featureLayer)
            },
            scope: this
        });
        this.on({
            beforedestroy: function() {
                this.target.mapPanel.map.removeLayer(this.featureLayer)
            },
            scope: this
        })
    },
    activate: function() {
        if (gxp.plugins.FeatureManager.superclass.activate.apply(this, arguments)) {
            if (this.autoSetLayer) this.target.on("beforelayerselectionchange", this.setLayer, this);
            this.layer && this.target.createLayerRecord(Ext.apply({},
            this.layer), this.setLayer, this);
            this.on("layerchange", this.setSchema, this);
            return ! 0
        }
    },
    deactivate: function() {
        if (gxp.plugins.FeatureManager.superclass.deactivate.apply(this, arguments)) return this.autoSetLayer && this.target.un("beforelayerselectionchange", this.setLayer, this),
        this.un("layerchange", this.setSchema, this),
        this.setLayer(),
        !0
    },
    getPageExtent: function() {
        return this.pagingType === gxp.plugins.FeatureManager.QUADTREE_PAGING ? this.page.extent: this.featureStore.layer.getDataExtent()
    },
    setLayer: function(a) {
        var b = this.fireEvent("beforelayerchange", this, a);
        if (!1 !== b) {
            if (a) this.featureLayer.projection = a.getLayer().projection;
            if (a !== this.layerRecord) this.clearFeatureStore(),
            (this.layerRecord = a) ? !0 === this.autoLoadFeatures ? this.loadFeatures() : this.setFeatureStore() : this.fireEvent("layerchange", this, null)
        }
        return b
    },
    setSchema: function(a, b, d) {
        this.schema = d
    },
    showLayer: function(a, b) {
        this.toolsShowingLayer[a] = b || "all";
        this.setLayerDisplay()
    },
    hideLayer: function(a) {
        delete this.toolsShowingLayer[a];
        this.setLayerDisplay()
    },
    setLayerDisplay: function() {
        var a = this.visible(),
        b = this.target.mapPanel.map;
        a ? (a = this.style[a], a !== this.featureLayer.styleMap.styles["default"] && (this.featureLayer.styleMap.styles["default"] = a, this.featureLayer.redraw()), this.featureLayer.setVisibility(!0), b.events.on({
            addlayer: this.raiseLayer,
            scope: this
        })) : this.featureLayer.map && (this.featureLayer.setVisibility(!1), b.events.un({
            addlayer: this.raiseLayer,
            scope: this
        }))
    },
    visible: function() {
        var a = !1,
        b;
        for (b in this.toolsShowingLayer)"all" != a && (a = this.toolsShowingLayer[b]);
        return a
    },
    raiseLayer: function() {
        var a = this.featureLayer && this.featureLayer.map;
        a && a.setLayerIndex(this.featureLayer, a.layers.length)
    },
    loadFeatures: function(a, b, d) {
        if (!1 !== this.fireEvent("beforequery", this, a, b, d)) {
            this.filter = a;
            this.pages = null;
            if (b) {
                var e = this;
                e._activeQuery && e.un("query", e._activeQuery);
                this.on("query", e._activeQuery = function(a, j) {
                    delete e._activeQuery;
                    this.un("query", arguments.callee, this);
                    j.getCount();
                    0 == j.getCount() ? b.call(d, []) : this.featureLayer.events.register("featuresadded", this,
                    function(a) {
                        this.featureLayer.events.unregister("featuresadded", this, arguments.callee);
                        b.call(d, a.features)
                    })
                },
                this, {
                    single: !0
                })
            }
            this.featureStore ? (this.featureStore.setOgcFilter(a), this.paging ? this.setPage() : this.featureStore.load()) : (this.paging && this.on("layerchange",
            function(a, b, d) {
                d && (this.un("layerchange", arguments.callee, this), this.setPage())
            },
            this), this.setFeatureStore(a, !this.paging))
        }
    },
    clearFeatures: function() {
        var a = this.featureStore;
        if (a && !1 !== this.fireEvent("beforeclearfeatures", this)) a.removeAll(),
        this.fireEvent("clearfeatures", this),
        a = a.proxy,
        a.abortRequest(),
        a.protocol.response && a.protocol.response.abort()
    },
    getProjection: function(a) {
        var b = this.target.mapPanel.map.getProjectionObject(); (a = a.getLayer().projection) && a.equals(b) && (b = a);
        return b
    },
    setFeatureStore: function(a, b) {
        var d = this.layerRecord,
        e = this.target.getSource(d);
        e && e instanceof gxp.plugins.WMSSource ? e.getSchema(d,
        function(e) {
            if (!1 === e) this.clearFeatureStore();
            else {
                var j = [],
                k,
                m = /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/,
                n = {
                    "xsd:boolean": "boolean",
                    "xsd:int": "int",
                    "xsd:integer": "int",
                    "xsd:short": "int",
                    "xsd:long": "int",
                    "xsd:date": "date",
                    "xsd:string": "string",
                    "xsd:float": "float",
                    "xsd:double": "float"
                };
                e.each(function(a) {
                    var b = m.exec(a.get("type"));
                    if (b) k = a.get("name"),
                    this.geometryType = b[1];
                    else {
                        b = n[a.get("type")];
                        a = {
                            name: a.get("name"),
                            type: n[b]
                        };
                        if ("date" == b) a.dateFormat = "Y-m-d\\Z";
                        j.push(a)
                    }
                },
                this);
                var o = {
                    srsName: this.getProjection(d).getCode(),
                    url: e.url,
                    featureType: e.reader.raw.featureTypes[0].typeName,
                    featureNS: e.reader.raw.targetNamespace,
                    geometryName: k
                };
                this.hitCountProtocol = new OpenLayers.Protocol.WFS(Ext.apply({
                    version: "1.1.0",
                    readOptions: {
                        output: "object"
                    },
                    resultType: "hits",
                    filter: a
                },
                o));
                this.featureStore = new gxp.data.WFSFeatureStore(Ext.apply({
                    fields: j,
                    proxy: {
                        protocol: {
                            outputFormat: this.format,
                            multi: this.multi
                        }
                    },
                    maxFeatures: this.maxFeatures,
                    layer: this.featureLayer,
                    ogcFilter: a,
                    autoLoad: b,
                    autoSave: !1,
                    listeners: {
                        beforewrite: function(a, b, d, e) {
                            this.fireEvent("beforesave", this, a, e.params)
                        },
                        write: function() {
                            this.redrawMatchingLayers(d)
                        },
                        load: function(a) {
                            this.fireEvent("query", this, a, this.filter)
                        },
                        scope: this
                    }
                },
                o))
            }
            this.fireEvent("layerchange", this, d, e)
        },
        this) : (this.clearFeatureStore(), this.fireEvent("layerchange", this, d, !1))
    },
    redrawMatchingLayers: function(a) {
        var b = a.get("name"),
        d = a.get("source");
        this.target.mapPanel.layers.each(function(a) {
            a.get("source") === d && a.get("name") === b && a.getLayer().redraw(!0)
        })
    },
    clearFeatureStore: function() {
        if (this.featureStore) this.featureStore.removeAll(),
        this.featureStore.unbind(),
        this.featureStore.destroy(),
        this.geometryType = this.featureStore = this.numberOfFeatures = null
    },
    processPage: function(a, b, d, e) {
        var b = b || {},
        g = b.lonLat ? null: b.index,
        j = b.next,
        k = this.pages,
        m = this.pages.indexOf(a);
        this.setPageFilter(a);
        var n = j ? m == (k.indexOf(j) || k.length) - 1 : !0,
        o = b.lonLat ? a.extent.containsLonLat(b.lonLat) : !0;
        o && a.numFeatures && a.numFeatures <= this.maxFeatures ? d.call(this, a) : o && (m == g || n) && this.hitCountProtocol.read({
            callback: function(m) {
                var n = g,
                o = b.lonLat;
                j && (n = (k.indexOf(j) || k.length) - 1); ! n && o && a.extent.containsLonLat(o) && (n = k.indexOf(a));
                a.numFeatures = m.numberOfFeatures;
                this.page || (a.numFeatures > this.maxFeatures ? this.createLeaf(a, Ext.applyIf({
                    index: n,
                    next: j
                },
                b), d, e) : 0 == a.numFeatures && 1 < k.length ? (k.remove(a), !1 === b.allowEmpty && this.setPage({
                    index: g % this.pages.length,
                    allowEmpty: !1
                })) : this.pages.indexOf(a) == n && d.call(this, a))
            },
            scope: this
        })
    },
    createLeaf: function(a, b, d, e) {
        b = b || {};
        this.layerRecord.getLayer();
        var g = this.pages.indexOf(a);
        this.pages.remove(a);
        for (var j = a.extent,
        k = j.getCenterLonLat(), a = [j.left, k.lon, j.left, k.lon], m = [k.lat, k.lat, j.bottom, j.bottom], n = [k.lon, j.right, k.lon, j.right], j = [j.top, j.top, k.lat, k.lat], o, k = 3; 0 <= k; --k) o = {
            extent: new OpenLayers.Bounds(a[k], m[k], n[k], j[k])
        },
        this.pages.splice(g, 0, o),
        this.processPage(o, b, d, e)
    },
    getPagingExtent: function(a) {
        var b = this.layerRecord.getLayer(),
        d = this.getSpatialFilter();
        if ((a = d ? d.value: this.target.mapPanel.map[a]()) && b.maxExtent && a.containsBounds(b.maxExtent)) a = b.maxExtent;
        return a
    },
    getSpatialFilter: function() {
        var a;
        if (this.filter instanceof OpenLayers.Filter.Spatial && this.filter.type === OpenLayers.Filter.Spatial.BBOX) a = this.filter;
        else if (this.filter instanceof OpenLayers.Filter.Logical && this.filter.type === OpenLayers.Filter.Logical.AND) for (var b, d = this.filter.filters.length - 1; 0 <= d; --d) if (b = this.filter.filters[d], b instanceof OpenLayers.Filter.Spatial && b.type === OpenLayers.Filter.Spatial.BBOX) {
            a = b;
            break
        }
        return a
    },
    setPageFilter: function(a) {
        a.extent ? (a = new OpenLayers.Filter.Spatial({
            type: OpenLayers.Filter.Spatial.BBOX,
            property: this.featureStore.geometryName,
            value: a.extent
        }), a = this.filter ? new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters: [this.filter, a]
        }) : a) : a = this.filter;
        this.featureStore.setOgcFilter(a);
        this.hitCountProtocol.filter = a;
        return this.hitCountProtocol.options.filter = a
    },
    nextPage: function(a, b) {
        var d;
        this.pagingType === gxp.plugins.FeatureManager.QUADTREE_PAGING ? (d = this.page, this.page = null, d = (this.pages.indexOf(d) + 1) % this.pages.length) : d = this.pageIndex + 1 % this.numPages;
        this.setPage({
            index: d,
            allowEmpty: !1
        },
        a, b)
    },
    previousPage: function(a) {
        var b;
        this.pagingType === gxp.plugins.FeatureManager.QUADTREE_PAGING ? (b = this.pages.indexOf(this.page) - 1, 0 > b && (b = this.pages.length - 1)) : (b = this.pageIndex - 1, 0 > b && (b = this.numPages - 1));
        this.setPage({
            index: b,
            allowEmpty: !1,
            next: this.page
        },
        a)
    },
    setPage: function(a, b, d) {
        if (this.pagingType === gxp.plugins.FeatureManager.QUADTREE_PAGING) if (this.filter instanceof OpenLayers.Filter.FeatureId) this.featureStore.load({
            callback: function() {
                b && b.call(d)
            }
        });
        else {
            if (!1 !== this.fireEvent("beforesetpage", this, a, b, d)) {
                if (!a) {
                    var e = this.getPagingExtent("getExtent"),
                    e = new OpenLayers.LonLat(e.left, e.top),
                    g = this.target.mapPanel.map.getMaxExtent();
                    g.containsLonLat(e, !0) || (e = new OpenLayers.LonLat(g.left, g.top));
                    a = {
                        lonLat: e,
                        allowEmpty: !1
                    }
                }
                a.index = a.index || 0;
                if ("last" == a.index) a.index = this.pages.length - 1,
                a.next = this.pages[0];
                this.page = null;
                if (this.pages) {
                    if (a.lonLat) for (e = this.pages.length - 1; 0 <= e; --e) if (this.pages[e].extent.containsLonLat(a.lonLat)) {
                        a.index = e;
                        break
                    }
                } else this.layerRecord.getLayer(),
                this.pages = [{
                    extent: this.getPagingExtent("getMaxExtent")
                }],
                a.index = 0;
                this.processPage(this.pages[a.index], a,
                function(e) {
                    var g = this.target.mapPanel.map;
                    this.page = e;
                    this.setPageFilter(e);
                    this.autoZoomPage && !g.getExtent().containsLonLat(e.extent.getCenterLonLat()) && g.zoomToExtent(e.extent);
                    g = this.pages.indexOf(this.page);
                    this.fireEvent("setpage", this, a, b, d, g, this.pages.length);
                    this.featureStore.load({
                        callback: function() {
                            b && b.call(d, e)
                        }
                    })
                },
                this)
            }
        } else if (!1 !== this.fireEvent("beforesetpage", this, a, b, d)) if (a) {
            if (null != a.index) this.pageIndex = "last" === a.index ? this.numPages - 1 : "first" === a.index ? 0 : a.index,
            e = this.pageIndex * this.maxFeatures,
            this.fireEvent("setpage", this, a, b, d, this.pageIndex, this.numPages),
            this.featureStore.load({
                startIndex: e,
                callback: function() {
                    b && b.call(d)
                }
            })
        } else this.hitCountProtocol.read({
            filter: this.filter,
            callback: function(e) {
                this.numberOfFeatures = e.numberOfFeatures;
                this.numPages = Math.ceil(this.numberOfFeatures / this.maxFeatures);
                this.pageIndex = 0;
                this.fireEvent("setpage", this, a, b, d, this.pageIndex, this.numPages);
                this.featureStore.load({
                    output: "object",
                    callback: function() {
                        b && b.call(d)
                    }
                })
            },
            scope: this
        })
    }
});
gxp.plugins.FeatureManager.QUADTREE_PAGING = 0;
gxp.plugins.FeatureManager.WFS_PAGING = 1;
Ext.preg(gxp.plugins.FeatureManager.prototype.ptype, gxp.plugins.FeatureManager);
Ext.namespace("gxp.plugins");
gxp.plugins.ClickableFeatures = Ext.extend(gxp.plugins.Tool, {
    featureManager: null,
    autoLoadFeature: !1,
    autoLoadedFeature: null,
    toleranceParameters: ["BUFFER", "RADIUS"],
    constructor: function(a) {
        if (a && "autoLoadFeatures" in a) a.autoLoadFeature = a.autoLoadFeatures,
        delete a.autoLoadFeatures,
        window.console && console.warn("Deprecated config option 'autoLoadFeatures' for ptype: '" + a.ptype + "'. Use 'autoLoadFeature' instead.");
        gxp.plugins.ClickableFeatures.superclass.constructor.apply(this, [a])
    },
    noFeatureClick: function(a) {
        if (!this.selectControl) this.selectControl = new OpenLayers.Control.SelectFeature(this.target.tools[this.featureManager].featureLayer, this.initialConfig.controlOptions);
        var b = this.target.mapPanel.map.getLonLatFromPixel(a.xy),
        d = this.target.tools[this.featureManager],
        e = d.page;
        if (! ("all" == d.visible() && d.paging && e && e.extent.containsLonLat(b)) && (b = d.layerRecord && d.layerRecord.getLayer())) {
            var g = this.target.mapPanel.map,
            e = g.getSize(),
            e = Ext.applyIf({
                REQUEST: "GetFeatureInfo",
                BBOX: g.getExtent().toBBOX(),
                WIDTH: e.w,
                HEIGHT: e.h,
                X: parseInt(a.xy.x),
                Y: parseInt(a.xy.y),
                QUERY_LAYERS: b.params.LAYERS,
                INFO_FORMAT: "application/vnd.ogc.gml",
                EXCEPTIONS: "application/vnd.ogc.se_xml",
                FEATURE_COUNT: 1
            },
            b.params);
            if ("number" === typeof this.tolerance) for (var j = 0,
            k = this.toleranceParameters.length; j < k; ++j) e[this.toleranceParameters[j]] = this.tolerance;
            g = g.getProjectionObject(); (j = b.projection) && j.equals(g) && (g = j);
            1.3 <= parseFloat(b.params.VERSION) ? e.CRS = g.getCode() : e.SRS = g.getCode();
            new GeoExt.data.FeatureStore({
                fields: {},
                proxy: new GeoExt.data.ProtocolProxy({
                    protocol: new OpenLayers.Protocol.HTTP({
                        url: "string" === typeof b.url ? b.url: b.url[0],
                        params: e,
                        format: new OpenLayers.Format.WMSGetFeatureInfo
                    })
                }),
                autoLoad: !0,
                listeners: {
                    load: function(b, e) {
                        if (0 < e.length) {
                            var g = e[0].get("fid"),
                            j = new OpenLayers.Filter.FeatureId({
                                fids: [g]
                            }),
                            k = function() {
                                d.loadFeatures(j,
                                function(a) {
                                    if (a.length) this.autoLoadedFeature = a[0],
                                    this.select(a[0])
                                },
                                this)
                            }.createDelegate(this),
                            v = d.featureLayer.getFeatureByFid(g);
                            v ? this.select(v) : d.paging && d.pagingType === gxp.plugins.FeatureManager.QUADTREE_PAGING ? (v = this.target.mapPanel.map.getLonLatFromPixel(a.xy), d.setPage({
                                lonLat: v
                            },
                            function() {
                                var a = d.featureLayer.getFeatureByFid(g);
                                a ? this.select(a) : !0 === this.autoLoadFeature && k()
                            },
                            this)) : k()
                        }
                    },
                    scope: this
                }
            })
        }
    },
    select: function(a) {
        this.selectControl.unselectAll();
        this.selectControl.select(a)
    }
});
Ext.namespace("gxp.plugins");
gxp.plugins.FeatureEditorGrid = Ext.extend(Ext.grid.PropertyGrid, {
    ptype: "gxp_editorgrid",
    xtype: "gxp_editorgrid",
    feature: null,
    schema: null,
    fields: null,
    excludeFields: null,
    propertyNames: null,
    readOnly: null,
    border: !1,
    initComponent: function() {
        if (!this.dateFormat) this.dateFormat = Ext.form.DateField.prototype.format;
        if (!this.timeFormat) this.timeFormat = Ext.form.TimeField.prototype.format;
        this.customRenderers = this.customRenderers || {};
        this.customEditors = this.customEditors || {};
        var a = this.feature,
        b;
        if (this.fields) {
            b = {};
            for (var d = 0,
            e = this.fields.length; d < e; ++d) b[this.fields[d]] = a.attributes[this.fields[d]]
        } else b = a.attributes;
        if (!this.excludeFields) this.excludeFields = [];
        if (this.schema) {
            var g = this.fields ? this.fields.join(",").toUpperCase().split(",") : [];
            this.schema.each(function(d) {
                var e = d.get("type");
                if (!e.match(/^[^:]*:?((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry))/)) {
                    var j = d.get("name");
                    this.fields && -1 == g.indexOf(j.toUpperCase()) && this.excludeFields.push(j);
                    var o = a.attributes[j],
                    d = GeoExt.form.recordToField(d),
                    q;
                    if ("string" == typeof o) {
                        var s;
                        switch (e.split(":").pop()) {
                        case "date":
                            s = this.dateFormat;
                            d.editable = !1;
                            break;
                        case "dateTime":
                            if (!s) s = this.dateFormat + " " + this.timeFormat,
                            d.editable = !0;
                            d.format = s;
                            q = {
                                startedit: function(a, b) {
                                    if (! (b instanceof Date)) {
                                        var d = Date.parseDate(b.replace(/Z$/, ""), "c");
                                        d && this.setValue(d)
                                    }
                                }
                            };
                            this.customRenderers[j] = function() {
                                return function(a) {
                                    var b = a;
                                    "string" == typeof a && (b = Date.parseDate(a.replace(/Z$/, ""), "c"));
                                    return b ? b.format(s) : a
                                }
                            } ();
                            break;
                        case "boolean":
                            q = {
                                startedit: function(a, b) {
                                    this.setValue(Boolean(b))
                                }
                            }
                        }
                    }
                    this.customEditors[j] = new Ext.grid.GridEditor({
                        field: Ext.create(d),
                        listeners: q
                    });
                    b[j] = o
                }
            },
            this);
            a.attributes = b
        }
        this.source = b;
        var j = this.excludeFields.length ? this.excludeFields.join(",").toUpperCase().split(",") : [];
        this.viewConfig = {
            forceFit: !0,
            getRowClass: function(a) {
                if ( - 1 !== j.indexOf(a.get("name").toUpperCase())) return "x-hide-nosize"
            }
        };
        this.listeners = {
            beforeedit: function() {
                return this.featureEditor && this.featureEditor.editing
            },
            propertychange: function() {
                this.featureEditor && this.featureEditor.setFeatureState(this.featureEditor.getDirtyState())
            },
            scope: this
        };
        d = Ext.data.Store.prototype.sort;
        Ext.data.Store.prototype.sort = function() {};
        gxp.plugins.FeatureEditorGrid.superclass.initComponent.apply(this, arguments);
        Ext.data.Store.prototype.sort = d;
        this.propStore.isEditableValue = function() {
            return ! 0
        }
    },
    init: function(a) {
        this.featureEditor = a;
        this.featureEditor.on("canceledit", this.onCancelEdit, this);
        this.featureEditor.add(this);
        this.featureEditor.doLayout()
    },
    destroy: function() {
        if (this.featureEditor) this.featureEditor.un("canceledit", this.onCancelEdit, this),
        this.featureEditor = null;
        gxp.plugins.FeatureEditorGrid.superclass.destroy.call(this)
    },
    onCancelEdit: function(a, b) {
        b && this.setSource(b.attributes)
    }
});
Ext.override(gxp.plugins.FeatureEditorGrid, gxp.plugins.SchemaAnnotations);
Ext.preg(gxp.plugins.FeatureEditorGrid.prototype.ptype, gxp.plugins.FeatureEditorGrid);
Ext.reg(gxp.plugins.FeatureEditorGrid.prototype.xtype, gxp.plugins.FeatureEditorGrid);
Ext.override(GeoExt.Popup, {
    initComponent: function() {
        if (this.map instanceof GeoExt.MapPanel) this.map = this.map.map;
        if (!this.map && this.location instanceof OpenLayers.Feature.Vector && this.location.layer) this.map = this.location.layer.map;
        if (this.location instanceof OpenLayers.Feature.Vector) this.location = this.location.geometry;
        if (this.location instanceof OpenLayers.Geometry) {
            if ("function" == typeof this.location.getCentroid) this.location = this.location.getCentroid();
            this.location = this.location.getBounds().getCenterLonLat()
        } else this.location instanceof OpenLayers.Pixel ? this.location = this.map.getLonLatFromViewPortPx(this.location) : this.anchored = !1;
        var a = this.map.getExtent();
        if (a && this.location) this.insideViewport = a.containsLonLat(this.location);
        this.anchored ? (this.addAnchorEvents(), this.elements += ",anc") : this.unpinnable = !1;
        this.baseCls = this.popupCls + " " + this.baseCls;
        GeoExt.Popup.superclass.initComponent.call(this)
    },
    makeDraggable: function() {
        this.draggable = !0;
        this.header.addClass("x-window-draggable");
        this.dd = new Ext.Window.DD(this)
    },
    onRender: function(a, b) {
        GeoExt.Popup.superclass.onRender.call(this, a, b);
        this.anchored ? (this.ancCls = this.popupCls + "-anc", this.createElement("anc", this.el.dom)) : this.makeDraggable()
    }
});
Ext.namespace("gxp");
gxp.FeatureEditPopup = Ext.extend(GeoExt.Popup, {
    closeMsgTitle: "Save Changes?",
    closeMsg: "This feature has unsaved changes. Would you like to save your changes?",
    deleteMsgTitle: "Delete Feature?",
    deleteMsg: "Are you sure you want to delete this feature?",
    editButtonText: "Edit",
    editButtonTooltip: "Make this feature editable",
    deleteButtonText: "Delete",
    deleteButtonTooltip: "Delete this feature",
    cancelButtonText: "Cancel",
    cancelButtonTooltip: "Stop editing, discard changes",
    saveButtonText: "Save",
    saveButtonTooltip: "Save changes",
    layout: "fit",
    feature: null,
    schema: null,
    readOnly: !1,
    allowDelete: !1,
    editing: !1,
    editorPluginConfig: {
        ptype: "gxp_editorgrid"
    },
    modifyControl: null,
    geometry: null,
    attributes: null,
    cancelButton: null,
    saveButton: null,
    editButton: null,
    deleteButton: null,
    initComponent: function() {
        var b;
        this.addEvents("startedit", "stopedit", "beforefeaturemodified", "featuremodified", "canceledit", "cancelclose");
        var a = this.feature;
        if (a instanceof GeoExt.data.FeatureRecord) b = this.feature = a.getFeature(),
        a = b;
        if (!this.location) this.location = a;
        this.anchored = !this.editing;
        if (!this.title && a.fid) this.title = a.fid;
        this.editButton = new Ext.Button({
            text: this.editButtonText,
            tooltip: this.editButtonTooltip,
            iconCls: "edit",
            handler: this.startEditing,
            scope: this
        });
        this.deleteButton = new Ext.Button({
            text: this.deleteButtonText,
            tooltip: this.deleteButtonTooltip,
            iconCls: "delete",
            hidden: !this.allowDelete,
            handler: this.deleteFeature,
            scope: this
        });
        this.cancelButton = new Ext.Button({
            text: this.cancelButtonText,
            tooltip: this.cancelButtonTooltip,
            iconCls: "cancel",
            hidden: !0,
            handler: function() {
                this.stopEditing(!1)
            },
            scope: this
        });
        this.saveButton = new Ext.Button({
            text: this.saveButtonText,
            tooltip: this.saveButtonTooltip,
            iconCls: "save",
            hidden: !0,
            handler: function() {
                this.stopEditing(!0)
            },
            scope: this
        });
        this.plugins = [Ext.apply({
            feature: a,
            schema: this.schema,
            fields: this.fields,
            excludeFields: this.excludeFields,
            propertyNames: this.propertyNames,
            readOnly: this.readOnly
        },
        this.editorPluginConfig)];
        this.bbar = new Ext.Toolbar({
            hidden: this.readOnly,
            items: [this.editButton, this.deleteButton, this.saveButton, this.cancelButton]
        });
        gxp.FeatureEditPopup.superclass.initComponent.call(this);
        this.on({
            show: function() {
                if (this.editing) this.editing = null,
                this.startEditing()
            },
            beforeclose: function() {
                if (this.editing) {
                    if (this.feature.state === this.getDirtyState()) return Ext.Msg.show({
                        title: this.closeMsgTitle,
                        msg: this.closeMsg,
                        buttons: Ext.Msg.YESNOCANCEL,
                        fn: function(a) {
                            a && "cancel" !== a ? (this.stopEditing("yes" === a), this.close()) : this.fireEvent("cancelclose", this)
                        },
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        animEl: this.getEl()
                    }),
                    !1;
                    this.stopEditing(!1)
                }
            },
            scope: this
        })
    },
    getDirtyState: function() {
        return this.feature.state === OpenLayers.State.INSERT ? this.feature.state: OpenLayers.State.UPDATE
    },
    startEditing: function() {
        if (!this.editing) this.fireEvent("startedit", this),
        this.editing = !0,
        this.anc && this.unanchorPopup(),
        this.editButton.hide(),
        this.deleteButton.hide(),
        this.saveButton.show(),
        this.cancelButton.show(),
        this.geometry = this.feature.geometry && this.feature.geometry.clone(),
        this.attributes = Ext.apply({},
        this.feature.attributes),
        this.modifyControl = new OpenLayers.Control.ModifyFeature(this.feature.layer, {
            standalone: !0,
            vertexRenderIntent: this.vertexRenderIntent
        }),
        this.feature.layer.map.addControl(this.modifyControl),
        this.modifyControl.activate(),
        this.feature.geometry && this.modifyControl.selectFeature(this.feature)
    },
    stopEditing: function(a) {
        if (this.editing) {
            this.fireEvent("stopedit", this);
            this.modifyControl.deactivate();
            this.modifyControl.destroy();
            var b = this.feature;
            if (b.state === this.getDirtyState()) if (!0 === a) {
                this.fireEvent("beforefeaturemodified", this, b);
                if (this.schema) {
                    var d, e;
                    for (e in b.attributes) d = this.schema.getAt(this.schema.findExact("name", e)),
                    a = b.attributes[e],
                    a instanceof Date && (d = d.get("type").split(":").pop(), b.attributes[e] = a.format("date" == d ? "Y-m-d": "c"))
                }
                this.fireEvent("featuremodified", this, b)
            } else b.state === OpenLayers.State.INSERT ? (this.editing = !1, b.layer && b.layer.destroyFeatures([b]), this.fireEvent("canceledit", this, null), this.close()) : (e = b.layer, e.drawFeature(b, {
                display: "none"
            }), b.geometry = this.geometry, b.attributes = this.attributes, this.setFeatureState(null), e.drawFeature(b), this.fireEvent("canceledit", this, b));
            this.isDestroyed || (this.cancelButton.hide(), this.saveButton.hide(), this.editButton.show(), this.allowDelete && this.deleteButton.show());
            this.editing = !1
        }
    },
    deleteFeature: function() {
        Ext.Msg.show({
            title: this.deleteMsgTitle,
            msg: this.deleteMsg,
            buttons: Ext.Msg.YESNO,
            fn: function(a) {
                "yes" === a && (this.setFeatureState(OpenLayers.State.DELETE), this.fireEvent("featuremodified", this, this.feature), this.close())
            },
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            animEl: this.getEl()
        })
    },
    setFeatureState: function(a) {
        this.feature.state = a; (a = this.feature.layer) && a.events.triggerEvent("featuremodified", {
            feature: this.feature
        })
    }
});
Ext.reg("gxp_featureeditpopup", gxp.FeatureEditPopup);
Ext.namespace("gxp.plugins");
gxp.plugins.FeatureEditor = Ext.extend(gxp.plugins.ClickableFeatures, {
    ptype: "gxp_featureeditor",
    splitButton: null,
    iconClsAdd: "gxp-icon-addfeature",
    closeOnSave: !1,
    supportAbstractGeometry: !1,
    supportNoGeometry: !1,
    iconClsEdit: "gxp-icon-editfeature",
    exceptionTitle: "Save Failed",
    exceptionText: "Trouble saving features",
    pointText: "Point",
    lineText: "Line",
    polygonText: "Polygon",
    noGeometryText: "Event",
    createFeatureActionTip: "Create a new feature",
    createFeatureActionText: "Create",
    editFeatureActionTip: "Edit existing feature",
    editFeatureActionText: "Modify",
    splitButtonText: "Edit",
    splitButtonTooltip: "Edit features on selected WMS layer",
    outputTarget: "map",
    snappingAgent: null,
    readOnly: !1,
    modifyOnly: !1,
    showSelectedOnly: !0,
    roles: ["ROLE_ADMINISTRATOR"],
    createAction: null,
    editAction: null,
    activeIndex: 0,
    drawControl: null,
    popup: null,
    schema: null,
    constructor: function(a) {
        this.addEvents("layereditable", "featureeditable");
        gxp.plugins.FeatureEditor.superclass.constructor.apply(this, arguments)
    },
    init: function(a) {
        gxp.plugins.FeatureEditor.superclass.init.apply(this, arguments);
        this.target.on("authorizationchange", this.onAuthorizationChange, this)
    },
    destroy: function() {
        this.target.un("authorizationchange", this.onAuthorizationChange, this);
        gxp.plugins.FeatureEditor.superclass.destroy.apply(this, arguments)
    },
    onAuthorizationChange: function() {
        this.target.isAuthorized(this.roles) || (this.selectControl.deactivate(), this.drawControl.deactivate());
        this.enableOrDisable()
    },
    addActions: function() {
        function a(a, e) {
            var j = Array.prototype.slice.call(arguments);
            j.splice(0, 2);
            if (!g && b && !b.isDestroyed) {
                if (b.editing) {
                    var k = function() {
                        g = !0;
                        m.call(this);
                        "setLayer" === e ? this.target.selectLayer(j[0]) : "clearFeatures" === e ? window.setTimeout(function() {
                            a[e].call(a)
                        }) : a[e].apply(a, j)
                    },
                    m = function() {
                        d.featureStore.un("write", k, this);
                        b.un("canceledit", k, this);
                        b.un("cancelclose", m, this)
                    };
                    d.featureStore.on("write", k, this);
                    b.on({
                        canceledit: k,
                        cancelclose: m,
                        scope: this
                    });
                    b.close()
                }
                return ! b.editing
            }
            g = !1
        }
        var b, d = this.getFeatureManager(),
        e = d.featureLayer,
        g = !1;
        d.on({
            beforequery: a.createDelegate(this, "loadFeatures", 1),
            beforelayerchange: a.createDelegate(this, "setLayer", 1),
            beforesetpage: a.createDelegate(this, "setPage", 1),
            beforeclearfeatures: a.createDelegate(this, "clearFeatures", 1),
            scope: this
        });
        this.drawControl = new OpenLayers.Control.DrawFeature(e, OpenLayers.Handler.Point, {
            eventListeners: {
                featureadded: function(a) {
                    if (!0 === this.autoLoadFeature) this.autoLoadedFeature = a.feature
                },
                activate: function() {
                    this.target.doAuthorized(this.roles,
                    function() {
                        d.showLayer(this.id, this.showSelectedOnly && "selected")
                    },
                    this)
                },
                deactivate: function() {
                    d.hideLayer(this.id)
                },
                scope: this
            }
        });
        this.selectControl = new OpenLayers.Control.SelectFeature(e, {
            clickout: !1,
            multipleKey: "fakeKey",
            unselect: function() {
                d.featureStore.getModifiedRecords().length || OpenLayers.Control.SelectFeature.prototype.unselect.apply(this, arguments)
            },
            eventListeners: {
                activate: function() {
                    this.target.doAuthorized(this.roles,
                    function() { (!0 === this.autoLoadFeature || d.paging) && this.target.mapPanel.map.events.register("click", this, this.noFeatureClick);
                        d.showLayer(this.id, this.showSelectedOnly && "selected");
                        this.selectControl.unselectAll(b && b.editing && {
                            except: b.feature
                        })
                    },
                    this)
                },
                deactivate: function() { (!0 === this.autoLoadFeature || d.paging) && this.target.mapPanel.map.events.unregister("click", this, this.noFeatureClick);
                    if (b) {
                        if (b.editing) b.on("cancelclose",
                        function() {
                            this.selectControl.activate()
                        },
                        this, {
                            single: !0
                        });
                        b.on("close",
                        function() {
                            d.hideLayer(this.id)
                        },
                        this, {
                            single: !0
                        });
                        b.close()
                    } else d.hideLayer(this.id)
                },
                scope: this
            }
        });
        e.events.on({
            beforefeatureremoved: function(a) {
                this.popup && a.feature === this.popup.feature && this.selectControl.unselect(a.feature)
            },
            featureunselected: function(a) { (a = a.feature) && this.fireEvent("featureeditable", this, a, !1);
                a && a.geometry && b && !b.hidden && b.close()
            },
            beforefeatureselected: function() {
                if (b) return ! b.editing
            },
            featureselected: function(a) {
                var e = a.feature;
                e && this.fireEvent("featureeditable", this, e, !0);
                var g = d.featureStore;
                if (!0 === this._forcePopupForNoGeometry || this.selectControl.active && null !== e.geometry) ! 1 === this.readOnly && (this.selectControl.deactivate(), d.showLayer(this.id, this.showSelectedOnly && "selected")),
                this.popup = b = this.addOutput({
                    xtype: "gxp_featureeditpopup",
                    collapsible: !0,
                    feature: g.getByFeature(e),
                    vertexRenderIntent: "vertex",
                    readOnly: this.readOnly,
                    fields: this.fields,
                    excludeFields: this.excludeFields,
                    editing: e.state === OpenLayers.State.INSERT,
                    schema: this.schema,
                    allowDelete: !0,
                    width: 200,
                    height: 250,
                    listeners: {
                        close: function() { ! 1 === this.readOnly && this.selectControl.activate();
                            e.layer && -1 !== e.layer.selectedFeatures.indexOf(e) && this.selectControl.unselect(e);
                            if (e === this.autoLoadedFeature) e.layer && e.layer.removeFeatures([a.feature]),
                            this.autoLoadedFeature = null
                        },
                        featuremodified: function(a, b) {
                            a.disable();
                            g.on({
                                write: {
                                    fn: function() {
                                        a && (a.isVisible() && a.enable(), this.closeOnSave && a.close());
                                        var b = d.layerRecord;
                                        this.target.fireEvent("featureedit", d, {
                                            name: b.get("name"),
                                            source: b.get("source")
                                        })
                                    },
                                    single: !0
                                },
                                exception: {
                                    fn: function(b, e, j, k, m, n) {
                                        b = this.exceptionText;
                                        "remote" === e ? m.exceptionReport && (b = gxp.util.getOGCExceptionText(m.exceptionReport)) : b = "Status: " + m.status;
                                        d.fireEvent("exception", d, m.exceptionReport || {},
                                        b, n); ! 1 === d.hasListener("exception") && !1 === g.hasListener("exception") && Ext.Msg.show({
                                            title: this.exceptionTitle,
                                            msg: b,
                                            icon: Ext.MessageBox.ERROR,
                                            buttons: {
                                                ok: !0
                                            }
                                        });
                                        a && a.isVisible() && (a.enable(), a.startEditing())
                                    },
                                    single: !0
                                },
                                scope: this
                            });
                            if (b.state === OpenLayers.State.DELETE) g._removing = !0,
                            g.remove(g.getRecordFromFeature(b)),
                            delete g._removing;
                            g.save()
                        },
                        canceledit: function() {
                            g.commitChanges()
                        },
                        scope: this
                    }
                })
            },
            sketchcomplete: function() {
                d.featureLayer.events.register("featuresadded", this,
                function(a) {
                    d.featureLayer.events.unregister("featuresadded", this, arguments.callee);
                    this.drawControl.deactivate();
                    this.selectControl.activate();
                    this.selectControl.select(a.features[0])
                })
            },
            scope: this
        });
        var j = this.toggleGroup || Ext.id(),
        k = [],
        m = {
            tooltip: this.createFeatureActionTip,
            menuText: this.initialConfig.createFeatureActionText,
            text: this.initialConfig.createFeatureActionText,
            iconCls: this.iconClsAdd,
            disabled: !0,
            hidden: this.modifyOnly || this.readOnly,
            toggleGroup: j,
            group: j,
            groupClass: null,
            enableToggle: !0,
            allowDepress: !0,
            control: this.drawControl,
            deactivateOnDisable: !0,
            map: this.target.mapPanel.map,
            listeners: {
                checkchange: this.onItemCheckchange,
                scope: this
            }
        };
        if (!0 === this.supportAbstractGeometry) {
            var n = []; ! 0 === this.supportNoGeometry && n.push(new Ext.menu.CheckItem({
                text: this.noGeometryText,
                iconCls: "gxp-icon-event",
                groupClass: null,
                group: j,
                listeners: {
                    checkchange: function(a, b) {
                        if (!0 === b) {
                            var d = new OpenLayers.Feature.Vector(null);
                            d.state = OpenLayers.State.INSERT;
                            e.addFeatures([d]);
                            this._forcePopupForNoGeometry = !0;
                            e.events.triggerEvent("featureselected", {
                                feature: d
                            });
                            delete this._forcePopupForNoGeometry
                        }
                        this.createAction.items[0] instanceof Ext.menu.CheckItem ? this.createAction.items[0].setChecked(!1) : this.createAction.items[0].toggle(!1)
                    },
                    scope: this
                }
            }));
            var o = function(a, b, d) { ! 0 === b && this.setHandler(d, !1);
                this.createAction.items[0] instanceof Ext.menu.CheckItem ? this.createAction.items[0].setChecked(b) : this.createAction.items[0].toggle(b)
            };
            n.push(new Ext.menu.CheckItem({
                groupClass: null,
                text: this.pointText,
                group: j,
                iconCls: "gxp-icon-point",
                listeners: {
                    checkchange: o.createDelegate(this, [OpenLayers.Handler.Point], 2)
                }
            }), new Ext.menu.CheckItem({
                groupClass: null,
                text: this.lineText,
                group: j,
                iconCls: "gxp-icon-line",
                listeners: {
                    checkchange: o.createDelegate(this, [OpenLayers.Handler.Path], 2)
                }
            }), new Ext.menu.CheckItem({
                groupClass: null,
                text: this.polygonText,
                group: j,
                iconCls: "gxp-icon-polygon",
                listeners: {
                    checkchange: o.createDelegate(this, [OpenLayers.Handler.Polygon], 2)
                }
            }));
            k.push(new GeoExt.Action(Ext.apply(m, {
                menu: new Ext.menu.Menu({
                    items: n
                })
            })))
        } else k.push(new GeoExt.Action(m));
        k.push(new GeoExt.Action({
            tooltip: this.editFeatureActionTip,
            text: this.initialConfig.editFeatureActionText,
            menuText: this.initialConfig.editFeatureActionText,
            iconCls: this.iconClsEdit,
            disabled: !0,
            toggleGroup: j,
            group: j,
            groupClass: null,
            enableToggle: !0,
            allowDepress: !0,
            control: this.selectControl,
            deactivateOnDisable: !0,
            map: this.target.mapPanel.map,
            listeners: {
                checkchange: this.onItemCheckchange,
                scope: this
            }
        }));
        this.createAction = k[0];
        this.editAction = k[1];
        if (this.splitButton) this.splitButton = new Ext.SplitButton({
            menu: {
                items: [Ext.apply(new Ext.menu.CheckItem(k[0]), {
                    text: this.createFeatureActionText
                }), Ext.apply(new Ext.menu.CheckItem(k[1]), {
                    text: this.editFeatureActionText
                })]
            },
            disabled: !0,
            buttonText: this.splitButtonText,
            tooltip: this.splitButtonTooltip,
            iconCls: this.iconClsAdd,
            enableToggle: !0,
            toggleGroup: this.toggleGroup,
            allowDepress: !0,
            handler: function(a) {
                a.pressed && a.menu.items.itemAt(this.activeIndex).setChecked(!0)
            },
            scope: this,
            listeners: {
                toggle: function(a, b) {
                    b || a.menu.items.each(function(a) {
                        a.setChecked(!1)
                    })
                },
                render: function(a) {
                    Ext.ButtonToggleMgr.register(a)
                }
            }
        }),
        k = [this.splitButton];
        k = gxp.plugins.FeatureEditor.superclass.addActions.call(this, k);
        d.on("layerchange", this.onLayerChange, this); (j = this.getSnappingAgent()) && j.registerEditor(this);
        return k
    },
    onItemCheckchange: function(a, b) {
        if (this.splitButton) this.activeIndex = a.ownerCt.items.indexOf(a),
        this.splitButton.toggle(b),
        b && this.splitButton.setIconClass(a.iconCls)
    },
    getFeatureManager: function() {
        var a = this.target.tools[this.featureManager];
        if (!a) throw Error("Unable to access feature manager by id: " + this.featureManager);
        return a
    },
    getSnappingAgent: function() {
        var a, b = this.snappingAgent;
        if (b && (a = this.target.tools[b], !a)) throw Error("Unable to locate snapping agent with id: " + b);
        return a
    },
    setHandler: function(a, b) {
        var d = this.drawControl,
        e = d.active;
        e && d.deactivate();
        d.handler.destroy();
        d.handler = new a(d, d.callbacks, Ext.apply(d.handlerOptions, {
            multi: b
        }));
        e && d.activate()
    },
    enableOrDisable: function() {
        var a = !this.schema;
        this.splitButton && this.splitButton.setDisabled(a);
        this.createAction.setDisabled(a);
        this.editAction.setDisabled(a);
        return a
    },
    onLayerChange: function(a, b, d) {
        this.schema = d;
        if (this.enableOrDisable()) this.fireEvent("layereditable", this, b, !1);
        else {
            var d = this.createAction,
            e = {
                Point: OpenLayers.Handler.Point,
                Line: OpenLayers.Handler.Path,
                Curve: OpenLayers.Handler.Path,
                Polygon: OpenLayers.Handler.Polygon,
                Surface: OpenLayers.Handler.Polygon
            },
            g = a.geometryType.replace("Multi", ""); (e = e[g]) ? (this.setHandler(e, g != a.geometryType), d.enable()) : !0 === this.supportAbstractGeometry && "Geometry" === a.geometryType ? d.enable() : d.disable();
            this.fireEvent("layereditable", this, b, !0)
        }
    },
    select: function(a) {
        this.selectControl.unselectAll(this.popup && this.popup.editing && {
            except: this.popup.feature
        });
        this.selectControl.select(a)
    }
});
Ext.preg(gxp.plugins.FeatureEditor.prototype.ptype, gxp.plugins.FeatureEditor);
Ext.namespace("gxp.plugins");
gxp.plugins.ArcRestSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_arcrestsource",
    noLayersTitle: "No ArcGIS Layers",
    noLayersText: "Could not find any layers with a compatible projection (Web Mercator) at ",
    requiredProperties: ["name"],
    constructor: function(a) {
        this.config = a;
        gxp.plugins.ArcRestSource.superclass.constructor.apply(this, arguments)
    },
    createStore: function() {
        var a = this.url.split("?")[0],
        b = this,
        d = function(d) {
            var j = Ext.decode(d.responseText),
            k = b.getArcProjection(j.spatialReference.wkid),
            m = [];
            if (null != k) for (d = 0; d < j.layers.length; d++) {
                var n = j.layers[d];
                m.push(new OpenLayers.Layer.ArcGIS93Rest(n.name, a + "/export", {
                    layers: "show:" + n.id,
                    TRANSPARENT: !0
                },
                {
                    isBaseLayer: !1,
                    ratio: 1,
                    displayInLayerSwitcher: !0,
                    visibility: !0,
                    projection: k,
                    queryable: j.capabilities && -1 < j.capabilities.indexOf("Identify")
                }))
            } else e(d);
            b.title = j.documentInfo.Title;
            b.store = new GeoExt.data.LayerStore({
                layers: m,
                fields: [{
                    name: "source",
                    type: "string"
                },
                {
                    name: "name",
                    type: "string",
                    mapping: "name"
                },
                {
                    name: "layerid",
                    type: "string"
                },
                {
                    name: "group",
                    type: "string",
                    defaultValue: this.title
                },
                {
                    name: "fixed",
                    type: "boolean",
                    defaultValue: !0
                },
                {
                    name: "tiled",
                    type: "boolean",
                    defaultValue: !0
                },
                {
                    name: "queryable",
                    type: "boolean",
                    defaultValue: !0
                },
                {
                    name: "selected",
                    type: "boolean"
                }]
            });
            b.fireEvent("ready", b)
        },
        e = function(a) {
            a.isTimeout || Ext.Msg.alert(b.noLayersTitle, b.noLayersText + b.config.url);
            b.fireEvent("failure", b)
        }; (this.lazy = this.isLazy()) ? this.fireEvent("ready") : Ext.Ajax.request({
            url: a,
            timeout: 2E3,
            params: {
                f: "json",
                pretty: "false",
                keepPostParams: "true"
            },
            method: "POST",
            success: d,
            failure: e
        })
    },
    isLazy: function() {
        var a = !0,
        b = !1,
        d = this.target.initialConfig.map;
        if (d && d.layers) for (var e, g = 0,
        j = d.layers.length; g < j && !(e = d.layers[g], e.source === this.id && (b = !0, a = this.layerConfigComplete(e), !1 === a)); ++g);
        return a && b
    },
    layerConfigComplete: function(a) {
        for (var b = !0,
        d = this.requiredProperties,
        e = d.length - 1; 0 <= e && !(b = !!a[d[e]], !1 === b); --e);
        return b
    },
    createLayerRecord: function(a) {
        var b, d;
        d = function(b) {
            return b.get("name") === a.name
        };
        var e = this.lazy || this.store && -1 < this.store.findBy(d);
        if ( - 1 == this.target.mapPanel.layers.findBy(d) && e) {
            b = !this.lazy && -1 < this.store.findBy(d) ? this.store.getAt(this.store.findBy(d)).clone() : this.createLazyLayerRecord(a);
            d = b.getLayer();
            a.title && (d.setName(a.title), b.set("title", a.title));
            if ("visibility" in a) d.visibility = a.visibility;
            if ("opacity" in a) d.opacity = a.opacity;
            if ("format" in a) d.params.FORMAT = a.format,
            b.set("format", a.format);
            d = !1;
            "tiled" in a && (d = !a.tiled);
            b.set("tiled", !d);
            b.set("selected", a.selected || !1);
            b.set("queryable", a.queryable || !0);
            b.set("source", a.source);
            b.set("name", a.name);
            b.set("layerid", a.layerid);
            b.set("properties", "gxp_wmslayerpanel");
            "group" in a && b.set("group", a.group);
            b.commit()
        }
        return b
    },
    getArcProjection: function(a) {
        var b = this.getMapProjection(),
        d = b,
        a = "EPSG:" + a + "";
        if (a !== b.getCode() && (d = null, (p = new OpenLayers.Projection(a)).equals(b))) d = p;
        return d
    },
    createLazyLayerRecord: function(a) {
        var b = a.srs || this.target.map.projection;
        a.srs = {};
        a.srs[b] = !0;
        var d = a.bbox || this.target.map.maxExtent || OpenLayers.Projection.defaults[b].maxExtent;
        a.bbox = {};
        a.bbox[b] = {
            bbox: d
        };
        d = new GeoExt.data.LayerRecord(a);
        d.set("name", a.name);
        d.set("layerid", a.layerid || "show:0");
        d.set("format", a.format || "png");
        d.set("tiled", "tiled" in a ? a.tiled: !0);
        d.setLayer(new OpenLayers.Layer.ArcGIS93Rest(a.name, this.url.split("?")[0] + "/export", {
            layers: a.layerid,
            TRANSPARENT: !0,
            FORMAT: "format" in a ? a.format: "png"
        },
        {
            isBaseLayer: !1,
            displayInLayerSwitcher: !0,
            projection: b,
            singleTile: "tiled" in a ? !a.tiled: !1,
            queryable: "queryable" in a ? a.queryable: !1
        }));
        return d
    },
    getConfigForRecord: function(a) {
        var b = a.getLayer();
        return {
            source: a.get("source"),
            name: a.get("name"),
            title: a.get("title"),
            tiled: a.get("tiled"),
            visibility: b.getVisibility(),
            layerid: b.params.LAYERS,
            format: b.params.FORMAT,
            opacity: b.opacity || void 0,
            group: a.get("group"),
            fixed: a.get("fixed"),
            selected: a.get("selected")
        }
    }
});
Ext.preg(gxp.plugins.ArcRestSource.prototype.ptype, gxp.plugins.ArcRestSource);
Ext.namespace("gxp.plugins");
gxp.plugins.ArcGISCacheSource = Ext.extend(gxp.plugins.ArcRestSource, {
    ptype: "gxp_arcgiscachesource",
    noLayersTitle: "No ArcGIS Layers",
    noLayersText: "Could not find any layers with a compatible projection (Web Mercator) at ",
    requiredProperties: ["name", "fullExtent", "tileInfo"],
    constructor: function(a) {
        this.config = a;
        gxp.plugins.ArcGISCacheSource.superclass.constructor.apply(this, arguments)
    },
    createStore: function() {
        var a = this.url.split("?")[0].replace(/https?:/, window.location.protocol),
        b = this,
        d = function(d) {
            var j = Ext.decode(d.responseText),
            k = b.getArcProjection(j.spatialReference.wkid),
            m = [];
            null != k ? m.push(new OpenLayers.Layer.ArcGISCache(j.layers[0].name, a, {
                layerInfo: j
            },
            {
                isBaseLayer: !1,
                ratio: 1,
                displayInLayerSwitcher: !0,
                visibility: !0,
                projection: k,
                queryable: j.capabilities && -1 < j.capabilities.indexOf("Identify")
            })) : e(d);
            b.title = j.documentInfo.Title;
            b.store = new GeoExt.data.LayerStore({
                layers: m,
                fields: [{
                    name: "source",
                    type: "string"
                },
                {
                    name: "name",
                    type: "string",
                    mapping: "name"
                },
                {
                    name: "layerid",
                    type: "string"
                },
                {
                    name: "group",
                    type: "string",
                    defaultValue: "background"
                },
                {
                    name: "fixed",
                    type: "boolean",
                    defaultValue: !0
                },
                {
                    name: "tiled",
                    type: "boolean",
                    defaultValue: !0
                },
                {
                    name: "queryable",
                    type: "boolean",
                    defaultValue: !0
                },
                {
                    name: "selected",
                    type: "boolean"
                }]
            });
            b.fireEvent("ready", b)
        },
        e = function(a) {
            a.isTimeout || Ext.Msg.alert(b.noLayersTitle, b.noLayersText + b.config.url);
            b.fireEvent("failure", b)
        }; (this.lazy = this.isLazy()) ? this.fireEvent("ready") : Ext.Ajax.request({
            url: a,
            timeout: 2E3,
            params: {
                f: "json",
                pretty: "false",
                keepPostParams: "true"
            },
            method: "POST",
            success: d,
            failure: e
        })
    },
    createLayerRecord: function(a) {
        var b, d;
        d = function(b) {
            return b.get("name") === a.name
        };
        var e = this.lazy || this.store && -1 < this.store.findBy(d);
        if ( - 1 == this.target.mapPanel.layers.findBy(d) && e) {
            b = !this.lazy && -1 < this.store.findBy(d) ? this.store.getAt(this.store.findBy(d)).clone() : this.createLazyLayerRecord(a);
            d = b.getLayer();
            a.title && (d.setName(a.title), b.set("title", a.title));
            if ("visibility" in a) d.visibility = a.visibility;
            if ("opacity" in a) d.opacity = a.opacity;
            if ("format" in a) d.params.FORMAT = a.format,
            b.set("format", a.format);
            d = !1;
            "tiled" in a && (d = !a.tiled);
            b.set("name", a.name);
            b.set("layerid", a.layerid || "show:0");
            b.set("format", a.format || "png");
            b.set("tiled", !d);
            b.set("selected", a.selected || !1);
            b.set("queryable", a.queryable || !0);
            b.set("source", a.source);
            b.set("properties", "gxp_wmslayerpanel");
            "group" in a && b.set("group", a.group);
            b.commit()
        }
        return b
    },
    createLazyLayerRecord: function(a) {
        var b = a.srs || this.target.map.projection;
        a.srs = {};
        a.srs[b] = !0;
        var d = a.bbox || this.target.map.maxExtent || OpenLayers.Projection.defaults[b].maxExtent;
        a.bbox = {};
        a.bbox[b] = {
            bbox: d
        };
        var d = new GeoExt.data.LayerRecord(a),
        e = {
            fullExtent: a.fullExtent,
            spatialReference: {
                wkid: b
            },
            tileInfo: a.tileInfo
        };
        d.setLayer(new OpenLayers.Layer.ArcGISCache(a.name, this.url.split("?")[0], {
            layerInfo: e
        },
        {
            isBaseLayer: !1,
            displayInLayerSwitcher: !0,
            projection: b,
            singleTile: "tiled" in a ? !a.tiled: !1,
            queryable: "queryable" in a ? a.queryable: !1
        }));
        return d
    },
    getConfigForRecord: function(a) {
        var b = a.getLayer();
        return {
            source: a.get("source"),
            name: a.get("name"),
            title: a.get("title"),
            tiled: a.get("tiled"),
            visibility: b.getVisibility(),
            layerid: b.params.LAYERS,
            format: b.params.FORMAT,
            opacity: b.opacity || void 0,
            group: a.get("group"),
            fixed: a.get("fixed"),
            selected: a.get("selected")
        }
    }
});
Ext.preg(gxp.plugins.ArcGISCacheSource.prototype.ptype, gxp.plugins.ArcGISCacheSource); (function() {
    function a(a) {
        var d = this.meta.format;
        if ("string" === typeof a || a.nodeType) {
            var a = d.read(a),
            e = d.read;
            d.read = function() {
                d.read = e;
                return a
            }
        }
        this.raw = a
    }
    Ext.intercept(GeoExt.data.WMSCapabilitiesReader.prototype, "readRecords", a);
    GeoExt.data.AttributeReader && Ext.intercept(GeoExt.data.AttributeReader.prototype, "readRecords", a)
})();
Ext.namespace("gxp.plugins");
gxp.plugins.WMSSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_wmssource",
    baseParams: null,
    format: null,
    describeLayerStore: null,
    describedLayers: null,
    schemaCache: null,
    ready: !1,
    requiredProperties: ["title", "bbox"],
    constructor: function(a) {
        if (a && !0 === a.forceLazy) a.requiredProperties = [],
        delete a.forceLazy,
        window.console && console.warn("Deprecated config option 'forceLazy: true' for layer source '" + a.id + "'. Use 'requiredProperties: []' instead.");
        gxp.plugins.WMSSource.superclass.constructor.apply(this, arguments);
        if (!this.format) this.format = new OpenLayers.Format.WMSCapabilities({
            keepData: !0
        })
    },
    init: function(a) {
        gxp.plugins.WMSSource.superclass.init.apply(this, arguments);
        this.target.on("authorizationchange", this.onAuthorizationChange, this)
    },
    onAuthorizationChange: function() {
        this.store && "/" === this.store.url.charAt(0) && this.store.reload()
    },
    destroy: function() {
        this.target.un("authorizationchange", this.onAuthorizationChange, this);
        gxp.plugins.WMSSource.superclass.destroy.apply(this, arguments)
    },
    isLazy: function() {
        var a = !0,
        b = !1,
        d = this.target.initialConfig.map;
        if (d && d.layers) for (var e, g = 0,
        j = d.layers.length; g < j && !(e = d.layers[g], e.source === this.id && (b = !0, a = this.layerConfigComplete(e), !1 === a)); ++g);
        return a && b
    },
    layerConfigComplete: function(a) {
        var b = !0;
        if (!Ext.isObject(a.capability)) for (var d = this.requiredProperties,
        e = d.length - 1; 0 <= e && !(b = !!a[d[e]], !1 === b); --e);
        return b
    },
    createStore: function() {
        var a = this.baseParams || {
            SERVICE: "WMS",
            REQUEST: "GetCapabilities"
        };
        if (this.version) a.VERSION = this.version;
        var b = this.isLazy();
        this.store = new GeoExt.data.WMSCapabilitiesStore({
            url: this.trimUrl(this.url, a),
            baseParams: a,
            format: this.format,
            autoLoad: !b,
            layerParams: {
                exceptions: null
            },
            listeners: {
                load: function() {
                    if (!this.store.reader.raw || !this.store.reader.raw.service) this.fireEvent("failure", this, "Invalid capabilities document.");
                    else {
                        if (!this.title) this.title = this.store.reader.raw.service.title;
                        this.ready ? this.lazy = !1 : (this.ready = !0, this.fireEvent("ready", this))
                    }
                    delete this.format.data
                },
                exception: function(a, b, g, j, k, m) {
                    delete this.store;
                    a = "";
                    "response" === b ? "string" == typeof m ? b = m: (b = "Invalid response from server.", (a = this.format && this.format.data) && a.parseError && (b += "  " + a.parseError.reason + " - line: " + a.parseError.line), k = k.status, a = 200 <= k && 300 > k ? gxp.util.getOGCExceptionText(m && m.arg && m.arg.exceptionReport) : "Status: " + k) : (b = "Trouble creating layer store from response.", a = "Unable to handle response.");
                    this.fireEvent("failure", this, b, a);
                    delete this.format.data
                },
                scope: this
            }
        });
        if (b) this.ready = this.lazy = !0,
        this.fireEvent("ready", this)
    },
    trimUrl: function(a, b) {
        var d = OpenLayers.Util.getParameters(a),
        b = OpenLayers.Util.upperCaseObject(b),
        e = 0,
        g;
        for (g in d)++e,
        g.toUpperCase() in b && (--e, delete d[g]);
        return a.split("?").shift() + (e ? "?" + OpenLayers.Util.getParameterString(d) : "")
    },
    createLazyLayerRecord: function(a) {
        var a = Ext.apply({},
        a),
        b = a.srs || this.target.map.projection;
        a.srs = {};
        a.srs[b] = !0;
        var d = a.bbox || this.target.map.maxExtent || OpenLayers.Projection.defaults[b].maxExtent;
        a.bbox = {};
        a.bbox[b] = {
            bbox: d
        };
        d = this.store && this.store instanceof GeoExt.data.WMSCapabilitiesStore ? new this.store.recordType(a) : new GeoExt.data.LayerRecord(a);
        d.setLayer(new OpenLayers.Layer.WMS(a.title || a.name, a.url || this.url, {
            layers: a.name,
            transparent: "transparent" in a ? a.transparent: !0,
            cql_filter: a.cql_filter,
            format: a.format
        },
        {
            projection: b
        }));
        if (d) d.json = a;
        return d
    },
    createLayerRecord: function(a) {
        var b, d, e = this.store.findExact("name", a.name); - 1 < e ? d = this.store.getAt(e) : Ext.isObject(a.capability) ? d = this.store.reader.readRecords({
            capability: {
                request: {
                    getmap: {
                        href: this.url || this.store.url
                    }
                },
                layers: [a.capability]
            }
        }).records[0] : this.layerConfigComplete(a) && (d = this.createLazyLayerRecord(a));
        if (d) {
            b = d.getLayer().clone();
            if (b.url !== this.store.url) this.store.url = this.url = this.trimUrl(b.url);
            var e = this.getMapProjection(),
            g = this.getProjection(d),
            j = (g || e).getCode(),
            k = d.get("bbox"),
            m;
            if (k && k[j]) b.addOptions({
                projection: g
            }),
            m = OpenLayers.Bounds.fromArray(k[j].bbox, b.reverseAxisOrder());
            else if (g = d.get("llbbox")) e = OpenLayers.Bounds.fromArray(g).transform("EPSG:4326", e),
            0 < 1 / e.getHeight() && 0 < 1 / e.getWidth() && (m = e);
            b.mergeNewParams({
                STYLES: a.styles,
                FORMAT: a.format,
                TRANSPARENT: a.transparent,
                CQL_FILTER: a.cql_filter
            });
            e = !1;
            "tiled" in a ? e = !a.tiled: d.data.dimensions && d.data.dimensions.time && (e = !0);
            b.setName(a.title || b.name);
            b.addOptions({
                attribution: b.attribution,
                maxExtent: m,
                restrictedExtent: m,
                singleTile: e,
                ratio: a.ratio || 1,
                visibility: "visibility" in a ? a.visibility: !0,
                opacity: "opacity" in a ? a.opacity: 1,
                buffer: "buffer" in a ? a.buffer: 1,
                dimensions: d.data.dimensions,
                transitionEffect: e ? "resize": null,
                minScale: a.minscale,
                maxScale: a.maxscale
            });
            m = Ext.applyIf({
                title: b.name,
                group: a.group,
                infoFormat: a.infoFormat,
                getFeatureInfo: a.getFeatureInfo,
                source: a.source,
                properties: "gxp_wmslayerpanel",
                fixed: a.fixed,
                selected: "selected" in a ? a.selected: !1,
                restUrl: this.restUrl,
                layer: b
            },
            d.data);
            var n = [{
                name: "source",
                type: "string"
            },
            {
                name: "group",
                type: "string"
            },
            {
                name: "properties",
                type: "string"
            },
            {
                name: "fixed",
                type: "boolean"
            },
            {
                name: "selected",
                type: "boolean"
            },
            {
                name: "restUrl",
                type: "string"
            },
            {
                name: "infoFormat",
                type: "string"
            },
            {
                name: "getFeatureInfo"
            }];
            d.fields.each(function(a) {
                n.push(a)
            });
            b = new(GeoExt.data.LayerRecord.create(n))(m, b.id);
            b.json = a
        } else window.console && 0 < this.store.getCount() && console.warn("Could not create layer record for layer '" + a.name + "'. Check if the layer is found in the WMS GetCapabilities response.");
        return b
    },
    getProjection: function(a) {
        var b = this.getMapProjection(),
        d = b,
        a = a.get("srs");
        if (!a[b.getCode()]) {
            var d = null,
            e, g;
            for (g in a) if ((e = new OpenLayers.Projection(g)).equals(b)) {
                d = e;
                break
            }
        }
        return d
    },
    initDescribeLayerStore: function() {
        var a = this.store.reader.raw;
        this.lazy && (a = {
            capability: {
                request: {
                    describelayer: {
                        href: this.url
                    }
                }
            },
            version: this.version || "1.1.1"
        });
        var b = a.capability.request.describelayer;
        if (b) a = a.version,
        1.1 < parseFloat(a) && (a = "1.1.1"),
        a = {
            SERVICE: "WMS",
            VERSION: a,
            REQUEST: "DescribeLayer"
        },
        this.describeLayerStore = new GeoExt.data.WMSDescribeLayerStore({
            url: this.trimUrl(b.href, a),
            baseParams: a
        })
    },
    describeLayer: function(a, b, d) {
        function e(a) {
            window.setTimeout(function() {
                b.call(d, a)
            },
            0)
        }
        this.describeLayerStore || this.initDescribeLayerStore();
        if (this.describeLayerStore) {
            if (!this.describedLayers) this.describedLayers = {};
            var g = a.getLayer().params.LAYERS,
            a = function() {
                for (var a = Ext.isArray(arguments[1]) ? arguments[1] : arguments[0], e, k, q = a.length - 1; 0 <= q; q--) {
                    e = a[q];
                    k = e.get("layerName");
                    if (k == g) {
                        this.describeLayerStore.un("load", arguments.callee, this);
                        this.describedLayers[k] = !0;
                        b.call(d, e);
                        return
                    }
                    "function" == typeof this.describedLayers[k] && (e = this.describedLayers[k], this.describeLayerStore.un("load", e, this), e.apply(this, arguments))
                }
                delete j[g];
                b.call(d, !1)
            },
            j = this.describedLayers,
            k;
            if (j[g]) if ( - 1 == (k = this.describeLayerStore.findExact("layerName", g))) this.describeLayerStore.on("load", a, this);
            else e(this.describeLayerStore.getAt(k));
            else j[g] = a,
            this.describeLayerStore.load({
                params: {
                    LAYERS: g
                },
                add: !0,
                callback: a,
                scope: this
            })
        } else e(!1)
    },
    fetchSchema: function(a, b, d, e) {
        var g = this.schemaCache[b];
        if (g) if (0 == g.getCount()) g.on("load",
        function() {
            d.call(e, g)
        },
        this, {
            single: !0
        });
        else d.call(e, g);
        else g = new GeoExt.data.AttributeStore({
            url: a,
            baseParams: {
                SERVICE: "WFS",
                VERSION: "1.1.0",
                REQUEST: "DescribeFeatureType",
                TYPENAME: b
            },
            autoLoad: !0,
            listeners: {
                load: function() {
                    d.call(e, g)
                },
                scope: this
            }
        }),
        this.schemaCache[b] = g
    },
    getSchema: function(a, b, d) {
        if (!this.schemaCache) this.schemaCache = {};
        this.describeLayer(a,
        function(e) {
            if (e && "WFS" == e.get("owsType")) {
                var g = e.get("typeName");
                this.fetchSchema(e.get("owsURL"), g, b, d)
            } else e ? b.call(d, !1) : this.fetchSchema(this.url, a.get("name"), b, d)
        },
        this)
    },
    getWFSProtocol: function(a, b, d) {
        this.getSchema(a,
        function(e) {
            var g = !1;
            if (e) {
                var j, k = /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/;
                e.each(function(a) {
                    k.exec(a.get("type")) && (j = a.get("name"))
                },
                this);
                g = new OpenLayers.Protocol.WFS({
                    version: "1.1.0",
                    srsName: a.getLayer().projection.getCode(),
                    url: e.url,
                    featureType: e.reader.raw.featureTypes[0].typeName,
                    featureNS: e.reader.raw.targetNamespace,
                    geometryName: j
                })
            }
            b.call(d, g, e, a)
        },
        this)
    },
    getConfigForRecord: function(a) {
        var b = Ext.applyIf(gxp.plugins.WMSSource.superclass.getConfigForRecord.apply(this, arguments), a.json),
        d = a.getLayer(),
        e = d.params,
        g = d.options,
        j = b.name,
        k = this.store.reader.raw;
        if (k) for (var k = k.capability.layers,
        m = k.length - 1; 0 <= m; --m) if (k[m].name === j) {
            b.capability = Ext.apply({},
            k[m]);
            j = {};
            j[d.projection.getCode()] = !0;
            b.capability.srs = j;
            break
        }
        if (!b.capability) {
            if (d.maxExtent) b.bbox = d.maxExtent.toArray();
            b.srs = d.projection.getCode()
        }
        return Ext.apply(b, {
            format: e.FORMAT,
            styles: e.STYLES,
            transparent: e.TRANSPARENT,
            cql_filter: e.CQL_FILTER,
            minscale: g.minScale,
            maxscale: g.maxScale,
            infoFormat: a.get("infoFormat")
        })
    },
    getState: function() {
        var a = gxp.plugins.WMSSource.superclass.getState.apply(this, arguments);
        Ext.apply(a, {
            url: this.trimUrl(this.url)
        });
        return Ext.applyIf(a, {
            title: this.title
        })
    },
    getStore: function() {
        return this.store
    }
});
Ext.preg(gxp.plugins.WMSSource.prototype.ptype, gxp.plugins.WMSSource);
Ext.namespace("gxp.plugins");
gxp.plugins.WMSCSource = Ext.extend(gxp.plugins.WMSSource, {
    ptype: "gxp_wmscsource",
    version: "1.1.1",
    constructor: function(a) {
        a.baseParams = {
            SERVICE: "WMS",
            REQUEST: "GetCapabilities",
            TILED: !0
        };
        if (!a.format) this.format = new OpenLayers.Format.WMSCapabilities({
            keepData: !0,
            profile: "WMSC"
        });
        gxp.plugins.WMSCSource.superclass.constructor.apply(this, arguments)
    },
    createLayerRecord: function(a) {
        var b = gxp.plugins.WMSCSource.superclass.createLayerRecord.apply(this, arguments);
        if (b) {
            var d, e;
            if (this.store.reader.raw) d = this.store.reader.raw.capability;
            var g = d && d.vendorSpecific ? d.vendorSpecific.tileSets: a.capability && a.capability.tileSets;
            d = b.get("layer");
            if (g) for (var j = this.getProjection(b) || this.getMapProjection(), k = 0, m = g.length; k < m; k++) {
                var n = g[k];
                if (n.layers === d.params.LAYERS) {
                    var o;
                    for (e in n.srs) {
                        o = new OpenLayers.Projection(e);
                        break
                    }
                    if (j.equals(o)) {
                        e = n.bbox[e].bbox;
                        d.projection = o;
                        d.addOptions({
                            resolutions: n.resolutions,
                            tileSize: new OpenLayers.Size(n.width, n.height),
                            tileOrigin: new OpenLayers.LonLat(e[0], e[1])
                        });
                        break
                    }
                }
            } else if (this.lazy && (o = a.tileSize, e = a.tileOrigin, d.addOptions({
                resolutions: a.resolutions,
                tileSize: o ? new OpenLayers.Size(o[0], o[1]) : void 0,
                tileOrigin: e ? OpenLayers.LonLat.fromArray(e) : void 0
            }), !e && (this.target.map.maxExtent ? o = this.target.map.maxExtent: (e = a.srs || this.target.map.projection, o = OpenLayers.Projection.defaults[e].maxExtent), o))) d.tileOrigin = OpenLayers.LonLat.fromArray(o);
            d.params.TILED = !1 !== a.cached && !0;
            return b
        }
    },
    getConfigForRecord: function(a) {
        var b = gxp.plugins.WMSCSource.superclass.getConfigForRecord.apply(this, arguments),
        d = b.name,
        e,
        g = a.getLayer();
        if (b.capability) {
            e = this.store.reader.raw.capability;
            var j = e.vendorSpecific && e.vendorSpecific.tileSets;
            if (j) for (var k = j.length - 1; 0 <= k; --k) if (e = j[k], e.layers === d && e.srs[g.projection]) {
                b.capability.tileSets = [e];
                break
            }
            if (!b.capability || b.capability && !b.capability.tileSets) if (d = g.options.tileSize) b.tileSize = [d.w, d.h],
            b.tileOrigin = g.options.tileOrigin,
            b.resolutions = g.options.resolutions
        }
        if (!b.capability || !b.capability.tileSets) {
            if (d = g.options.tileSize) b.tileSize = [d.w, d.h];
            b.tileOrigin = g.options.tileOrigin;
            b.resolutions = g.options.resolutions
        }
        return Ext.applyIf(b, {
            cached: !!g.params.TILED
        })
    },
    getStore: function() {
        return this.store
    }
});
Ext.preg(gxp.plugins.WMSCSource.prototype.ptype, gxp.plugins.WMSCSource);
Ext.namespace("gxp.plugins");
OpenLayers.Layer.Bing.prototype.loadMetadata = function() {
    this._callbackId = "_callback_" + this.id.replace(/\./g, "_");
    window[this._callbackId] = OpenLayers.Function.bind(OpenLayers.Layer.Bing.processMetadata, this);
    var a = OpenLayers.Util.applyDefaults({
        key: this.key,
        jsonp: this._callbackId,
        include: "ImageryProviders"
    },
    this.metadataParams),
    a = window.location.protocol + "//dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.type + "?" + OpenLayers.Util.getParameterString(a),
    b = document.createElement("script");
    b.type = "text/javascript";
    b.src = a;
    b.id = this._callbackId;
    document.getElementsByTagName("head")[0].appendChild(b)
};
gxp.plugins.BingSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_bingsource",
    title: "Bing Layers",
    roadTitle: "Bing Roads",
    aerialTitle: "Bing Aerial",
    labeledAerialTitle: "Bing Aerial With Labels",
    apiKey: "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf",
    createStore: function() {
        var a = [new OpenLayers.Layer.Bing({
            key: this.apiKey,
            name: this.roadTitle,
            type: "Road",
            buffer: 1,
            transitionEffect: "resize"
        }), new OpenLayers.Layer.Bing({
            key: this.apiKey,
            name: this.aerialTitle,
            type: "Aerial",
            buffer: 1,
            transitionEffect: "resize"
        }), new OpenLayers.Layer.Bing({
            key: this.apiKey,
            name: this.labeledAerialTitle,
            type: "AerialWithLabels",
            buffer: 1,
            transitionEffect: "resize"
        })];
        this.store = new GeoExt.data.LayerStore({
            layers: a,
            fields: [{
                name: "source",
                type: "string"
            },
            {
                name: "name",
                type: "string",
                mapping: "type"
            },
            {
                name: "abstract",
                type: "string",
                mapping: "attribution"
            },
            {
                name: "group",
                type: "string",
                defaultValue: "background"
            },
            {
                name: "fixed",
                type: "boolean",
                defaultValue: !0
            },
            {
                name: "selected",
                type: "boolean"
            }]
        });
        this.store.each(function(a) {
            a.set("group", "background")
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function(a) {
        var b, d = this.store.findExact("name", a.name);
        if ( - 1 < d) {
            b = this.store.getAt(d).copy(Ext.data.Record.id({}));
            d = b.getLayer().clone();
            a.title && (d.setName(a.title), b.set("title", a.title));
            if ("visibility" in a) d.visibility = a.visibility;
            b.set("selected", a.selected || !1);
            b.set("source", a.source);
            b.set("name", a.name);
            "group" in a && b.set("group", a.group);
            b.data.layer = d;
            b.commit()
        }
        return b
    }
});
Ext.preg(gxp.plugins.BingSource.prototype.ptype, gxp.plugins.BingSource);
Ext.namespace("gxp.plugins");
gxp.plugins.GoogleSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_googlesource",
    timeout: 7E3,
    title: "Google Layers",
    roadmapAbstract: "Show street map",
    satelliteAbstract: "Show satellite imagery",
    hybridAbstract: "Show imagery with street names",
    terrainAbstract: "Show street map with terrain",
    roadmapTitle: "Google Roadmap",
    hybridTitle: "Google Hybrid",
    satelliteTitle: "Google Satellite",
    terrainTitle: "Google Terrain",
    otherParams: "sensor=false",
    constructor: function(a) {
        this.config = a;
        gxp.plugins.GoogleSource.superclass.constructor.apply(this, arguments)
    },
    createStore: function() {
        gxp.plugins.GoogleSource.loader.onLoad({
            otherParams: this.otherParams,
            timeout: this.timeout,
            callback: this.syncCreateStore,
            errback: function() {
                delete this.store;
                this.fireEvent("failure", this, "The Google Maps script failed to load within the provided timeout (" + this.timeout / 1E3 + " s).")
            },
            scope: this
        })
    },
    syncCreateStore: function() {
        var a = {
            ROADMAP: {
                "abstract": this.roadmapAbstract,
                MAX_ZOOM_LEVEL: 20,
                title: this.roadmapTitle
            },
            SATELLITE: {
                "abstract": this.satelliteAbstract,
                title: this.satelliteTitle
            },
            HYBRID: {
                "abstract": this.hybridAbstract,
                title: this.hybridTitle
            },
            TERRAIN: {
                "abstract": this.terrainAbstract,
                MAX_ZOOM_LEVEL: 15,
                title: this.terrainTitle
            }
        },
        b = [],
        d,
        e;
        for (d in a) e = google.maps.MapTypeId[d],
        b.push(new OpenLayers.Layer.Google(a[d].title, {
            type: e,
            typeName: d,
            MAX_ZOOM_LEVEL: a[d].MAX_ZOOM_LEVEL,
            maxExtent: new OpenLayers.Bounds( - 2.003750834E7, -2.003750834E7, 2.003750834E7, 2.003750834E7),
            restrictedExtent: new OpenLayers.Bounds( - 2.003750834E7, -2.003750834E7, 2.003750834E7, 2.003750834E7),
            projection: this.projection
        }));
        this.store = new GeoExt.data.LayerStore({
            layers: b,
            fields: [{
                name: "source",
                type: "string"
            },
            {
                name: "name",
                type: "string",
                mapping: "typeName"
            },
            {
                name: "abstract",
                type: "string"
            },
            {
                name: "group",
                type: "string",
                defaultValue: "background"
            },
            {
                name: "fixed",
                type: "boolean",
                defaultValue: !0
            },
            {
                name: "selected",
                type: "boolean"
            }]
        });
        this.store.each(function(b) {
            b.set("abstract", a[b.get("name")]["abstract"])
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function(a) {
        var b, d = function(b) {
            return b.get("name") === a.name
        };
        if ( - 1 == this.target.mapPanel.layers.findBy(d)) {
            b = this.store.getAt(this.store.findBy(d)).clone();
            d = b.getLayer();
            a.title && (d.setName(a.title), b.set("title", a.title));
            if ("visibility" in a) d.visibility = a.visibility;
            b.set("selected", a.selected || !1);
            b.set("source", a.source);
            b.set("name", a.name);
            "group" in a && b.set("group", a.group);
            b.commit()
        }
        return b
    }
});
gxp.plugins.GoogleSource.loader = new(Ext.extend(Ext.util.Observable, {
    ready: !(!window.google || !google.maps),
    loading: !1,
    constructor: function() {
        this.addEvents("ready", "failure");
        return Ext.util.Observable.prototype.constructor.apply(this, arguments)
    },
    onScriptLoad: function() {
        var a = gxp.plugins.GoogleSource.loader;
        if (!a.ready) a.ready = !0,
        a.loading = !1,
        a.fireEvent("ready")
    },
    onLoad: function(a) {
        if (this.ready) window.setTimeout(function() {
            a.callback.call(a.scope)
        },
        0);
        else if (this.loading) this.on({
            ready: a.callback,
            failure: a.errback || Ext.emptyFn,
            scope: a.scope
        });
        else this.loadScript(a)
    },
    loadScript: function(a) {
        function b() {
            document.getElementsByTagName("head")[0].appendChild(e)
        }
        var d = {
            autoload: Ext.encode({
                modules: [{
                    name: "maps",
                    version: 3.7,
                    nocss: "true",
                    callback: "gxp.plugins.GoogleSource.loader.onScriptLoad",
                    other_params: a.otherParams
                }]
            })
        },
        e = document.createElement("script");
        e.src = window.location.protocol + "//www.google.com/jsapi?" + Ext.urlEncode(d);
        var g = a.errback || Ext.emptyFn,
        d = a.timeout || gxp.plugins.GoogleSource.prototype.timeout;
        window.setTimeout(function() {
            if (!gxp.plugins.GoogleSource.loader.ready) this.ready = this.loading = !1,
            document.getElementsByTagName("head")[0].removeChild(e),
            g.call(a.scope),
            this.fireEvent("failure"),
            this.purgeListeners()
        }.createDelegate(this), d);
        this.on({
            ready: a.callback,
            scope: a.scope
        });
        this.loading = !0;
        if (document.body) b();
        else Ext.onReady(b)
    }
}));
Ext.preg(gxp.plugins.GoogleSource.prototype.ptype, gxp.plugins.GoogleSource);
Ext.namespace("gxp.plugins");
gxp.plugins.MapBoxSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_mapboxsource",
    title: "MapBox Layers",
    blueMarbleTopoBathyJanTitle: "Blue Marble Topography & Bathymetry (January)",
    blueMarbleTopoBathyJulTitle: "Blue Marble Topography & Bathymetry (July)",
    blueMarbleTopoJanTitle: "Blue Marble Topography (January)",
    blueMarbleTopoJulTitle: "Blue Marble Topography (July)",
    controlRoomTitle: "Control Room",
    geographyClassTitle: "Geography Class",
    naturalEarthHypsoTitle: "Natural Earth Hypsometric",
    naturalEarthHypsoBathyTitle: "Natural Earth Hypsometric & Bathymetry",
    naturalEarth1Title: "Natural Earth I",
    naturalEarth2Title: "Natural Earth II",
    worldDarkTitle: "World Dark",
    worldLightTitle: "World Light",
    worldGlassTitle: "World Glass",
    worldPrintTitle: "World Print",
    createStore: function() {
        for (var a = {
            projection: "EPSG:900913",
            numZoomLevels: 19,
            serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135],
            buffer: 1
        },
        b = [{
            name: "blue-marble-topo-bathy-jan",
            numZoomLevels: 9
        },
        {
            name: "blue-marble-topo-bathy-jul",
            numZoomLevels: 9
        },
        {
            name: "blue-marble-topo-jan",
            numZoomLevels: 9
        },
        {
            name: "blue-marble-topo-jul",
            numZoomLevels: 9
        },
        {
            name: "control-room",
            numZoomLevels: 9
        },
        {
            name: "geography-class",
            numZoomLevels: 9
        },
        {
            name: "natural-earth-hypso",
            numZoomLevels: 7
        },
        {
            name: "natural-earth-hypso-bathy",
            numZoomLevels: 7
        },
        {
            name: "natural-earth-1",
            numZoomLevels: 7
        },
        {
            name: "natural-earth-2",
            numZoomLevels: 7
        },
        {
            name: "world-dark",
            numZoomLevels: 12
        },
        {
            name: "world-light",
            numZoomLevels: 12
        },
        {
            name: "world-glass",
            numZoomLevels: 11
        },
        {
            name: "world-print",
            numZoomLevels: 10
        }], d = b.length, e = Array(d), g, j = 0; j < d; ++j) g = b[j],
        e[j] = new OpenLayers.Layer.TMS(this[OpenLayers.String.camelize(g.name) + "Title"], ["http://a.tiles.mapbox.com/mapbox/", "http://b.tiles.mapbox.com/mapbox/", "http://c.tiles.mapbox.com/mapbox/", "http://d.tiles.mapbox.com/mapbox/"], OpenLayers.Util.applyDefaults({
            attribution: /^world/.test(name) ? "<a href='http://mapbox.com'>MapBox</a> | Some Data &copy; OSM CC-BY-SA | <a href='http://mapbox.com/tos'>Terms of Service</a>": "<a href='http://mapbox.com'>MapBox</a> | <a href='http://mapbox.com/tos'>Terms of Service</a>",
            type: "png",
            tileOrigin: new OpenLayers.LonLat( - 2.003750834E7, -2.003750834E7),
            layername: g.name,
            "abstract": '<div class="thumb-mapbox thumb-mapbox-' + g.name + '"></div>',
            numZoomLevels: g.numZoomLevels
        },
        a));
        this.store = new GeoExt.data.LayerStore({
            layers: e,
            fields: [{
                name: "source",
                type: "string"
            },
            {
                name: "name",
                type: "string",
                mapping: "layername"
            },
            {
                name: "abstract",
                type: "string"
            },
            {
                name: "group",
                type: "string"
            },
            {
                name: "fixed",
                type: "boolean"
            },
            {
                name: "selected",
                type: "boolean"
            }]
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function(a) {
        var b, d = this.store.findExact("name", a.name);
        if ( - 1 < d) {
            b = this.store.getAt(d).copy(Ext.data.Record.id({}));
            d = b.getLayer().clone();
            a.title && (d.setName(a.title), b.set("title", a.title));
            if ("visibility" in a) d.visibility = a.visibility;
            b.set("selected", a.selected || !1);
            b.set("source", a.source);
            b.set("name", a.name);
            "group" in a && b.set("group", a.group);
            b.data.layer = d;
            b.commit()
        }
        return b
    }
});
Ext.preg(gxp.plugins.MapBoxSource.prototype.ptype, gxp.plugins.MapBoxSource);
Ext.namespace("gxp.plugins");
gxp.plugins.MapQuestSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_mapquestsource",
    title: "MapQuest Layers",
    osmAttribution: "Tiles Courtesy of <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
    osmTitle: "MapQuest OpenStreetMap",
    naipAttribution: "Tiles Courtesy of <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
    naipTitle: "MapQuest Imagery",
    createStore: function() {
        var a = {
            projection: "EPSG:900913",
            maxExtent: new OpenLayers.Bounds( - 2.00375083392E7, -2.00375083392E7, 2.00375083392E7, 2.00375083392E7),
            maxResolution: 156543.03390625,
            numZoomLevels: 19,
            units: "m",
            buffer: 1,
            transitionEffect: "resize",
            tileOptions: {
                crossOriginKeyword: null
            }
        },
        a = [new OpenLayers.Layer.OSM(this.osmTitle, ["http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"], OpenLayers.Util.applyDefaults({
            attribution: this.osmAttribution,
            type: "osm"
        },
        a)), new OpenLayers.Layer.OSM(this.naipTitle, ["http://oatile1.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile2.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile3.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile4.mqcdn.com/naip/${z}/${x}/${y}.png"], OpenLayers.Util.applyDefaults({
            attribution: this.naipAttribution,
            type: "naip"
        },
        a))];
        this.store = new GeoExt.data.LayerStore({
            layers: a,
            fields: [{
                name: "source",
                type: "string"
            },
            {
                name: "name",
                type: "string",
                mapping: "type"
            },
            {
                name: "abstract",
                type: "string",
                mapping: "attribution"
            },
            {
                name: "group",
                type: "string",
                defaultValue: "background"
            },
            {
                name: "fixed",
                type: "boolean",
                defaultValue: !0
            },
            {
                name: "selected",
                type: "boolean"
            }]
        });
        this.store.each(function(a) {
            a.set("group", "background")
        });
        this.fireEvent("ready", this)
    },
    createLayerRecord: function(a) {
        var b, d = this.store.findExact("name", a.name);
        if ( - 1 < d) {
            b = this.store.getAt(d).copy(Ext.data.Record.id({}));
            d = b.getLayer().clone();
            a.title && (d.setName(a.title), b.set("title", a.title));
            if ("visibility" in a) d.visibility = a.visibility;
            b.set("selected", a.selected || !1);
            b.set("source", a.source);
            b.set("name", a.name);
            "group" in a && b.set("group", a.group);
            b.data.layer = d;
            b.commit()
        }
        return b
    }
});
Ext.preg(gxp.plugins.MapQuestSource.prototype.ptype, gxp.plugins.MapQuestSource);
Ext.namespace("gxp.plugins");
gxp.plugins.OLSource = Ext.extend(gxp.plugins.LayerSource, {
    ptype: "gxp_olsource",
    createLayerRecord: function(a) {
        var b, d = window;
        b = a.type.split(".");
        for (var e = 0,
        g = b.length; e < g && !(d = d[b[e]], !d); ++e);
        if (d && d.prototype && d.prototype.initialize) {
            b = function() {
                d.prototype.initialize.apply(this, a.args)
            };
            b.prototype = d.prototype;
            b = new b;
            if ("visibility" in a) b.visibility = a.visibility;
            b = new(GeoExt.data.LayerRecord.create([{
                name: "name",
                type: "string"
            },
            {
                name: "source",
                type: "string"
            },
            {
                name: "group",
                type: "string"
            },
            {
                name: "fixed",
                type: "boolean"
            },
            {
                name: "selected",
                type: "boolean"
            },
            {
                name: "type",
                type: "string"
            },
            {
                name: "args"
            }]))({
                layer: b,
                title: b.name,
                name: a.name || b.name,
                source: a.source,
                group: a.group,
                fixed: "fixed" in a ? a.fixed: !1,
                selected: "selected" in a ? a.selected: !1,
                type: a.type,
                args: a.args,
                properties: "properties" in a ? a.properties: void 0
            },
            b.id)
        } else throw Error("Cannot construct OpenLayers layer from given type: " + a.type);
        return b
    },
    getConfigForRecord: function(a) {
        var b = gxp.plugins.OLSource.superclass.getConfigForRecord.apply(this, arguments);
        a.getLayer();
        return Ext.apply(b, {
            type: a.get("type"),
            args: a.get("args")
        })
    }
});
Ext.preg(gxp.plugins.OLSource.prototype.ptype, gxp.plugins.OLSource);
Ext.namespace("gxp.plugins");
gxp.plugins.StyleWriter = Ext.extend(Ext.util.Observable, {
    deletedStyles: null,
    constructor: function(a) {
        this.initialConfig = a;
        Ext.apply(this, a);
        this.deletedStyles = [];
        gxp.plugins.StyleWriter.superclass.constructor.apply(this, arguments)
    },
    init: function(a) {
        this.target = a;
        a.stylesStore.on({
            remove: function(a, d) {
                var e = d.get("name");
                d.get("name") === e && this.deletedStyles.push(e)
            },
            scope: this
        });
        a.on({
            beforesaved: this.write,
            scope: this
        })
    },
    write: function(a) {
        a.stylesStore.commitChanges();
        a.fireEvent("saved", a, a.selectedStyle.get("name"))
    }
});
Ext.namespace("gxp.plugins");
gxp.plugins.GeoServerStyleWriter = Ext.extend(gxp.plugins.StyleWriter, {
    baseUrl: "/geoserver/rest",
    constructor: function(a) {
        this.initialConfig = a;
        Ext.apply(this, a);
        gxp.plugins.GeoServerStyleWriter.superclass.constructor.apply(this, arguments)
    },
    write: function(a) {
        var a = a || {},
        b = [],
        d = this.target.stylesStore;
        d.each(function(a) { (a.phantom || -1 !== d.modified.indexOf(a)) && this.writeStyle(a, b)
        },
        this);
        var e = function() {
            this.deleteStyles();
            for (var b = this.target.stylesStore.getModifiedRecords(), d = b.length - 1; 0 <= d; --d) b[d].phantom = !1;
            b = this.target;
            b.stylesStore.commitChanges();
            a.success && a.success.call(a.scope);
            b.fireEvent("saved", b, b.selectedStyle.get("name"))
        };
        0 < b.length ? gxp.util.dispatch(b,
        function() {
            this.assignStyles(a.defaultStyle, e)
        },
        this) : this.assignStyles(a.defaultStyle, e)
    },
    writeStyle: function(a, b) {
        var d = a.get("userStyle").name;
        b.push(function(b) {
            Ext.Ajax.request({
                method: !0 === a.phantom ? "POST": "PUT",
                url: this.baseUrl + "/styles" + (!0 === a.phantom ? "": "/" + d + ".xml"),
                headers: {
                    "Content-Type": "application/vnd.ogc.sld+xml; charset=UTF-8"
                },
                xmlData: this.target.createSLD({
                    userStyles: [d]
                }),
                success: !0 === a.phantom ?
                function() {
                    Ext.Ajax.request({
                        method: "POST",
                        url: this.baseUrl + "/layers/" + this.target.layerRecord.get("name") + "/styles.json",
                        jsonData: {
                            style: {
                                name: d
                            }
                        },
                        success: b,
                        scope: this
                    })
                }: b,
                scope: this
            })
        })
    },
    assignStyles: function(a, b) {
        var d = [];
        this.target.stylesStore.each(function(b) { ! a && !0 === b.get("userStyle").isDefault && (a = b.get("name"));
            b.get("name") !== a && -1 === this.deletedStyles.indexOf(b.id) && d.push({
                name: b.get("name")
            })
        },
        this);
        Ext.Ajax.request({
            method: "PUT",
            url: this.baseUrl + "/layers/" + this.target.layerRecord.get("name") + ".json",
            jsonData: {
                layer: {
                    defaultStyle: {
                        name: a
                    },
                    styles: 0 < d.length ? {
                        style: d
                    }: {},
                    enabled: !0
                }
            },
            success: b,
            scope: this
        })
    },
    deleteStyles: function() {
        var a = this.deletedStyles;
        this.target.stylesStore.each(function(b) {
            delRec = a.indexOf(b.data.name); - 1 < delRec && a.splice(delRec, 1)
        });
        for (var b = 0,
        d = this.deletedStyles.length; b < d; ++b) Ext.Ajax.request({
            method: "DELETE",
            url: this.baseUrl + "/styles/" + this.deletedStyles[b] + "?purge=true"
        });
        this.deletedStyles = []
    }
});
Ext.preg("gxp_geoserverstylewriter", gxp.plugins.GeoServerStyleWriter);
Ext.namespace("gxp.plugins");
gxp.plugins.WMSGetFeatureInfo = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_wmsgetfeatureinfo",
    outputTarget: "map",
    popupCache: null,
    infoActionTip: "Get Feature Info",
    popupTitle: "Feature Info",
    buttonText: "Identify",
    format: "html",
    addActions: function() {
        var a;
        this.popupCache = {};
        var b = gxp.plugins.WMSGetFeatureInfo.superclass.addActions.call(this, [{
            tooltip: this.infoActionTip,
            iconCls: "gxp-icon-getfeatureinfo",
            buttonText: this.buttonText,
            toggleGroup: this.toggleGroup,
            enableToggle: !0,
            allowDepress: !0,
            toggleHandler: function(b, d) {
                for (var e = 0,
                m = a.length; e < m; e++) d ? a[e].activate() : a[e].deactivate()
            }
        }]),
        d = this.actions[0].items[0];
        a = [];
        var e = function() {
            for (var b = this.target.mapPanel.layers.queryBy(function(a) {
                return a.get("queryable")
            }), e = this.target.mapPanel.map, k, m = 0, n = a.length; m < n; m++) k = a[m],
            k.deactivate(),
            k.destroy();
            a = [];
            b.each(function(b) {
                var g = b.getLayer(),
                k = Ext.apply({},
                this.vendorParams),
                m;
                if (this.layerParams) for (var n = this.layerParams.length - 1; 0 <= n; --n) m = this.layerParams[n].toUpperCase(),
                k[m] = g.params[m];
                var r = b.get("infoFormat");
                void 0 === r && (r = "html" == this.format ? "text/html": "application/vnd.ogc.gml");
                g = new OpenLayers.Control.WMSGetFeatureInfo(Ext.applyIf({
                    url: g.url,
                    queryVisible: !0,
                    layers: [g],
                    infoFormat: r,
                    vendorParams: k,
                    eventListeners: {
                        getfeatureinfo: function(a) {
                            var d = b.get("title") || b.get("name");
                            if ("text/html" == r) {
                                var e = a.text.match(/<body[^>]*>([\s\S]*)<\/body>/);
                                e && !e[1].match(/^\s*$/) && this.displayPopup(a, d, e[1])
                            } else "text/plain" == r ? this.displayPopup(a, d, "<pre>" + a.text + "</pre>") : a.features && 0 < a.features.length && this.displayPopup(a, d, null, b.get("getFeatureInfo"))
                        },
                        scope: this
                    }
                },
                this.controlOptions));
                e.addControl(g);
                a.push(g);
                d.pressed && g.activate()
            },
            this)
        };
        this.target.mapPanel.layers.on("update", e, this);
        this.target.mapPanel.layers.on("add", e, this);
        this.target.mapPanel.layers.on("remove", e, this);
        return b
    },
    displayPopup: function(a, b, d, e) {
        var g, j = a.xy.x + "." + a.xy.y,
        e = e || {};
        j in this.popupCache ? g = this.popupCache[j] : (g = this.addOutput({
            xtype: "gx_popup",
            title: this.popupTitle,
            layout: "accordion",
            fill: !1,
            autoScroll: !0,
            location: a.xy,
            map: this.target.mapPanel,
            width: 250,
            height: 300,
            defaults: {
                layout: "fit",
                autoScroll: !0,
                autoHeight: !0,
                autoWidth: !0,
                collapsible: !0
            },
            listeners: {
                close: function(a) {
                    return function() {
                        delete this.popupCache[a]
                    }
                } (j),
                scope: this
            }
        }), this.popupCache[j] = g);
        a = a.features;
        j = [];
        if (!d && a) for (var k = 0,
        m = a.length; k < m; ++k) d = a[k],
        j.push(Ext.apply({
            xtype: "gxp_editorgrid",
            readOnly: !0,
            listeners: {
                beforeedit: function() {
                    return ! 1
                }
            },
            title: d.fid ? d.fid: b,
            feature: d,
            fields: e.fields,
            propertyNames: e.propertyNames
        },
        this.itemConfig));
        else d && j.push(Ext.apply({
            title: b,
            html: d
        },
        this.itemConfig));
        g.add(j);
        g.doLayout()
    }
});
Ext.preg(gxp.plugins.WMSGetFeatureInfo.prototype.ptype, gxp.plugins.WMSGetFeatureInfo);
Ext.namespace("gxp.plugins");
gxp.plugins.WMSRasterStylesDialog = {
    isRaster: null,
    init: function(a) {
        Ext.apply(a, gxp.plugins.WMSRasterStylesDialog)
    },
    createRule: function() {
        var a = [new OpenLayers.Symbolizer[this.isRaster ? "Raster": this.symbolType]];
        return new OpenLayers.Rule({
            symbolizers: a
        })
    },
    addRule: function() {
        var a = this.rulesFieldSet.items.get(0);
        this.isRaster ? (a.rules.push(this.createPseudoRule()), 1 == a.rules.length && a.rules.push(this.createPseudoRule()), this.savePseudoRules()) : (this.selectedStyle.get("userStyle").rules.push(this.createRule()), a.update(), this.selectedStyle.store.afterEdit(this.selectedStyle));
        this.updateRuleRemoveButton()
    },
    removeRule: function() {
        if (this.isRaster) {
            var a = this.rulesFieldSet.items.get(0),
            b = this.selectedRule;
            a.unselect();
            a.rules.remove(b);
            1 == a.rules.length && a.rules.remove(a.rules[0]);
            this.savePseudoRules()
        } else gxp.WMSStylesDialog.prototype.removeRule.apply(this, arguments)
    },
    duplicateRule: function() {
        var a = this.rulesFieldSet.items.get(0);
        if (this.isRaster) a.rules.push(this.createPseudoRule({
            quantity: this.selectedRule.name,
            label: this.selectedRule.title,
            color: this.selectedRule.symbolizers[0].fillColor,
            opacity: this.selectedRule.symbolizers[0].fillOpacity
        })),
        this.savePseudoRules();
        else {
            var b = this.selectedRule.clone();
            b.name = gxp.util.uniqueName((b.title || b.name) + " (copy)");
            delete b.title;
            this.selectedStyle.get("userStyle").rules.push(b);
            a.update()
        }
        this.updateRuleRemoveButton()
    },
    editRule: function() {
        this.isRaster ? this.editPseudoRule() : gxp.WMSStylesDialog.prototype.editRule.apply(this, arguments)
    },
    editPseudoRule: function() {
        var a = this,
        b = this.selectedRule,
        d = new Ext.Window({
            title: "Color Map Entry: " + b.name,
            width: 340,
            autoHeight: !0,
            modal: !0,
            items: [{
                bodyStyle: "padding-top: 5px",
                border: !1,
                defaults: {
                    autoHeight: !0,
                    hideMode: "offsets"
                },
                items: [{
                    xtype: "form",
                    border: !1,
                    labelAlign: "top",
                    defaults: {
                        border: !1
                    },
                    style: {
                        padding: "0.3em 0 0 1em"
                    },
                    items: [{
                        layout: "column",
                        defaults: {
                            border: !1,
                            style: {
                                "padding-right": "1em"
                            }
                        },
                        items: [{
                            layout: "form",
                            width: 70,
                            items: [{
                                xtype: "numberfield",
                                anchor: "95%",
                                value: b.name,
                                allowBlank: !1,
                                fieldLabel: "Quantity",
                                validator: function(d) {
                                    for (var e = a.rulesFieldSet.items.get(0).rules, k = e.length - 1; 0 <= k; k--) if (b !== e[k] && e[k].name == d) return "Quantity " + d + " is already defined";
                                    return ! 0
                                },
                                listeners: {
                                    valid: function(a) {
                                        this.selectedRule.name = "" + a.getValue();
                                        this.savePseudoRules()
                                    },
                                    scope: this
                                }
                            }]
                        },
                        {
                            layout: "form",
                            width: 130,
                            items: [{
                                xtype: "textfield",
                                fieldLabel: "Label",
                                anchor: "95%",
                                value: b.title,
                                listeners: {
                                    valid: function(a) {
                                        this.selectedRule.title = a.getValue();
                                        this.savePseudoRules()
                                    },
                                    scope: this
                                }
                            }]
                        },
                        {
                            layout: "form",
                            width: 70,
                            items: [new GeoExt.FeatureRenderer({
                                symbolType: this.symbolType,
                                symbolizers: [b.symbolizers[0]],
                                isFormField: !0,
                                fieldLabel: "Appearance"
                            })]
                        }]
                    }]
                },
                {
                    xtype: "gxp_polygonsymbolizer",
                    symbolizer: b.symbolizers[0],
                    bodyStyle: {
                        padding: "10px"
                    },
                    border: !1,
                    labelWidth: 70,
                    defaults: {
                        labelWidth: 70
                    },
                    listeners: {
                        change: function(a) {
                            var b = d.findByType(GeoExt.FeatureRenderer)[0];
                            b.setSymbolizers([a], {
                                draw: b.rendered
                            });
                            this.selectedRule.symbolizers[0] = a;
                            this.savePseudoRules()
                        },
                        scope: this
                    }
                }]
            }]
        }),
        e = d.findByType("gxp_strokesymbolizer")[0];
        e.ownerCt.remove(e);
        d.show()
    },
    savePseudoRules: function() {
        var a = this.selectedStyle,
        b = this.rulesFieldSet.items.get(0),
        a = a.get("userStyle"),
        b = b.rules;
        b.sort(function(a, b) {
            var d = parseFloat(a.name),
            e = parseFloat(b.name);
            return d === e ? 0 : d < e ? -1 : 1
        });
        a = a.rules[0].symbolizers[0];
        a.colorMap = 0 < b.length ? Array(b.length) : void 0;
        for (var d, e = 0,
        g = b.length; e < g; ++e) d = b[e],
        a.colorMap[e] = {
            quantity: parseFloat(d.name),
            label: d.title || void 0,
            color: d.symbolizers[0].fillColor || void 0,
            opacity: !1 == d.symbolizers[0].fill ? 0 : d.symbolizers[0].fillOpacity
        };
        this.afterRuleChange(this.selectedRule)
    },
    createLegend: function(a, b) {
        var d = OpenLayers.Symbolizer.Raster;
        d && a[0] && a[0].symbolizers[0] instanceof d ? (this.getComponent("rulesfieldset").setTitle("Color Map Entries"), this.isRaster = !0, this.addRasterLegend(a, b)) : (this.isRaster = !1, this.addVectorLegend(a))
    },
    addRasterLegend: function(a, b) {
        for (var b = b || {},
        d = a[0].symbolizers[0].colorMap || [], e = [], g = 0, j = d.length; g < j; g++) e.push(this.createPseudoRule(d[g]));
        this.selectedRule = null != b.selectedRuleIndex ? e[b.selectedRuleIndex] : null;
        return this.addVectorLegend(e, {
            symbolType: "Polygon",
            enableDD: !1
        })
    },
    createPseudoRule: function(a) {
        var b = -1;
        if (!a) {
            var d = this.rulesFieldSet;
            if (d.items) {
                rules = d.items.get(0).rules;
                for (d = rules.length - 1; 0 <= d; d--) b = Math.max(b, parseFloat(rules[d].name))
            }
        }
        a = Ext.applyIf(a || {},
        {
            quantity: ++b,
            color: "#000000",
            opacity: 1
        });
        return new OpenLayers.Rule({
            title: a.label,
            name: "" + a.quantity,
            symbolizers: [new OpenLayers.Symbolizer.Polygon({
                fillColor: a.color,
                fillOpacity: a.opacity,
                stroke: !1,
                fill: 0 !== a.opacity
            })]
        })
    },
    updateRuleRemoveButton: function() {
        this.rulesToolbar.items.get(1).setDisabled(!this.selectedRule || !1 === this.isRaster && 1 >= this.rulesFieldSet.items.get(0).rules.length)
    }
};
Ext.preg("gxp_wmsrasterstylesdialog", gxp.plugins.WMSRasterStylesDialog);
Ext.namespace("gxp.plugins");
gxp.plugins.ZoomToExtent = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_zoomtoextent",
    menuText: "Zoom To Max Extent",
    tooltip: "Zoom To Max Extent",
    extent: null,
    closest: !0,
    iconCls: "gxp-icon-zoomtoextent",
    closest: !0,
    constructor: function(a) {
        gxp.plugins.ZoomToExtent.superclass.constructor.apply(this, arguments);
        if (this.extent instanceof Array) this.extent = OpenLayers.Bounds.fromArray(this.extent)
    },
    addActions: function() {
        return gxp.plugins.ZoomToExtent.superclass.addActions.apply(this, [{
            text: this.buttonText,
            menuText: this.menuText,
            iconCls: this.iconCls,
            tooltip: this.tooltip,
            handler: function() {
                var a = this.target.mapPanel.map,
                b = "function" == typeof this.extent ? this.extent() : this.extent;
                if (!b) for (var d, e = 0,
                g = a.layers.length; e < g; ++e) d = a.layers[e],
                d.getVisibility() && (d = d.restrictedExtent || d.maxExtent, b ? b.extend(d) : d && (b = d.clone()));
                b && ((e = a.restrictedExtent || a.maxExtent) && (b = new OpenLayers.Bounds(Math.max(b.left, e.left), Math.max(b.bottom, e.bottom), Math.min(b.right, e.right), Math.min(b.top, e.top))), a.zoomToExtent(b, this.closest))
            },
            scope: this
        }])
    }
});
Ext.preg(gxp.plugins.ZoomToExtent.prototype.ptype, gxp.plugins.ZoomToExtent);
Ext.namespace("gxp.plugins");
gxp.plugins.NavigationHistory = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_navigationhistory",
    previousMenuText: "Zoom To Previous Extent",
    nextMenuText: "Zoom To Next Extent",
    previousTooltip: "Zoom To Previous Extent",
    nextTooltip: "Zoom To Next Extent",
    constructor: function(a) {
        gxp.plugins.NavigationHistory.superclass.constructor.apply(this, arguments)
    },
    addActions: function() {
        var a = new OpenLayers.Control.NavigationHistory;
        this.target.mapPanel.map.addControl(a);
        a = [new GeoExt.Action({
            menuText: this.previousMenuText,
            iconCls: "gxp-icon-zoom-previous",
            tooltip: this.previousTooltip,
            disabled: !0,
            control: a.previous
        }), new GeoExt.Action({
            menuText: this.nextMenuText,
            iconCls: "gxp-icon-zoom-next",
            tooltip: this.nextTooltip,
            disabled: !0,
            control: a.next
        })];
        return gxp.plugins.NavigationHistory.superclass.addActions.apply(this, [a])
    }
});
Ext.preg(gxp.plugins.NavigationHistory.prototype.ptype, gxp.plugins.NavigationHistory);
Ext.namespace("gxp.plugins");
gxp.plugins.Zoom = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_zoom",
    zoomMenuText: "Zoom Box",
    zoomInMenuText: "Zoom In",
    zoomOutMenuText: "Zoom Out",
    zoomTooltip: "Zoom by dragging a box",
    zoomInTooltip: "Zoom in",
    zoomOutTooltip: "Zoom out",
    constructor: function(a) {
        gxp.plugins.Zoom.superclass.constructor.apply(this, arguments)
    },
    addActions: function() {
        var a = [{
            menuText: this.zoomInMenuText,
            iconCls: "gxp-icon-zoom-in",
            tooltip: this.zoomInTooltip,
            handler: function() {
                this.target.mapPanel.map.zoomIn()
            },
            scope: this
        },
        {
            menuText: this.zoomOutMenuText,
            iconCls: "gxp-icon-zoom-out",
            tooltip: this.zoomOutTooltip,
            handler: function() {
                this.target.mapPanel.map.zoomOut()
            },
            scope: this
        }];
        this.showZoomBoxAction && a.unshift(new GeoExt.Action({
            menuText: this.zoomText,
            iconCls: "gxp-icon-zoom",
            tooltip: this.zoomTooltip,
            control: new OpenLayers.Control.ZoomBox(this.controlOptions),
            map: this.target.mapPanel.map,
            enableToggle: !0,
            allowDepress: !1,
            toggleGroup: this.toggleGroup
        }));
        return gxp.plugins.Zoom.superclass.addActions.apply(this, [a])
    }
});
Ext.preg(gxp.plugins.Zoom.prototype.ptype, gxp.plugins.Zoom);
Ext.namespace("gxp.plugins");
gxp.plugins.AddLayers = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_addlayers",
    addActionMenuText: "Add layers",
    findActionMenuText: "Find layers",
    addActionTip: "Add layers",
    addServerText: "Add a New Server",
    addButtonText: "Add layers",
    untitledText: "Untitled",
    addLayerSourceErrorText: "Error getting WMS capabilities ({msg}).\nPlease check the url and try again.",
    availableLayersText: "Available Layers",
    expanderTemplateText: "<p><b>Abstract:</b> {abstract}</p>",
    panelTitleText: "Title",
    layerSelectionText: "Layers from:",
    sourceSelectOrTypeText: "Choose one or type service URL",
    doneText: "Done",
    uploadRoles: ["ROLE_ADMINISTRATOR"],
    uploadText: "Upload layers",
    relativeUploadOnly: !0,
    startSourceId: null,
    selectedSource: null,
    urlRegExp: /^(http(s)?:)?\/\/([\w%]+:[\w%]+@)?([^@\/:]+)(:\d+)?\//i,
    invalidURLText: "Enter a valid URL to a WMS endpoint (e.g. http://example.com/geoserver/wms)",
    urlRegExp: /^(http(s)?:)?\/\/([\w%]+:[\w%]+@)?([^@\/:]+)(:\d+)?\//i,
    invalidURLText: "Enter a valid URL to a WMS endpoint (e.g. http://example.com/geoserver/wms)",
    layerTree: null,
    constructor: function(a) {
        this.addEvents("sourceselected");
        gxp.plugins.AddLayers.superclass.constructor.apply(this, arguments)
    },
    addActions: function() {
        var a = {
            tooltip: this.addActionTip,
            text: this.addActionText,
            menuText: this.addActionMenuText,
            disabled: !0,
            iconCls: "gxp-icon-addlayers"
        },
        b;
        if (this.initialConfig.search || this.uploadSource) {
            var d = [new Ext.menu.Item({
                iconCls: "gxp-icon-addlayers",
                text: this.addActionMenuText,
                handler: this.showCapabilitiesGrid,
                scope: this
            })];
            this.initialConfig.search && d.push(new Ext.menu.Item({
                iconCls: "gxp-icon-addlayers",
                text: this.findActionMenuText,
                handler: this.showCatalogueSearch,
                scope: this
            }));
            this.uploadSource && (b = this.createUploadButton(Ext.menu.Item)) && d.push(b);
            a = Ext.apply(a, {
                menu: new Ext.menu.Menu({
                    items: d
                })
            })
        } else a = Ext.apply(a, {
            handler: this.showCapabilitiesGrid,
            scope: this
        });
        var e = gxp.plugins.AddLayers.superclass.addActions.apply(this, [a]);
        this.target.on("ready",
        function() {
            if (this.uploadSource) {
                var a = this.target.layerSources[this.uploadSource];
                a ? this.setSelectedSource(a) : (delete this.uploadSource, b && b.hide())
            }
            e[0].enable()
        },
        this);
        return e
    },
    showCatalogueSearch: function() {
        var a = this.initialConfig.search.selectedSource,
        b = {},
        d;
        for (d in this.target.layerSources) {
            var e = this.target.layerSources[d];
            if (e instanceof gxp.plugins.CatalogueSource) {
                var g = {};
                g[d] = e;
                Ext.apply(b, g)
            }
        }
        a = gxp.plugins.AddLayers.superclass.addOutput.apply(this, [{
            sources: b,
            selectedSource: a,
            xtype: "gxp_cataloguesearchpanel",
            topicCategories: this.topicCategories,
            map: this.target.mapPanel.map,
            listeners: {
                addlayer: function(a, b, d) {
                    var a = this.target.layerSources[b],
                    e = OpenLayers.Bounds.fromArray(d.bbox),
                    b = this.target.mapPanel.map.getProjection(),
                    e = e.transform(d.srs, b);
                    d.srs = b;
                    d.bbox = e.toArray();
                    d.source = a.id;
                    a = a.createLayerRecord(d);
                    a.set("group", d.subject);
                    this.layerTree && this.layerTree.addCategoryFolder({
                        group: d.subject
                    });
                    this.target.mapPanel.layers.add(a)
                },
                scope: this
            }
        }]); (b = a.findParentByType("window")) && b.center();
        return a
    },
    showCapabilitiesGrid: function() {
        this.capGrid ? this.capGrid instanceof Ext.Window || this.addOutput(this.capGrid) : this.initCapGrid();
        this.capGrid.show()
    },
    initCapGrid: function() {
        function a() {
            var a = this.target.layerSources[v.getValue()];
            this.addLayers(q.getSelectionModel().getSelections(), a)
        }
        function b(a) {
            j.target.addLayerSource({
                config: {
                    url: a,
                    ptype: j.target.layerSources[k].ptype
                },
                callback: function(a) {
                    a = new m.recordType({
                        id: a,
                        title: j.target.layerSources[a].title || j.untitledText
                    });
                    m.insert(0, [a]);
                    v.onSelect(a, 0)
                },
                fallback: function(a, b) {
                    s = (new Ext.Template(j.addLayerSourceErrorText)).apply({
                        msg: b
                    });
                    v.validate()
                },
                scope: j
            })
        }
        var d, e = [],
        g = this.target,
        j = this,
        k;
        for (k in g.layerSources) d = g.layerSources[k],
        d.store && "gxp_cataloguesource" !== d.ptype && e.push([k, d.title || k, d.url]);
        var m = new Ext.data.ArrayStore({
            fields: ["id", "title", "url"],
            data: e
        }),
        n = this.createExpander(),
        o = 0;
        null !== this.startSourceId && m.each(function(a) {
            a.get("id") === this.startSourceId && (o = m.indexOf(a))
        },
        this);
        d = this.target.layerSources[e[o][0]];
        var q = new Ext.grid.GridPanel({
            store: d.store,
            autoScroll: !0,
            autoExpandColumn: "title",
            plugins: [n],
            loadMask: !0,
            colModel: new Ext.grid.ColumnModel([n, {
                id: "title",
                header: this.panelTitleText,
                dataIndex: "title",
                sortable: !0
            },
            {
                header: "Id",
                dataIndex: "name",
                width: 120,
                sortable: !0
            }]),
            listeners: {
                rowdblclick: a,
                scope: this
            }
        }),
        s,
        v = new Ext.form.ComboBox({
            ref: "../sourceComboBox",
            width: 230,
            store: m,
            valueField: "id",
            displayField: "title",
            tpl: '<tpl for="."><div ext:qtip="{url}" class="x-combo-list-item">{title}</div></tpl>',
            triggerAction: "all",
            allowBlank: !!g.proxy,
            editable: !!g.proxy,
            forceSelection: !g.proxy,
            typeAhead: !0,
            mode: "local",
            emptyText: g.proxy ? this.sourceSelectOrTypeText: void 0,
            validationEvent: "keyup",
            validator: function(a) {
                var b = s;
                s || (b = j.urlRegExp.test(a) || ~v.store.findExact(a) ? !0 : j.invalidURLText);
                s = null;
                return b
            },
            listeners: {
                select: function(a, b) {
                    var d = this.target.layerSources[b.get("id")];
                    q.reconfigure(d.store, q.getColumnModel());
                    q.getView().focusRow(0);
                    this.setSelectedSource(d); (function() {
                        a.triggerBlur();
                        a.el.blur()
                    }).defer(100)
                },
                specialkey: function(a, d) {
                    var e = a.getRawValue();
                    d.getKey() == d.ENTER && !~v.store.findExact(e) && !0 === v.validator(e) && b(e)
                },
                focus: function(a) {
                    g.proxy && a.reset()
                },
                scope: this
            }
        });
        d = null;
        if (this.target.proxy || 1 < e.length) d = [new Ext.Toolbar.TextItem({
            text: this.layerSelectionText
        }), v];
        n = {
            xtype: "container",
            region: "center",
            layout: "fit",
            hideBorders: !0,
            items: [q]
        };
        this.instructionsText && n.items.push({
            xtype: "box",
            autoHeight: !0,
            autoEl: {
                tag: "p",
                cls: "x-form-item",
                style: "padding-left: 5px; padding-right: 5px"
            },
            html: this.instructionsText
        });
        var u = ["->", new Ext.Button({
            text: this.addButtonText,
            iconCls: "gxp-icon-addlayers",
            handler: a,
            scope: this
        }), new Ext.Button({
            text: this.doneText,
            handler: function() {
                this.capGrid.hide()
            },
            scope: this
        })],
        r;
        this.uploadSource || (r = this.createUploadButton()) && u.unshift(r);
        r = this.outputTarget ? Ext.Panel: Ext.Window;
        this.capGrid = new r(Ext.apply({
            title: this.availableLayersText,
            closeAction: "hide",
            layout: "border",
            height: 300,
            width: 300,
            modal: !0,
            items: n,
            tbar: d,
            bbar: u,
            listeners: {
                hide: function() {
                    q.getSelectionModel().clearSelections()
                },
                show: function() {
                    null === this.selectedSource ? this.setSelectedSource(this.target.layerSources[e[o][0]]) : this.setSelectedSource(this.selectedSource)
                },
                scope: this
            }
        },
        this.initialConfig.outputConfig));
        r === Ext.Panel && this.addOutput(this.capGrid)
    },
    addLayers: function(a, b, d) {
        for (var b = b || this.selectedSource,
        e = this.target.mapPanel.layers,
        g, j, k, m = 0,
        n = a.length; m < n; ++m) if (j = b.createLayerRecord({
            name: a[m].get("name"),
            source: b.id
        })) k = j.getLayer(),
        k.maxExtent && (g ? g.extend(j.getLayer().maxExtent) : g = j.getLayer().maxExtent.clone()),
        "background" === j.get("group") ? e.insert(1, [j]) : (this.layerTree && this.layerTree.createCategoryFolder({
            title: j.get("group")
        }), e.add([j]));
        g && this.target.mapPanel.map.zoomToExtent(g);
        if (1 === a.length && j && (this.target.selectLayer(j), d && this.postUploadAction)) {
            var o, a = this.postUploadAction;
            if (!Ext.isString(a)) o = a.outputConfig,
            a = a.plugin;
            this.target.tools[a].addOutput(o)
        }
    },
    setSelectedSource: function(a) {
        this.selectedSource = a;
        this.fireEvent("sourceselected", this, a);
        this.capGrid && a.lazy && a.store.load({
            callback: function() {
                var a = this.capGrid.sourceComboBox,
                d = a.store,
                e = a.valueField,
                g = d.findExact(e, a.getValue()),
                j = (g = d.getAt(g)) && this.target.layerSources[g.get("id")];
                j ? j.title !== g.get("title") && (g.set("title", j.title), a.setValue(g.get(e))) : d.remove(g)
            }.createDelegate(this)
        })
    },
    createUploadButton: function(a) {
        var a = a || Ext.Button,
        b, d = this.initialConfig.upload || !!this.initialConfig.uploadSource,
        e;
        if (d) {
            "boolean" === typeof d && (d = {});
            b = new a({
                text: this.uploadText,
                iconCls: "gxp-icon-filebrowse",
                hidden: !this.uploadSource,
                handler: function() {
                    this.target.doAuthorized(this.uploadRoles,
                    function() {
                        var a = new gxp.LayerUploadPanel(Ext.apply({
                            title: this.outputTarget ? this.uploadText: void 0,
                            url: e,
                            width: 300,
                            border: !1,
                            bodyStyle: "padding: 10px 10px 0 10px;",
                            labelWidth: 65,
                            autoScroll: !0,
                            defaults: {
                                anchor: "99%",
                                allowBlank: !1,
                                msgTarget: "side"
                            },
                            listeners: {
                                uploadcomplete: function(a, d) {
                                    for (var e = d["import"].tasks[0].items, g = {},
                                    j, k = 0, r = e.length; k < r; ++k) j = e[k].resource,
                                    j = j.featureType || j.coverage,
                                    g[j.namespace.name + ":" + j.name] = !0;
                                    this.selectedSource.store.load({
                                        callback: function() {
                                            var a, b;
                                            this.capGrid && this.capGrid.isVisible() && (a = this.capGrid.get(0).get(0), b = a.getSelectionModel(), b.clearSelections());
                                            var d = [],
                                            e = 0;
                                            this.selectedSource.store.each(function(a, b) {
                                                a.get("name") in g && (e = b, d.push(a))
                                            });
                                            a ? window.setTimeout(function() {
                                                b.selectRecords(d);
                                                a.getView().focusRow(e)
                                            },
                                            100) : this.addLayers(d, void 0, !0)
                                        },
                                        scope: this
                                    });
                                    this.outputTarget ? a.hide() : b.close()
                                },
                                scope: this
                            }
                        },
                        d)),
                        b;
                        this.outputTarget ? this.addOutput(a) : (b = new Ext.Window({
                            title: this.uploadText,
                            modal: !0,
                            resizable: !1,
                            items: [a]
                        }), b.show())
                    },
                    this)
                },
                scope: this
            });
            var g = {},
            j = function(a, b, d) {
                a in g ? window.setTimeout(function() {
                    b.call(d, g[a])
                },
                0) : Ext.Ajax.request({
                    url: a,
                    disableCaching: !1,
                    callback: function(e, j, s) {
                        e = s.status;
                        g[a] = e;
                        b.call(d, e)
                    }
                })
            };
            this.on({
                sourceselected: function(a, d) {
                    b[this.uploadSource ? "show": "hide"]();
                    this.isEligibleForUpload(d) && (e = this.getGeoServerRestUrl(d.url), this.target.isAuthorized() && j(e + "/imports",
                    function(a) {
                        b.setVisible(200 === a)
                    },
                    this))
                },
                scope: this
            })
        }
        return b
    },
    getGeoServerRestUrl: function(a) {
        a = a.split("/");
        a.pop();
        a.push("rest");
        return a.join("/")
    },
    isEligibleForUpload: function(a) {
        return a.url && (this.relativeUploadOnly ? "/" === a.url.charAt(0) : !0) && -1 === (this.nonUploadSources || []).indexOf(a.id)
    },
    createExpander: function() {
        return new Ext.grid.RowExpander({
            tpl: new Ext.Template(this.expanderTemplateText)
        })
    }
});
Ext.preg(gxp.plugins.AddLayers.prototype.ptype, gxp.plugins.AddLayers);
Ext.namespace("gxp.plugins");
gxp.plugins.RemoveLayer = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_removelayer",
    removeMenuText: "Remove layer",
    removeActionTip: "Remove layer",
    addActions: function() {
        var a, b = gxp.plugins.RemoveLayer.superclass.addActions.apply(this, [{
            menuText: this.removeMenuText,
            iconCls: "gxp-icon-removelayers",
            disabled: !0,
            tooltip: this.removeActionTip,
            handler: function() {
                var b = a;
                b && this.target.mapPanel.layers.remove(b)
            },
            scope: this
        }]),
        d = b[0];
        this.target.on("layerselectionchange",
        function(b) {
            a = b;
            d.setDisabled(1 >= this.target.mapPanel.layers.getCount() || !b)
        },
        this);
        var e = function(b) {
            d.setDisabled(!a || 1 >= b.getCount())
        };
        this.target.mapPanel.layers.on({
            add: e,
            remove: e
        });
        return b
    }
});
Ext.preg(gxp.plugins.RemoveLayer.prototype.ptype, gxp.plugins.RemoveLayer);
Ext.namespace("gxp.plugins");
Ext.override(Ext.tree.TreeNode, {
    findDescendant: function(a, b) {
        for (var d = this.childNodes,
        e = 0,
        g = d.length; e < g; e++) {
            if (d[e].attributes[a] == b) return d[e];
            if (node = d[e].findDescendant(a, b)) return node
        }
        return null
    }
});
gxp.plugins.LayerTree = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_layertree",
    shortTitle: "Layers",
    rootNodeText: "Layers",
    overlayNodeText: "Overlays",
    baseNodeText: "Base Layers",
    addCategoryActionText: "Add Category",
    addCategoryActionTipText: "Add category",
    groups: null,
    defaultGroup: "default",
    treeNodeUI: null,
    constructor: function(a) {
        gxp.plugins.LayerTree.superclass.constructor.apply(this, arguments);
        this.groups ? this.groups.push({
            title: this.baseNodeText,
            group: "background",
            exclusive: !0
        }) : this.groups = [{
            title: this.baseNodeText,
            group: "background",
            exclusive: !0
        }];
        if (!this.treeNodeUI) this.treeNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin)
    },
    addOutput: function(a) {
        a = Ext.apply(this.createOutputConfig(), a || {});
        this.tree = gxp.plugins.LayerTree.superclass.addOutput.call(this, a);
        if (this.tree.body) this.tree.body.on("mouseover", this.onTreeMouseover, this, {
            delegate: "a.x-tree-node-anchor"
        });
        return this.tree
    },
    createOutputConfig: function() {
        var a = new Ext.tree.TreeNode({
            text: this.rootNodeText,
            id: "layertree_overlay_root",
            expanded: !0,
            isTarget: !1,
            allowDrop: !1
        });
        this.overlayRoot = new Ext.tree.TreeNode({
            id: "layertree_overlay_root",
            text: this.overlayNodeText,
            expanded: !0,
            isTarget: !1,
            allowDrop: !0
        });
        a.appendChild(this.overlayRoot);
        for (var b = 0,
        d = this.groups.length; b < d; b++) {
            var e = this.createCategoryFolder(this.groups[b]);
            "background" == this.groups[b].group ? a.appendChild(e) : this.overlayRoot.appendChild(e);
            e.enable()
        }
        return {
            xtype: "treepanel",
            id: "layertree_panel",
            root: a,
            rootVisible: !1,
            shortTitle: this.shortTitle,
            border: !1,
            enableDD: !0,
            selModel: new Ext.tree.DefaultSelectionModel({
                listeners: {
                    beforeselect: this.handleBeforeSelect,
                    scope: this
                }
            }),
            listeners: {
                contextmenu: this.handleTreeContextMenu,
                beforemovenode: this.handleBeforeMoveNode,
                beforenodedrop: this.handleBeforeNodeDrop,
                movenode: this.handleMoveNode,
                scope: this
            },
            contextMenu: new Ext.menu.Menu({
                items: []
            })
        }
    },
    toggleFolder: function(a) {
        var b = a.expanded ? "true" === a.expanded: !0,
        a = this.overlayRoot.findChild("text", a.group);
        if (null != a) switch (b) {
        case ! 1 : a.collapse();
        default:
            a.expand()
        }
    },
    addCategoryFolder: function(a, b) {
        var d = this.createCategoryFolder(a);
        d && (b ? this.overlayRoot.insertBefore(d, this.overlayRoot.firstChild) : this.overlayRoot.appendChild(d))
    },
    createCategoryFolder: function(a) {
        "string" == typeof a && (a = {
            group: a
        });
        var b = a.expanded ? "true" === a.expanded: !0,
        d = a.group;
        if ("" == d || !d) d = "General";
        if (null == this.overlayRoot.findChild("text", d)) {
            var e = this.defaultGroup,
            g = this,
            d = a.exclusive;
            return new GeoExt.tree.LayerContainer({
                text: a.title || a.group,
                group: a.group,
                iconCls: "gxp-folder",
                expanded: b,
                loader: new GeoExt.tree.LayerLoader({
                    store: this.target.mapPanel.layers,
                    baseAttrs: d ? {
                        checkedGroup: Ext.isString(d) ? d: a.group
                    }: void 0,
                    filter: function(b) {
                        return (b.get("group") || e) == a.group && !0 == b.getLayer().displayInLayerSwitcher
                    },
                    createNode: function(a) {
                        g.configureLayerNode(this, a);
                        return GeoExt.tree.LayerLoader.prototype.createNode.apply(this, arguments)
                    }
                }),
                singleClickExpand: !0,
                allowDrag: !0,
                enableDD: !0,
                listeners: {
                    append: function(a, b) {
                        b.expand()
                    }
                }
            })
        }
    },
    replaceURLWithHTMLLinks: function(a) {
        return null != a && !a.match(/\<a|\<img/ig) ? a.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a target='_blank' href='$1'>$1</a>") : a
    },
    configureLayerNode: function(a, b) {
        b.uiProvider = this.treeNodeUI;
        var d = b.layer,
        e = b.layerStore;
        if (d && e) {
            var g = e.getAt(e.findBy(function(a) {
                return a.getLayer() === d
            }));
            if (g) {
                if (!g.get("queryable")) b.iconCls = "gxp-tree-rasterlayer-icon";
                if (g.get("fixed")) b.allowDrag = !1;
                if (g.get("disabled")) b.disabled = !0,
                b.autoDisable = !1;
                b.listeners = {
                    rendernode: function(a) {
                        g === this.target.selectedLayer && a.select();
                        this.target.on("layerselectionchange",
                        function(b) { ! this.selectionChanging && b === g && a.select()
                        },
                        this)
                    },
                    scope: this
                }
            }
        }
    },
    handleBeforeSelect: function(a, b) {
        var d = !0,
        e = b && b.layer,
        g;
        if (e) d = b.layerStore,
        g = d.getAt(d.findBy(function(a) {
            return a.getLayer() === e
        }));
        this.selectionChanging = !0;
        d = this.target.selectLayer(g);
        this.selectionChanging = !1;
        return d
    },
    handleTreeContextMenu: function(a, b) {
        if (a) {
            a.select();
            var d = a.getOwnerTree();
            if (d.getSelectionModel().getSelectedNode() === a) d = d.contextMenu,
            d.contextNode = a,
            d.items.eachKey(function(b, d) {
                d.folderAction != (a.layer ? void 0 : !0) ? d.hide() : d.show();
                if (d.folderAction) d.selectedNode = a
            }),
            0 < d.items.getCount() && d.showAt(b.getXY())
        }
        this.tooltip && this.tooltip.hide()
    },
    handleBeforeMoveNode: function(a, b, d, e) {
        if (b.layer && d !== e && e.loader) a = e.loader.store,
        d = a.findBy(function(a) {
            return a.getLayer() === b.layer
        }),
        a.getAt(d).set("group", e.attributes.group)
    },
    handleBeforeNodeDrop: function(a) {
        if ("gxp-folder" == a.data.node.attributes.iconCls) {
            if ("gxp-folder" != a.target.attributes.iconCls) a.target = a.target.parentNode;
            return "gxp-folder" == a.target.attributes.iconCls && "above" == a.point || "background" != a.target.text && "gxp-folder" == a.target.attributes.iconCls && "below" == a.point ? !0 : !1
        }
        return "background" == a.target.parentNode.attributes.group || "layertree_overlay_root" == a.target.parentNode.id && "append" != a.point ? !1 : !0
    },
    handleMoveNode: function(a, b) {
        var d = this.target.mapPanel.layers,
        e = 0,
        g = d.getCount() - 1;
        b.isLeaf() || this.overlayRoot.cascade(function(a) {
            if (a.isLeaf() && a.layer) {
                var b = a.layer,
                a = a.layerStore,
                m = a.findBy(function(a) {
                    return a.getLayer() === b
                });
                record = a.getAt(m);
                if (!0 == record.getLayer().displayInLayerSwitcher && "background" != record.get("group") && record.get("order") !== e) {
                    record.set("order", e);
                    try {
                        d.remove(record),
                        d.insert(g - e, [record])
                    } catch(n) {
                        console && console.log(n)
                    }
                }
                e++
            }
        })
    },
    onTreeMouseover: function(a, b) {
        var d = Ext.fly(b).up("div.x-tree-node-el");
        if (d && (d = d.getAttributeNS("ext", "tree-node-id"))) {
            var e = this.tree.getNodeById(d);
            if (e.layerStore) {
                var g = this.replaceURLWithHTMLLinks(e.layerStore.getByLayer(e.layer).get("abstract")),
                j = Ext.fly(b).up("div.gxp-layermanager-tree");
                this.tooltip && g ? (this.tooltip.initTarget(e), this.tooltip.update(g)) : g ? this.tooltip = new Ext.ToolTip({
                    id: "layer_tooltip",
                    target: e,
                    autoHeight: !0,
                    dismissDelay: 0,
                    boxMaxHeight: 500,
                    maxWidth: 500,
                    autoScroll: !0,
                    html: g
                }) : this.tooltip && this.tooltip.hide();
                if (this.tooltip && (this.tooltip.on("show",
                function() {
                    var a, b = this;
                    j.on("mouseleave",
                    function() {
                        a = window.setTimeout(function() {
                            b.hide()
                        },
                        500)
                    });
                    b.getEl().on("mouseleave",
                    function() {
                        a && (a = window.setTimeout(function() {
                            b.hide()
                        },
                        500))
                    });
                    b.getEl().on("mouseenter",
                    function() {
                        window.clearTimeout(a)
                    })
                }), g)) this.tooltip.showAt([j.dom.offsetWidth, a.xy[1]]),
                this.tooltip.getHeight() > this.tooltip.boxMaxHeight ? (this.tooltip.autoHeight = !1, this.tooltip.setHeight(this.tooltip.boxMaxHeight)) : this.tooltip.autoHeight = !0
            }
            this.tree.fireEvent("mouseover", this.tree.getNodeById(d), a)
        }
    }
});
Ext.preg(gxp.plugins.LayerTree.prototype.ptype, gxp.plugins.LayerTree);
Ext.data.Store.prototype.move = function(a, b) {
    this.data.remove(a);
    this.data.insert(b, a);
    this.fireEvent("load", this, b)
};
Ext.namespace("gxp.plugins");
gxp.plugins.LayerManager = Ext.extend(gxp.plugins.LayerTree, {
    ptype: "gxp_layermanager",
    baseNodeText: "Base Maps",
    createOutputConfig: function() {
        var a = gxp.plugins.LayerManager.superclass.createOutputConfig.apply(this, arguments);
        Ext.applyIf(a, Ext.apply({
            cls: "gxp-layermanager-tree",
            lines: !1,
            useArrows: !0,
            plugins: [{
                ptype: "gx_treenodecomponent"
            }]
        },
        this.treeConfig));
        return a
    },
    configureLayerNode: function(a, b) {
        gxp.plugins.LayerManager.superclass.configureLayerNode.apply(this, arguments);
        var d;
        OpenLayers.Layer.WMS && b.layer instanceof OpenLayers.Layer.WMS && (d = "gx_wmslegend");
        d && Ext.apply(b, {
            component: {
                xtype: d,
                baseParams: {
                    transparent: !0,
                    format: "image/png",
                    legend_options: "fontAntiAliasing:true;fontSize:11;fontName:Arial"
                },
                layerRecord: this.target.mapPanel.layers.getByLayer(b.layer),
                showTitle: !1,
                cls: "legend"
            }
        })
    }
});
Ext.preg(gxp.plugins.LayerManager.prototype.ptype, gxp.plugins.LayerManager);
Ext.namespace("gxp.plugins");
gxp.plugins.ZoomToLayerExtent = Ext.extend(gxp.plugins.ZoomToExtent, {
    ptype: "gxp_zoomtolayerextent",
    menuText: "Zoom to layer extent",
    tooltip: "Zoom to layer extent",
    iconCls: "gxp-icon-zoom-to",
    destroy: function() {
        this.selectedRecord = null;
        gxp.plugins.ZoomToLayerExtent.superclass.destroy.apply(this, arguments)
    },
    extent: function() {
        var a = this.selectedRecord.getLayer(),
        b;
        OpenLayers.Layer.Vector && (b = a instanceof OpenLayers.Layer.Vector && a.getDataExtent());
        return a.restrictedExtent || b || a.maxExtent || map.maxExtent
    },
    addActions: function() {
        var a = gxp.plugins.ZoomToLayerExtent.superclass.addActions.apply(this, arguments);
        a[0].disable();
        this.target.on("layerselectionchange",
        function(b) {
            this.selectedRecord = b;
            a[0].setDisabled(!b || !b.get("layer"))
        },
        this);
        return a
    }
});
Ext.preg(gxp.plugins.ZoomToLayerExtent.prototype.ptype, gxp.plugins.ZoomToLayerExtent);
Ext.namespace("gxp.plugins");
gxp.plugins.LayerProperties = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_layerproperties",
    menuText: "Layer Properties",
    toolTip: "Layer Properties",
    constructor: function(a) {
        gxp.plugins.LayerProperties.superclass.constructor.apply(this, arguments);
        if (!this.outputConfig) this.outputConfig = {
            width: 325,
            autoHeight: !0
        }
    },
    addActions: function() {
        var a = gxp.plugins.LayerProperties.superclass.addActions.apply(this, [{
            menuText: this.menuText,
            iconCls: "gxp-icon-layerproperties",
            disabled: !0,
            tooltip: this.toolTip,
            handler: function() {
                this.removeOutput();
                this.addOutput()
            },
            scope: this
        }]),
        b = a[0];
        this.target.on("layerselectionchange",
        function(a) {
            b.setDisabled(!a || !a.get("properties"))
        },
        this);
        return a
    },
    addOutput: function(a) {
        var a = a || {},
        b = this.target.selectedLayer;
        this.outputConfig.title = (this.initialConfig.outputConfig || {}).title || this.menuText + ": " + b.get("title");
        this.outputConfig.shortTitle = b.get("title");
        var d = b.get("properties") || "gxp_layerpanel",
        e = this.layerPanelConfig;
        e && e[d] && Ext.apply(a, e[d]);
        return gxp.plugins.LayerProperties.superclass.addOutput.call(this, Ext.apply({
            xtype: d,
            authorized: this.target.isAuthorized(),
            layerRecord: b,
            source: this.target.getSource(b),
            defaults: {
                style: "padding: 10px",
                autoHeight: this.outputConfig.autoHeight
            },
            listeners: {
                added: function(a) {
                    if (!this.outputTarget) a.on("afterrender",
                    function() {
                        a.ownerCt.ownerCt.center()
                    },
                    this, {
                        single: !0
                    })
                },
                scope: this
            }
        },
        a))
    }
});
Ext.preg(gxp.plugins.LayerProperties.prototype.ptype, gxp.plugins.LayerProperties);
Ext.namespace("gxp");
gxp.RulePanel = Ext.extend(Ext.TabPanel, {
    fonts: void 0,
    symbolType: "Point",
    rule: null,
    attributes: null,
    nestedFilters: !0,
    minScaleDenominatorLimit: 1.577757414193268E9 * Math.pow(0.5, 19) * OpenLayers.DOTS_PER_INCH / 256,
    maxScaleDenominatorLimit: 1.577757414193268E9 * OpenLayers.DOTS_PER_INCH / 256,
    scaleLevels: 20,
    scaleSliderTemplate: "{scaleType} Scale 1:{scale}",
    modifyScaleTipContext: Ext.emptyFn,
    labelFeaturesText: "Label Features",
    labelsText: "Labels",
    basicText: "Basic",
    advancedText: "Advanced",
    limitByScaleText: "Limit by scale",
    limitByConditionText: "Limit by condition",
    symbolText: "Symbol",
    nameText: "Name",
    initComponent: function() {
        Ext.applyIf(this, {
            plain: !0,
            border: !1
        });
        if (this.rule) {
            if (!this.initialConfig.symbolType) this.symbolType = this.getSymbolTypeFromRule(this.rule) || this.symbolType
        } else this.rule = new OpenLayers.Rule({
            name: this.uniqueRuleName()
        });
        this.activeTab = 0;
        this.textSymbolizer = new gxp.TextSymbolizer({
            symbolizer: this.getTextSymbolizer(),
            attributes: this.attributes,
            fonts: this.fonts,
            listeners: {
                change: function() {
                    this.fireEvent("change", this, this.rule)
                },
                scope: this
            }
        });
        this.scaleLimitPanel = new gxp.ScaleLimitPanel({
            maxScaleDenominator: this.rule.maxScaleDenominator || void 0,
            limitMaxScaleDenominator: !!this.rule.maxScaleDenominator,
            maxScaleDenominatorLimit: this.maxScaleDenominatorLimit,
            minScaleDenominator: this.rule.minScaleDenominator || void 0,
            limitMinScaleDenominator: !!this.rule.minScaleDenominator,
            minScaleDenominatorLimit: this.minScaleDenominatorLimit,
            scaleLevels: this.scaleLevels,
            scaleSliderTemplate: this.scaleSliderTemplate,
            modifyScaleTipContext: this.modifyScaleTipContext,
            listeners: {
                change: function(a, b, d) {
                    this.rule.minScaleDenominator = b;
                    this.rule.maxScaleDenominator = d;
                    this.fireEvent("change", this, this.rule)
                },
                scope: this
            }
        });
        this.filterBuilder = new gxp.FilterBuilder({
            allowGroups: this.nestedFilters,
            filter: this.rule && this.rule.filter && this.rule.filter.clone(),
            attributes: this.attributes,
            listeners: {
                change: function(a) {
                    this.rule.filter = a.getFilter();
                    this.fireEvent("change", this, this.rule)
                },
                scope: this
            }
        });
        this.items = [{
            title: this.labelsText,
            autoScroll: !0,
            bodyStyle: {
                padding: "10px"
            },
            items: [{
                xtype: "fieldset",
                title: this.labelFeaturesText,
                autoHeight: !0,
                checkboxToggle: !0,
                collapsed: !this.hasTextSymbolizer(),
                items: [this.textSymbolizer],
                listeners: {
                    collapse: function() {
                        OpenLayers.Util.removeItem(this.rule.symbolizers, this.getTextSymbolizer());
                        this.fireEvent("change", this, this.rule)
                    },
                    expand: function() {
                        this.setTextSymbolizer(this.textSymbolizer.symbolizer);
                        this.fireEvent("change", this, this.rule)
                    },
                    scope: this
                }
            }]
        }];
        if (this.getSymbolTypeFromRule(this.rule) || this.symbolType) this.items = [{
            title: this.basicText,
            autoScroll: !0,
            items: [this.createHeaderPanel(), this.createSymbolizerPanel(), this.createClassificationPanel()]
        },
        this.items[0], {
            title: this.advancedText,
            defaults: {
                style: {
                    margin: "7px"
                }
            },
            autoScroll: !0,
            items: [{
                xtype: "fieldset",
                title: this.limitByScaleText,
                checkboxToggle: !0,
                collapsed: !(this.rule && (this.rule.minScaleDenominator || this.rule.maxScaleDenominator)),
                autoHeight: !0,
                items: [this.scaleLimitPanel],
                listeners: {
                    collapse: function() {
                        delete this.rule.minScaleDenominator;
                        delete this.rule.maxScaleDenominator;
                        this.fireEvent("change", this, this.rule)
                    },
                    expand: function() {
                        var a = this.getActiveTab();
                        this.activeTab = null;
                        this.setActiveTab(a);
                        a = !1;
                        if (this.scaleLimitPanel.limitMinScaleDenominator) this.rule.minScaleDenominator = this.scaleLimitPanel.minScaleDenominator,
                        a = !0;
                        if (this.scaleLimitPanel.limitMaxScaleDenominator) this.rule.maxScaleDenominator = this.scaleLimitPanel.maxScaleDenominator,
                        a = !0;
                        a && this.fireEvent("change", this, this.rule)
                    },
                    scope: this
                }
            },
            {
                xtype: "fieldset",
                title: this.limitByConditionText,
                checkboxToggle: !0,
                hidden: this.classifyEnabled,
                collapsed: !(this.rule && this.rule.filter),
                autoHeight: !0,
                items: [this.filterBuilder],
                listeners: {
                    collapse: function() {
                        delete this.rule.filter;
                        this.fireEvent("change", this, this.rule)
                    },
                    expand: function() {
                        this.rule.filter = this.filterBuilder.getFilter();
                        this.fireEvent("change", this, this.rule)
                    },
                    scope: this
                }
            }]
        }];
        this.items[0].autoHeight = !0;
        this.addEvents("change");
        this.on({
            tabchange: function(a, b) {
                b.doLayout()
            },
            afterRender: function() {
                this.classifyEnabled && Ext.getCmp(Ext.get(this.items.items[0].items.items[1].id).child("[name=color]").id).setVisible(!1)
            },
            scope: this
        });
        gxp.RulePanel.superclass.initComponent.call(this)
    },
    hasTextSymbolizer: function() {
        for (var a, b, d = 0,
        e = this.rule.symbolizers.length; d < e; ++d) if (a = this.rule.symbolizers[d], a instanceof OpenLayers.Symbolizer.Text) {
            b = a;
            break
        }
        return b
    },
    getTextSymbolizer: function() {
        var a = this.hasTextSymbolizer();
        if (!a && (a = new OpenLayers.Symbolizer.Text({
            graphic: !1
        }), this.fonts)) a.fontFamily = this.fonts[0];
        return a
    },
    setTextSymbolizer: function(a) {
        for (var b, d = 0,
        e = this.rule.symbolizers.length; d < e; ++d) if (candidate = this.rule.symbolizers[d], this.rule.symbolizers[d] instanceof OpenLayers.Symbolizer.Text) {
            this.rule.symbolizers[d] = a;
            b = !0;
            break
        }
        b || this.rule.symbolizers.push(a)
    },
    uniqueRuleName: function() {
        return OpenLayers.Util.createUniqueID("rule_")
    },
    createHeaderPanel: function() {
        this.symbolizerSwatch = new GeoExt.FeatureRenderer({
            symbolType: this.symbolType,
            isFormField: !0,
            fieldLabel: this.symbolText
        });
        return {
            xtype: "form",
            border: !1,
            labelAlign: "top",
            defaults: {
                border: !1
            },
            style: {
                padding: "0.3em 0 0 1em"
            },
            items: [{
                layout: "column",
                defaults: {
                    border: !1,
                    style: {
                        "padding-right": "1em"
                    }
                },
                items: [{
                    layout: "form",
                    width: 150,
                    items: [{
                        xtype: "textfield",
                        hidden: this.classifyEnabled,
                        fieldLabel: this.nameText,
                        anchor: "95%",
                        value: this.rule && (this.rule.title || this.rule.name || ""),
                        listeners: {
                            change: function(a, b) {
                                this.rule.title = b;
                                this.fireEvent("change", this, this.rule)
                            },
                            scope: this
                        }
                    }]
                },
                {
                    layout: "form",
                    width: 70,
                    items: [this.symbolizerSwatch]
                }]
            }]
        }
    },
    createSymbolizerPanel: function() {
        var a, b, d = OpenLayers.Symbolizer[this.symbolType],
        e = !1;
        if (d) {
            for (var g = 0,
            j = this.rule.symbolizers.length; g < j; ++g) if (a = this.rule.symbolizers[g], a instanceof d) {
                e = !0;
                b = a;
                break
            }
            b || (b = new d({
                fill: !1,
                stroke: !1
            }))
        } else throw Error("Appropriate symbolizer type not included in build: " + this.symbolType);
        this.symbolizerSwatch.setSymbolizers([b], {
            draw: this.symbolizerSwatch.rendered
        });
        a = {
            xtype: "gxp_" + this.symbolType.toLowerCase() + "symbolizer",
            symbolizer: b,
            bodyStyle: {
                padding: "10px"
            },
            border: !1,
            labelWidth: 70,
            defaults: {
                labelWidth: 70
            },
            listeners: {
                change: function(a) {
                    this.symbolizerSwatch.setSymbolizers([a], {
                        draw: this.symbolizerSwatch.rendered
                    });
                    e || (this.rule.symbolizers.push(a), e = !0);
                    this.fireEvent("change", this, this.rule)
                },
                scope: this
            }
        };
        if ("Point" === this.symbolType && this.pointGraphics) a.pointGraphics = this.pointGraphics;
        return a
    },
    createClassificationPanel: function() {
        this.classifyEnabled && (this.rule.classify = !0);
        return new gxp.ClassificationPanel({
            bodyStyle: {
                padding: "10px"
            },
            border: !1,
            labelWidth: 70,
            defaults: {
                labelWidth: 70
            },
            hidden: !this.classifyEnabled,
            rulePanel: this
        })
    },
    getSymbolTypeFromRule: function(a) {
        for (var b, d, e = 0,
        g = a.symbolizers.length; e < g; ++e) if (b = a.symbolizers[e], !(b instanceof OpenLayers.Symbolizer.Text)) {
            d = b.CLASS_NAME.split(".").pop();
            break
        }
        return d
    }
});
Ext.reg("gxp_rulepanel", gxp.RulePanel);
Ext.namespace("gxp");
gxp.StylePropertiesDialog = Ext.extend(Ext.Container, {
    titleText: "General",
    nameFieldText: "Name",
    titleFieldText: "Title",
    abstractFieldText: "Abstract",
    userStyle: null,
    initComponent: function() {
        Ext.applyIf(this, {
            layout: "form",
            items: [{
                xtype: "fieldset",
                title: this.titleText,
                labelWidth: 75,
                defaults: {
                    xtype: "textfield",
                    anchor: "100%",
                    listeners: {
                        change: function(a, b) {
                            this.userStyle[a.name] = b;
                            this.fireEvent("change", this, this.userStyle)
                        },
                        scope: this
                    }
                },
                items: [{
                    xtype: this.initialConfig.nameEditable ? "textfield": "displayfield",
                    fieldLabel: this.nameFieldText,
                    name: "name",
                    value: this.userStyle.name,
                    maskRe: /[A-Za-z0-9_]/
                },
                {
                    fieldLabel: this.titleFieldText,
                    name: "title",
                    value: this.userStyle.title
                },
                {
                    xtype: "textarea",
                    fieldLabel: this.abstractFieldText,
                    name: "description",
                    value: this.userStyle.description
                }]
            }]
        });
        this.addEvents("change");
        gxp.StylePropertiesDialog.superclass.initComponent.apply(this, arguments)
    }
});
Ext.reg("gxp_stylepropertiesdialog", gxp.StylePropertiesDialog);
OpenLayers.Format.Filter.v1_1_0.prototype.readers.ogc.Literal = function(a, b) {
    b.value = this.getChildValue(a)
};
Ext.namespace("gxp");
gxp.WMSStylesDialog = Ext.extend(Ext.Container, {
    addStyleText: "Add",
    addStyleTip: "Add a new style",
    chooseStyleText: "Choose style",
    classifyStyleText: "Classify",
    classifyStyleTip: "Classify the layer based on attributes",
    deleteStyleText: "Remove",
    deleteStyleTip: "Delete the selected style",
    editStyleText: "Edit",
    editStyleTip: "Edit the selected style",
    duplicateStyleText: "Duplicate",
    duplicateStyleTip: "Duplicate the selected style",
    addRuleText: "Add",
    addRuleTip: "Add a new rule",
    newRuleText: "New Rule",
    deleteRuleText: "Remove",
    deleteRuleTip: "Delete the selected rule",
    editRuleText: "Edit",
    editRuleTip: "Edit the selected rule",
    duplicateRuleText: "Duplicate",
    duplicateRuleTip: "Duplicate the selected rule",
    cancelText: "Cancel",
    saveText: "Save",
    styleWindowTitle: "User Style: {0}",
    ruleWindowTitle: "Style Rule: {0}",
    stylesFieldsetTitle: "Styles",
    rulesFieldsetTitle: "Rules",
    layerRecord: null,
    layerDescription: null,
    symbolType: null,
    fonts: null,
    stylesStore: null,
    selectedStyle: null,
    selectedRule: null,
    editable: !0,
    modified: !1,
    dialogCls: Ext.Window,
    classifyEnabled: !1,
    initComponent: function() {
        this.addEvents("ready", "modified", "styleselected", "beforesaved", "saved");
        Ext.applyIf(this, {
            layout: "form",
            disabled: !0,
            items: [{
                xtype: "fieldset",
                title: this.stylesFieldsetTitle,
                labelWidth: 85,
                style: "margin-bottom: 0;"
            },
            {
                xtype: "toolbar",
                style: "border-width: 0 1px 1px 1px; margin-bottom: 10px;",
                items: [{
                    xtype: "button",
                    iconCls: "add",
                    text: this.addStyleText,
                    tooltip: this.addStyleTip,
                    handler: this.addStyle,
                    scope: this
                },
                {
                    xtype: "button",
                    iconCls: "delete",
                    text: this.deleteStyleText,
                    tooltip: this.deleteStyleTip,
                    handler: function() {
                        this.stylesStore.remove(this.selectedStyle)
                    },
                    scope: this
                },
                {
                    xtype: "button",
                    iconCls: "edit",
                    text: this.editStyleText,
                    tooltip: this.editStyleTip,
                    handler: function() {
                        this.editStyle()
                    },
                    scope: this
                },
                {
                    xtype: "button",
                    iconCls: "duplicate",
                    text: this.duplicateStyleText,
                    tooltip: this.duplicateStyleTip,
                    handler: function() {
                        var a = this.selectedStyle,
                        b = a.get("userStyle").clone();
                        b.isDefault = !1;
                        b.name = this.newStyleName();
                        var d = this.stylesStore;
                        d.add(new d.recordType({
                            name: b.name,
                            title: b.title,
                            "abstract": b.description,
                            userStyle: b
                        }));
                        this.editStyle(a)
                    },
                    scope: this
                }]
            }]
        });
        this.createStylesStore();
        this.on({
            beforesaved: function() {
                this._saving = !0
            },
            saved: function() {
                delete this._saving
            },
            render: function() {
                gxp.util.dispatch([this.getStyles],
                function() {
                    this.enable()
                },
                this)
            },
            scope: this
        });
        gxp.WMSStylesDialog.superclass.initComponent.apply(this, arguments)
    },
    addStyle: function() {
        if (this._ready) {
            var a = this.selectedStyle,
            b = this.stylesStore,
            d = new OpenLayers.Style(null, {
                name: this.newStyleName(),
                rules: [this.createRule()]
            });
            b.add(new b.recordType({
                name: d.name,
                userStyle: d
            }));
            this.editStyle(a)
        } else this.on("ready", this.addStyle, this)
    },
    editStyle: function(a) {
        var b = this.selectedStyle.get("userStyle"),
        d = new this.dialogCls(Ext.apply({
            bbar: ["->", {
                text: this.cancelText,
                iconCls: "cancel",
                handler: function() {
                    d.propertiesDialog.userStyle = b;
                    d.destroy();
                    if (a) this._cancelling = !0,
                    this.stylesStore.remove(this.selectedStyle),
                    this.changeStyle(a, {
                        updateCombo: !0,
                        markModified: !0
                    }),
                    delete this._cancelling
                },
                scope: this
            },
            {
                text: this.saveText,
                iconCls: "save",
                handler: function() {
                    d.destroy()
                },
                scope: this
            }]
        },
        {
            title: String.format(this.styleWindowTitle, b.title || b.name),
            shortTitle: b.title || b.name,
            bodyBorder: !1,
            autoHeight: !0,
            width: 300,
            modal: !0,
            items: {
                border: !1,
                items: {
                    xtype: "gxp_stylepropertiesdialog",
                    ref: "../propertiesDialog",
                    userStyle: b.clone(),
                    nameEditable: !1,
                    style: "padding: 10px;",
                    classifyEnabled: this.classifyEnabled && !this.isRaster && this.editable
                }
            },
            listeners: {
                beforedestroy: function() {
                    this.selectedStyle.set("userStyle", d.propertiesDialog.userStyle)
                },
                scope: this
            }
        }));
        this.showDlg(d)
    },
    classifyStyleRules: function() {
        for (var a = this.selectedStyle.get("userStyle"), b = a.rules[0], d = [], e = 0; e < a.rules.length; e++) d[e] = a.rules[e].clone();
        var g = new this.dialogCls({
            title: String.format(this.ruleWindowTitle, b.title || b.name || this.newRuleText),
            shortTitle: b.title || b.name || this.newRuleText,
            layout: "fit",
            width: 320,
            height: 450,
            modal: !0,
            items: [{
                xtype: "gxp_rulepanel",
                ref: "rulePanel",
                symbolType: this.symbolType,
                rule: b,
                fonts: this.fonts,
                classifyEnabled: !0,
                attributes: new GeoExt.data.AttributeStore({
                    url: this.layerDescription.owsURL,
                    baseParams: {
                        SERVICE: this.layerDescription.owsType,
                        REQUEST: "DescribeFeatureType",
                        TYPENAME: this.layerDescription.typeName
                    },
                    method: "GET",
                    disableCaching: !1
                }),
                autoScroll: !0,
                border: !1,
                defaults: {
                    autoHeight: !0,
                    hideMode: "offsets"
                },
                listeners: {
                    change: this.classifyRules,
                    tabchange: function() {
                        g instanceof Ext.Window && g.syncShadow()
                    },
                    scope: this
                }
            }],
            bbar: ["->", {
                text: this.cancelText,
                iconCls: "cancel",
                handler: function() {
                    a.rules = d;
                    this.afterRuleChange();
                    this.selectedStyle.set("userStyle", a);
                    g.destroy()
                },
                scope: this
            },
            {
                text: this.saveText,
                iconCls: "save",
                handler: function() {
                    g.destroy()
                }
            }]
        });
        this.showDlg(g)
    },
    createSLD: function(a) {
        var a = a || {},
        b = {
            version: "1.0.0",
            namedLayers: {}
        },
        d = this.layerRecord.get("name");
        b.namedLayers[d] = {
            name: d,
            userStyles: []
        };
        this.stylesStore.each(function(e) { (!a.userStyles || -1 !== a.userStyles.indexOf(e.get("name"))) && b.namedLayers[d].userStyles.push(e.get("userStyle"))
        });
        return (new OpenLayers.Format.SLD({
            multipleSymbolizers: !0,
            profile: "GeoServer"
        })).write(b)
    },
    saveStyles: function(a) { ! 0 === this.modified && this.fireEvent("beforesaved", this, a)
    },
    updateStyleRemoveButton: function() {
        var a = this.selectedStyle && this.selectedStyle.get("userStyle");
        this.items.get(1).items.get(1).setDisabled(!a || 1 >= this.stylesStore.getCount() || !0 === a.isDefault)
    },
    updateRuleRemoveButton: function() {
        this.items.get(3).items.get(1).setDisabled(!this.selectedRule)
    },
    createRule: function() {
        return new OpenLayers.Rule({
            symbolizers: [new OpenLayers.Symbolizer[this.symbolType]]
        })
    },
    addRulesFieldSet: function() {
        var a = new Ext.form.FieldSet({
            itemId: "rulesfieldset",
            id: "rulesfieldset",
            title: this.rulesFieldsetTitle,
            autoScroll: !0,
            style: "margin-bottom: 0;",
            hideMode: "offsets",
            hidden: !0
        }),
        b = new Ext.Toolbar({
            style: "border-width: 0 1px 1px 1px;",
            hidden: !0,
            items: [{
                xtype: "button",
                iconCls: "add",
                text: this.addRuleText,
                tooltip: this.addRuleTip,
                handler: this.addRule,
                scope: this
            },
            {
                xtype: "button",
                iconCls: "delete",
                text: this.deleteRuleText,
                tooltip: this.deleteRuleTip,
                handler: this.removeRule,
                scope: this,
                disabled: !0
            },
            {
                xtype: "button",
                iconCls: "edit",
                text: this.editRuleText,
                toolitp: this.editRuleTip,
                handler: function() {
                    this.layerDescription ? this.editRule() : this.describeLayer(this.editRule)
                },
                scope: this,
                disabled: !0
            },
            {
                xtype: "button",
                iconCls: "duplicate",
                text: this.duplicateRuleText,
                tip: this.duplicateRuleTip,
                handler: this.duplicateRule,
                scope: this,
                disabled: !0
            }]
        });
        this.add(a, b);
        this.doLayout();
        this.rulesFieldSet = a;
        this.rulesToolbar = b;
        return a
    },
    addRule: function() {
        var a = this.rulesFieldSet.items.get(0);
        this.selectedStyle.get("userStyle").rules.push(this.createRule());
        a.update();
        this.selectedStyle.store.afterEdit(this.selectedStyle);
        this.updateRuleRemoveButton()
    },
    removeRule: function() {
        this.selectedStyle.get("userStyle").rules.remove(this.selectedRule);
        this.afterRuleChange()
    },
    duplicateRule: function() {
        var a = this.rulesFieldSet.items.get(0),
        b = this.selectedRule.clone();
        this.selectedStyle.get("userStyle").rules.push(b);
        a.update();
        this.selectedStyle.store.afterEdit(this.selectedStyle);
        this.updateRuleRemoveButton()
    },
    editRule: function() {
        var a = this.selectedRule,
        b = a.clone(),
        d = new this.dialogCls({
            title: String.format(this.ruleWindowTitle, a.title || a.name || this.newRuleText),
            shortTitle: a.title || a.name || this.newRuleText,
            layout: "fit",
            width: 320,
            height: 450,
            modal: !0,
            items: [{
                xtype: "gxp_rulepanel",
                ref: "rulePanel",
                symbolType: this.symbolType,
                rule: a,
                fonts: this.fonts,
                attributes: new GeoExt.data.AttributeStore({
                    url: this.layerDescription.owsURL,
                    baseParams: {
                        SERVICE: this.layerDescription.owsType,
                        REQUEST: "DescribeFeatureType",
                        TYPENAME: this.layerDescription.typeName
                    },
                    method: "GET",
                    disableCaching: !1
                }),
                autoScroll: !0,
                border: !1,
                defaults: {
                    autoHeight: !0,
                    hideMode: "offsets"
                },
                listeners: {
                    change: this.saveRule,
                    tabchange: function() {
                        d instanceof Ext.Window && d.syncShadow()
                    },
                    scope: this
                }
            }],
            bbar: ["->", {
                text: this.cancelText,
                iconCls: "cancel",
                handler: function() {
                    this.saveRule(d.rulePanel, b);
                    d.destroy()
                },
                scope: this
            },
            {
                text: this.saveText,
                iconCls: "save",
                handler: function() {
                    d.destroy()
                }
            }]
        });
        this.showDlg(d)
    },
    classifyRules: function(a, b) {
        var d = this.selectedStyle.get("userStyle"),
        e = this.layerRecord.getLayer(),
        g = this.layerRecord.get("restUrl");
        g || (g = e.url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest"));
        b.attribute && b.method && b.intervals && b.ramp && ("Custom" == b.ramp ? b.color_start && b.color_end: 1) && Ext.Ajax.request({
            url: g + "/sldservice/" + e.params.LAYERS + "/classify.xml",
            params: {
                attribute: b.attribute,
                method: b.method,
                intervals: b.intervals,
                ramp: b.ramp,
                startColor: b.color_start,
                endColor: b.color_end,
                reverse: b.reverse
            },
            method: "GET",
            disableCaching: !1,
            success: function(a) {
                for (var e = [], g = new OpenLayers.Format.Filter.v1_1_0, n = new OpenLayers.Format.XML, a = n.getElementsByTagNameNS(n.read(a.responseText).documentElement, "*", "Rule"), o = 0; o < a.length; o++) {
                    var q = b.clone(),
                    s = n.getElementsByTagNameNS(a[o], "*", "Title")[0];
                    q.title = s.textContent || s.text;
                    s = n.getElementsByTagNameNS(a[o], "*", "CssParameter")[0];
                    "fill" === s.attributes.getNamedItem("name").value ? q.symbolizers[0].fillColor = s.textContent || s.text: q.symbolizers[0].strokeColor = s.textContent || s.text;
                    q.filter = g.read(n.getElementsByTagNameNS(a[o], "*", "Filter")[0]);
                    e.push(q);
                    this.afterRuleChange(q)
                }
                d.rules = e
            },
            failure: function() {},
            callback: null,
            scope: this
        })
    },
    saveRule: function(a, b) {
        var d = this.selectedStyle;
        this.rulesFieldSet.items.get(0);
        var d = d.get("userStyle"),
        e = d.rules.indexOf(this.selectedRule);
        d.rules[e] = b;
        this.afterRuleChange(b)
    },
    afterRuleChange: function(a) {
        this.rulesFieldSet.items.get(0);
        this.selectedRule = a;
        this.selectedStyle.store.afterEdit(this.selectedStyle)
    },
    setRulesFieldSetVisible: function(a) {
        this.items.get(3).setVisible(a && this.editable);
        this.rulesFieldSet.setVisible(a);
        this.doLayout()
    },
    parseSLD: function(a) {
        var b = a.responseXML;
        if (!b || !b.documentElement) b = (new OpenLayers.Format.XML).read(a.responseText);
        var a = this.layerRecord.getLayer().params,
        d = this.initialConfig.styleName || a.STYLES;
        if (d) this.selectedStyle = this.stylesStore.getAt(this.stylesStore.findExact("name", d));
        var e = new OpenLayers.Format.SLD({
            profile: "GeoServer",
            multipleSymbolizers: !0
        });
        try {
            var g = e.read(b).namedLayers[a.LAYERS].userStyles,
            j;
            if (a.SLD_BODY) j = e.read(a.SLD_BODY).namedLayers[a.LAYERS].userStyles,
            Array.prototype.push.apply(g, j);
            this.stylesStore.removeAll();
            this.selectedStyle = null;
            for (var k, m, n, b = 0,
            o = g.length; b < o; ++b) if (k = g[b], n = this.stylesStore.findExact("name", k.name), -1 !== n && this.stylesStore.removeAt(n), m = new this.stylesStore.recordType({
                name: k.name,
                title: k.title,
                "abstract": k.description,
                userStyle: k
            }), m.phantom = !1, this.stylesStore.add(m), !this.selectedStyle && (d === k.name || !d && !0 === k.isDefault)) this.selectedStyle = m;
            this.addRulesFieldSet();
            this.createLegend(this.selectedStyle.get("userStyle").rules);
            this.stylesStoreReady();
            a.SLD_BODY && this.markModified();
            this.editable ? this.enableClassification() : this.setupNonEditable()
        } catch(q) {
            this.setupNonEditable()
        }
    },
    createLegend: function(a) {
        var b = OpenLayers.Symbolizer.Raster;
        if (b && a[0] && a[0].symbolizers[0] instanceof b) throw Error("Raster symbolizers are not supported.");
        this.addVectorLegend(a)
    },
    setupNonEditable: function() {
        this.editable = !1;
        this.items.get(1).hide();
        this.doLayout()
    },
    stylesStoreReady: function() {
        this.stylesStore.commitChanges();
        this.stylesStore.on({
            load: function() {
                this.addStylesCombo();
                this.updateStyleRemoveButton()
            },
            add: function(a, b, d) {
                this.updateStyleRemoveButton();
                b = this.items.get(0).items.get(0);
                this.markModified();
                b.fireEvent("select", b, a.getAt(d), d);
                b.setValue(this.selectedStyle.get("name"))
            },
            remove: function(a, b, d) {
                if (!this._cancelling) this._removing = !0,
                b = Math.min(d, a.getCount() - 1),
                this.updateStyleRemoveButton(),
                d = this.items.get(0).items.get(0),
                this.markModified(),
                d.fireEvent("select", d, a.getAt(b), b),
                d.setValue(this.selectedStyle.get("name")),
                delete this._removing
            },
            update: function(a, b) {
                var d = b.get("userStyle");
                Ext.apply(b.data, {
                    name: d.name,
                    title: d.title || d.name,
                    "abstract": d.description
                });
                this.changeStyle(b, {
                    updateCombo: !0,
                    markModified: !0
                })
            },
            scope: this
        });
        this.stylesStore.fireEvent("load", this.stylesStore, this.stylesStore.getRange());
        this._ready = !0;
        this.fireEvent("ready")
    },
    markModified: function() {
        if (!1 === this.modified) this.modified = !0;
        this._saving || this.fireEvent("modified", this, this.selectedStyle.get("name"))
    },
    createStylesStore: function() {
        var a = this.layerRecord.get("styles") || [];
        this.stylesStore = new Ext.data.JsonStore({
            data: {
                styles: a
            },
            idProperty: "name",
            root: "styles",
            fields: ["name", "title", "abstract", "legend", "userStyle"],
            listeners: {
                add: function(a, d) {
                    for (var e, g = d.length - 1; 0 <= g; --g) e = d[g],
                    a.suspendEvents(),
                    e.get("title") || e.set("title", e.get("name")),
                    a.resumeEvents()
                }
            }
        })
    },
    getStyles: function(a) {
        var b = this.layerRecord.getLayer(),
        d = b.params.VERSION;
        1.1 < parseFloat(d) && (d = "1.1.1");
        Ext.Ajax.request({
            url: b.url,
            params: {
                SERVICE: "WMS",
                VERSION: d,
                REQUEST: "GetStyles",
                LAYERS: "" + b.params.LAYERS
            },
            method: "GET",
            disableCaching: !1,
            success: this.parseSLD,
            failure: this.setupNonEditable,
            callback: a,
            scope: this
        })
    },
    enableClassification: function() {
        if (!this.isRaster) {
            var a = this.layerRecord.getLayer(),
            b = this.layerRecord.get("restUrl");
            b || (b = layerRecord.get("restUrl"));
            b || (b = a.url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest"));
            Ext.Ajax.request({
                url: b + "/sldservice/" + a.params.LAYERS + "/attributes.xml",
                method: "GET",
                disableCaching: !1,
                success: function(a) {
                    if (a.responseXML) this.classifyEnabled = !0,
                    this.insert(2, new Ext.Toolbar({
                        style: "border-width: 1px;margin-bottom: 5px;",
                        buttonAlign: "center",
                        items: [{
                            text: this.classifyStyleText,
                            tooltip: this.classifyStyleTip,
                            iconCls: "gradient",
                            handler: function() {
                                this.layerDescription ? this.classifyStyleRules() : this.describeLayer(this.classifyStyleRules)
                            },
                            scope: this
                        }]
                    })),
                    this.doLayout()
                },
                failure: function() {},
                scope: this
            })
        }
    },
    describeLayer: function(a) {
        if (this.layerDescription) window.setTimeout(function() {
            a.call(this)
        },
        0);
        else {
            var b = this.layerRecord.getLayer(),
            d = b.params.VERSION;
            1.1 < parseFloat(d) && (d = "1.1.1");
            Ext.Ajax.request({
                url: b.url,
                params: {
                    SERVICE: "WMS",
                    VERSION: d,
                    REQUEST: "DescribeLayer",
                    LAYERS: "" + b.params.LAYERS
                },
                method: "GET",
                disableCaching: !1,
                success: function(a) {
                    this.layerDescription = (new OpenLayers.Format.WMSDescribeLayer).read(a.responseXML && a.responseXML.documentElement ? a.responseXML: a.responseText)[0]
                },
                callback: a,
                scope: this
            })
        }
    },
    addStylesCombo: function() {
        var a = this.stylesStore,
        a = new Ext.form.ComboBox(Ext.apply({
            fieldLabel: this.chooseStyleText,
            store: a,
            editable: !1,
            displayField: "title",
            valueField: "name",
            value: this.selectedStyle ? this.selectedStyle.get("title") : this.layerRecord.getLayer().params.STYLES || "default",
            disabled: !a.getCount(),
            mode: "local",
            typeAhead: !0,
            triggerAction: "all",
            forceSelection: !0,
            anchor: "100%",
            listeners: {
                select: function(a, d) {
                    this.changeStyle(d); ! d.phantom && !this._removing && this.fireEvent("styleselected", this, d.get("name"))
                },
                scope: this
            }
        },
        this.initialConfig.stylesComboOptions));
        this.items.get(0).add(a);
        this.doLayout()
    },
    createLegendImage: function() {
        var a = new GeoExt.WMSLegend({
            showTitle: !1,
            layerRecord: this.layerRecord,
            autoScroll: !0,
            defaults: {
                listeners: {
                    render: function(b) {
                        b.getEl().on({
                            load: function(d, e) {
                                e.getAttribute("src") != b.defaultImgSrc && (this.setRulesFieldSetVisible(!0), 250 < b.getEl().getHeight() && a.setHeight(250))
                            },
                            error: function() {
                                this.setRulesFieldSetVisible(!1)
                            },
                            scope: this
                        })
                    },
                    scope: this
                }
            }
        });
        return a
    },
    changeStyle: function(a, b) {
        var b = b || {},
        d = this.rulesFieldSet.items.get(0);
        this.selectedStyle = a;
        this.updateStyleRemoveButton();
        a.get("name");
        var e = a.get("userStyle"),
        g = d.rules.indexOf(this.selectedRule);
        d.ownerCt.remove(d);
        this.createLegend(e.rules, {
            selectedRuleIndex: g
        }); ! 0 === b.updateCombo && (this.items.get(0).items.get(0).setValue(e.name), !0 === b.markModified && this.markModified())
    },
    addVectorLegend: function(a, b) {
        b = Ext.applyIf(b || {},
        {
            enableDD: !0
        });
        this.symbolType = b.symbolType;
        if (!this.symbolType) {
            var d = ["Point", "Line", "Polygon"];
            highest = 0;
            for (var e = a[0].symbolizers, g, j = e.length - 1; 0 <= j; j--) g = e[j].CLASS_NAME.split(".").pop(),
            highest = Math.max(highest, d.indexOf(g));
            this.symbolType = d[highest]
        }
        var k = this.rulesFieldSet.add({
            xtype: "gx_vectorlegend",
            showTitle: !1,
            height: 10 < a.length ? 250 : void 0,
            autoScroll: 10 < a.length,
            rules: a,
            symbolType: this.symbolType,
            selectOnClick: !0,
            enableDD: b.enableDD,
            listeners: {
                ruleselected: function(a, b) {
                    this.selectedRule = b;
                    var d = this.rulesToolbar.items;
                    this.updateRuleRemoveButton();
                    d.get(2).enable();
                    d.get(3).enable()
                },
                ruleunselected: function() {
                    this.selectedRule = null;
                    var a = this.rulesToolbar.items;
                    a.get(1).disable();
                    a.get(2).disable();
                    a.get(3).disable()
                },
                rulemoved: function() {
                    this.markModified()
                },
                afterlayout: function() {
                    null !== this.selectedRule && null === k.selectedRule && -1 !== k.rules.indexOf(this.selectedRule) && k.selectRuleEntry(this.selectedRule)
                },
                scope: this
            }
        });
        this.setRulesFieldSetVisible(!0);
        return k
    },
    newStyleName: function() {
        var a = this.layerRecord.get("name");
        return a.split(":").pop() + "_" + gxp.util.md5(a + new Date + Math.random()).substr(0, 8)
    },
    showDlg: function(a) {
        a.show()
    }
});
gxp.WMSStylesDialog.createGeoServerStylerConfig = function(a, b) {
    var d = a.getLayer();
    b || (b = a.get("restUrl"));
    b || (b = d.url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest"));
    return {
        xtype: "gxp_wmsstylesdialog",
        layerRecord: a,
        plugins: [{
            ptype: "gxp_geoserverstylewriter",
            baseUrl: b
        }],
        listeners: {
            styleselected: function(a, b) {
                d.mergeNewParams({
                    styles: b
                })
            },
            modified: function(a) {
                a.saveStyles()
            },
            saved: function(a, b) {
                d.mergeNewParams({
                    _olSalt: Math.random(),
                    styles: b
                })
            },
            scope: this
        }
    }
};
OpenLayers.Renderer.defaultSymbolizer = {
    fillColor: "#808080",
    fillOpacity: 1,
    strokeColor: "#000000",
    strokeOpacity: 1,
    strokeWidth: 1,
    strokeDashstyle: "solid",
    pointRadius: 3,
    graphicName: "square",
    fontColor: "#000000",
    fontSize: 10,
    haloColor: "#FFFFFF",
    haloOpacity: 1,
    haloRadius: 1,
    labelAlign: "cm"
};
Ext.reg("gxp_wmsstylesdialog", gxp.WMSStylesDialog);
Ext.namespace("gxp.plugins");
gxp.plugins.Styler = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_styler",
    menuText: "Styles",
    tooltip: "Manage layer styles",
    roles: ["ROLE_ADMINISTRATOR"],
    sameOriginStyling: !0,
    rasterStyling: !1,
    requireDescribeLayer: !0,
    editable: !1,
    constructor: function(a) {
        gxp.plugins.Styler.superclass.constructor.apply(this, arguments);
        if (!this.outputConfig) this.outputConfig = {
            autoHeight: !0,
            width: 265
        };
        Ext.applyIf(this.outputConfig, {
            closeAction: "close"
        })
    },
    init: function(a) {
        gxp.plugins.Styler.superclass.init.apply(this, arguments);
        this.target.on("authorizationchange", this.enableOrDisable, this)
    },
    destroy: function() {
        this.target.un("authorizationchange", this.enableOrDisable, this);
        gxp.plugins.Styler.superclass.destroy.apply(this, arguments)
    },
    enableOrDisable: function() {
        this.target && null !== this.target.selectedLayer && this.handleLayerChange(this.target.selectedLayer)
    },
    addActions: function() {
        var a = gxp.plugins.Styler.superclass.addActions.apply(this, [{
            menuText: this.menuText,
            iconCls: "gxp-icon-palette",
            disabled: !0,
            tooltip: this.tooltip,
            handler: function() {
                this.target.doAuthorized(this.roles, this.addOutput, this)
            },
            scope: this
        }]);
        this.launchAction = a[0];
        this.target.on({
            layerselectionchange: this.handleLayerChange,
            scope: this
        });
        return a
    },
    handleLayerChange: function(a) {
        this.launchAction.disable();
        if (a && a.get("styles")) {
            var b = this.target.getSource(a);
            b instanceof gxp.plugins.WMSSource && b.describeLayer(a,
            function(b) {
                this.checkIfStyleable(a, b)
            },
            this)
        }
    },
    checkIfStyleable: function(a, b) {
        if (b) {
            var d = ["WFS"]; ! 0 === this.rasterStyling && d.push("WCS")
        }
        if (b ? -1 !== d.indexOf(b.get("owsType")) : !this.requireDescribeLayer) {
            var d = !1,
            d = this.target.layerSources[a.get("source")],
            e;
            e = (e = a.get("restUrl")) ? e + "/styles": d.url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest/styles");
            this.sameOriginStyling ? (d = "/" === e.charAt(0)) && this.enableEditingIfAuthorized(a, e) : this.enableEditingIfAuthorized(a, e)
        }
    },
    enableEditingIfAuthorized: function(a) {
        Ext.Ajax.request({
            method: "PUT",
            url: "/data/" + a.getLayer().params.LAYERS + "/ajax-edit-check",
            callback: function(a, d, e) {
                this.editable = 200 == e.status;
                this.launchAction.enable()
            },
            scope: this
        })
    },
    addOutput: function(a) {
        var a = a || {},
        b = this.target.selectedLayer;
        this.outputConfig.title = (this.initialConfig.outputConfig || {}).title || this.menuText + ": " + b.get("title");
        this.outputConfig.shortTitle = b.get("title");
        Ext.apply(a, gxp.WMSStylesDialog.createGeoServerStylerConfig(b)); ! 0 === this.rasterStyling && a.plugins.push({
            ptype: "gxp_wmsrasterstylesdialog",
            editable: this.editable
        });
        Ext.applyIf(a, {
            style: "padding: 10px",
            editable: this.editable
        });
        var d = gxp.plugins.Styler.superclass.addOutput.call(this, a);
        if (! (d.ownerCt.ownerCt instanceof Ext.Window)) d.dialogCls = Ext.Panel,
        d.showDlg = function(a) {
            a.layout = "fit";
            a.autoHeight = !1;
            d.ownerCt.add(a)
        };
        d.stylesStore.on("load",
        function() { ! this.outputTarget && d.ownerCt.ownerCt instanceof Ext.Window && d.ownerCt.ownerCt.center()
        })
    }
});
Ext.preg(gxp.plugins.Styler.prototype.ptype, gxp.plugins.Styler);
Ext.namespace("gxp.plugins");
gxp.plugins.GeoLocator = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_geolocator",
    maxZoom: 21,
    infoActionTip: "Get My Location",
    locationFailedText: "Location detection failed",
    iconCls: "gxp-icon-geolocate",
    addActions: function() {
        this.popupCache = {};
        var a = this.target.mapPanel.map,
        b = !0,
        d = new OpenLayers.Layer.Vector("vector"),
        e = {
            fillColor: "#000",
            fillOpacity: 0.1,
            strokeWidth: 0
        },
        g = new OpenLayers.Control.Geolocate({
            bind: !1,
            geolocationOptions: {
                enableHighAccuracy: !0,
                maximumAge: 0,
                timeout: 7E3
            }
        }),
        j = this.maxZoom,
        k = function(a) {
            var b = a.geometry.getCentroid(),
            e = a.geometry.getBounds(),
            g = Math.abs((e.right - e.left) / 2),
            j = 0,
            k = "up";
            window.resizeInterval = window.setInterval(function() {
                16 < j && clearInterval(window.resizeInterval);
                var e = 0.03 * g / g;
                switch (j) {
                case 4:
                case 12:
                    k = "down";
                    break;
                case 8:
                    k = "up"
                }
                "up" !== k && (e = -Math.abs(e));
                a.geometry.resize(1 + e, b);
                d.drawFeature(a);
                j++
            },
            50, b, g)
        };
        g.events.register("locationupdated", g,
        function(g) {
            d.removeAllFeatures();
            var n = new OpenLayers.Feature.Vector(OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(g.point.x, g.point.y), g.position.coords.accuracy / 2, 40, 0), {},
            e);
            d.addFeatures([new OpenLayers.Feature.Vector(g.point, {},
            {
                graphicName: "cross",
                strokeColor: "#f00",
                strokeWidth: 2,
                fillOpacity: 0,
                pointRadius: 10
            }), n]);
            if (b) a.zoomToExtent(d.getDataExtent()),
            k(n),
            a.getZoom() > j && a.zoomTo(j),
            b = !1,
            this.bind = !0
        });
        g.events.register("locationfailed", this,
        function() {
            OpenLayers.Console.log(this.locationFailedText)
        });
        a.addControl(g);
        gxp.plugins.GeoLocator.superclass.addActions.call(this, [{
            tooltip: this.infoActionTip,
            iconCls: this.iconCls,
            text: this.toolText,
            toggleGroup: this.toggleGroup,
            enableToggle: !0,
            allowDepress: !0,
            toggleHandler: function(e, j) {
                j ? (a.addLayer(d), b = g.watch = !0, g.activate()) : (d.removeAllFeatures(), g.deactivate(), g.watch = !1, a.removeLayer(d))
            }
        }])
    }
});
Ext.preg(gxp.plugins.GeoLocator.prototype.ptype, gxp.plugins.GeoLocator);
Ext.namespace("gxp");
gxp.MouseCoordinatesDialog = Ext.extend(Ext.Container, {
    initComponent: function() {
        Ext.apply(this, this.getConfig());
        gxp.MouseCoordinatesDialog.superclass.initComponent.call(this)
    },
    setCoordinates: function(a) {
        this.coordinatesBox.setValue(a)
    },
    getConfig: function() {
        this.coordinatesBox = new Ext.form.TextField({
            value: this.coordinates,
            width: 300,
            listeners: {
                focus: function() {
                    this.selectText()
                }
            }
        });
        return {
            border: !1,
            defaults: {
                border: !1,
                cls: "gxp-export-section",
                xtype: "container",
                layout: "fit"
            },
            items: [{
                items: [new Ext.Container({
                    layout: "column",
                    defaults: {
                        border: !1,
                        xtype: "box"
                    },
                    items: [this.coordinatesBox]
                })]
            }]
        }
    }
});
Ext.namespace("gxp");
OpenLayers.Control.RightClick = OpenLayers.Class(OpenLayers.Control, {
    defaultHandlerOptions: {
        single: !0,
        "double": !0,
        pixelTolerance: 0,
        stopSingle: !1,
        stopDouble: !1
    },
    handleRightClicks: !0,
    initialize: function(a) {
        this.handlerOptions = OpenLayers.Util.extend({},
        this.defaultHandlerOptions);
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        this.handler = new OpenLayers.Handler.Click(this, this.eventMethods, this.handlerOptions)
    },
    CLASS_NAME: "OpenLayers.Control.RightClick"
});
gxp.plugins.CoordinateTool = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_coordinatetool",
    outputTarget: "map",
    title: "Map Coordinates (longitude, latitude)",
    infoActionTip: "Get coordinates at the mouse position",
    coordinatePositionText: "CoordinatePosition",
    toolText: null,
    iconCls: "gxp-icon-getfeatureinfo",
    coordWindow: null,
    coordDialog: new gxp.MouseCoordinatesDialog,
    markers: new OpenLayers.Layer.Markers(this.coordinatePositionText, {
        displayInLayerSwitcher: !1
    }),
    createMarker: function(a) {
        this.markers.clearMarkers();
        new OpenLayers.Size(121, 125);
        this.markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(a.lon, a.lat)))
    },
    showCoordinates: function(a) {
        this.target.mapPanel.map.addLayer(this.markers);
        a = this.target.mapPanel.map.getLonLatFromViewPortPx(a.xy);
        this.createMarker(a);
        a.transform(this.target.mapPanel.map.projection, "EPSG:4326");
        this.coordDialog.setCoordinates(a.lon + "," + a.lat);
        this.coordWindow.show()
    },
    addActions: function() {
        var a = this;
        this.coordWindow = new Ext.Window({
            title: this.title,
            layout: "fit",
            width: 300,
            autoHeight: !0,
            closeAction: "hide",
            listeners: {
                hide: function() {
                    a.target.mapPanel.map.removeLayer(a.markers)
                }
            },
            items: [this.coordDialog]
        });
        var b = new OpenLayers.Control.RightClick({
            eventMethods: {
                rightclick: function(b) {
                    a.showCoordinates(b)
                }
            }
        });
        this.target.mapPanel.map.addControl(b);
        b.activate();
        this.target.mapPanel.getEl().on("contextmenu",
        function(a) {
            a.preventDefault()
        })
    }
});
Ext.preg(gxp.plugins.CoordinateTool.prototype.ptype, gxp.plugins.CoordinateTool);
Ext.namespace("gxp.plugins");
gxp.plugins.CatalogueSource = Ext.extend(gxp.plugins.WMSSource, {
    url: null,
    title: null,
    lazy: !0,
    proxyOptions: null,
    describeLayer: function(a, b, d) {
        a = new(Ext.data.Record.create([{
            name: "owsType",
            type: "string"
        },
        {
            name: "owsURL",
            type: "string"
        },
        {
            name: "typeName",
            type: "string"
        }]))({
            owsType: "WFS",
            owsURL: a.get("url"),
            typeName: a.get("name")
        });
        b.call(d, a)
    },
    destroy: function() {
        this.store && this.store.destroy();
        this.store = null;
        gxp.plugins.CatalogueSource.superclass.destroy.apply(this, arguments)
    }
});
Ext.namespace("gxp.plugins");
gxp.plugins.CSWCatalogueSource = Ext.extend(gxp.plugins.CatalogueSource, {
    ptype: "gxp_cataloguesource",
    createStore: function() {
        this.store = new Ext.data.Store({
            proxy: new GeoExt.data.ProtocolProxy(Ext.apply({
                setParamsAsOptions: !0,
                protocol: new OpenLayers.Protocol.CSW({
                    url: this.url
                })
            },
            this.proxyOptions || {})),
            reader: new GeoExt.data.CSWRecordsReader({
                fields: "title,abstract,URI,bounds,projection,references".split(",")
            })
        });
        gxp.plugins.LayerSource.prototype.createStore.apply(this, arguments)
    },
    getPagingParamNames: function() {
        return {
            start: "startPosition",
            limit: "maxRecords"
        }
    },
    getFullFilter: function(a, b) {
        var d = [];
        void 0 !== a && d.push(a);
        d = d.concat(b);
        return 1 >= d.length ? d[0] : new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters: d
        })
    },
    filter: function(a) {
        var b = void 0;
        "" !== a.queryString && (b = new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.LIKE,
            matchCase: !1,
            property: "csw:AnyText",
            value: "*" + a.queryString + "*"
        }));
        var d = {
            resultType: "results",
            maxRecords: a.limit,
            Query: {
                typeNames: "gmd:MD_Metadata",
                ElementSetName: {
                    value: "full"
                }
            }
        },
        a = this.getFullFilter(b, a.filters);
        void 0 !== a && Ext.apply(d.Query, {
            Constraint: {
                version: "1.1.0",
                Filter: a
            }
        });
        Ext.apply(this.store.baseParams, d);
        this.store.load()
    }
});
Ext.preg(gxp.plugins.CSWCatalogueSource.prototype.ptype, gxp.plugins.CSWCatalogueSource);
Ext.namespace("gxp.plugins");
gxp.plugins.LoadingIndicator = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_loadingindicator",
    onlyShowOnFirstLoad: !1,
    loadingMapMessage: "Loading Map...",
    layerCount: 0,
    busyMask: null,
    init: function(a) {
        a.map.events.register("preaddlayer", this,
        function(b) {
            var d = b.layer;
            if (d instanceof OpenLayers.Layer.WMS) d.events.on({
                loadstart: function() {
                    this.layerCount++;
                    if (!this.busyMask) this.busyMask = new Ext.LoadMask(a.map.div, {
                        msg: this.loadingMapMessage
                    });
                    this.busyMask.show(); ! 0 === this.onlyShowOnFirstLoad && d.events.unregister("loadstart", this, arguments.callee)
                },
                loadend: function() {
                    this.layerCount--;
                    0 === this.layerCount && this.busyMask.hide(); ! 0 === this.onlyShowOnFirstLoad && d.events.unregister("loadend", this, arguments.callee)
                },
                scope: this
            })
        })
    },
    destroy: function() {
        Ext.destroy(this.busyMask);
        this.busyMask = null;
        gxp.plugins.LoadingIndicator.superclass.destroy.apply(this, arguments)
    }
});
Ext.preg(gxp.plugins.LoadingIndicator.prototype.ptype, gxp.plugins.LoadingIndicator);
Ext.namespace("gxp.plugins");
gxp.plugins.Legend = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_legend",
    menuText: "Legend",
    tooltip: "Show Legend",
    actionTarget: null,
    constructor: function(a) {
        gxp.plugins.Legend.superclass.constructor.apply(this, arguments);
        if (!this.outputConfig) this.outputConfig = {
            width: 300,
            height: 400
        };
        Ext.applyIf(this.outputConfig, {
            title: this.menuText
        })
    },
    addActions: function() {
        return gxp.plugins.Legend.superclass.addActions.apply(this, [[{
            menuText: this.menuText,
            iconCls: "gxp-icon-legend",
            tooltip: this.tooltip,
            handler: function() {
                this.removeOutput();
                this.addOutput()
            },
            scope: this
        }]])
    },
    getLegendPanel: function() {
        return this.output[0]
    },
    addOutput: function(a) {
        return gxp.plugins.Legend.superclass.addOutput.call(this, Ext.apply({
            xtype: "gx_legendpanel",
            ascending: !1,
            border: !1,
            hideMode: "offsets",
            layerStore: this.target.mapPanel.layers,
            defaults: {
                cls: "gxp-legend-item"
            }
        },
        a))
    }
});
Ext.preg(gxp.plugins.Legend.prototype.ptype, gxp.plugins.Legend);
Ext.namespace("gxp.plugins");
gxp.plugins.PrintPage = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_printpage",
    menuText: "Print Map",
    tooltip: "Print Map",
    buttonText: "Print",
    iconCls: "gxp-icon-print",
    constructor: function(a) {
        gxp.plugins.PrintPage.superclass.constructor.apply(this, arguments)
    },
    addActions: function() {
        return gxp.plugins.PrintPage.superclass.addActions.call(this, [{
            menuText: this.menuText,
            buttonText: this.buttonText,
            title: this.buttonText,
            text: this.buttonText,
            tooltip: this.tooltip,
            iconCls: this.iconCls,
            text: this.text,
            handler: function() {
                window.open("/maps/print", "Print")
            },
            scope: this
        }])
    }
});
Ext.preg(gxp.plugins.PrintPage.prototype.ptype, gxp.plugins.PrintPage);
Ext.namespace("gxp.plugins");
gxp.plugins.GoogleEarth = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_googleearth",
    timeout: 7E3,
    menuText: "3D Viewer",
    tooltip: "Switch to 3D Viewer",
    tooltipMap: "Switch back to normal map view",
    iconCls: "gxp-icon-googleearth",
    text: null,
    constructor: function(a) {
        gxp.plugins.GoogleEarth.superclass.constructor.apply(this, arguments)
    },
    addActions: function() {
        return gxp.plugins.GoogleEarth.superclass.addActions.apply(this, [[{
            menuText: this.menuText,
            enableToggle: !0,
            iconCls: this.iconCls,
            text: this.text,
            tooltip: this.tooltip,
            toggleHandler: function(a, b) {
                this.actions[0].each(function(a) {
                    a.toggle && a.toggle(!1, !0)
                });
                this.togglePanelDisplay(b)
            },
            scope: this
        }]])
    },
    togglePanelDisplay: function(a) {
        var b = this.target.mapPanel.ownerCt,
        d = b && b.getLayout();
        if (d && d instanceof Ext.layout.CardLayout) if (!0 === a) gxp.plugins.GoogleEarth.loader.onLoad({
            callback: function() {
                d.setActiveItem(1);
                this.actions[0].enable();
                this.actions[0].items[0].setTooltip(this.tooltipMap);
                this.actions[0].each(function(a) {
                    a.toggle && a.toggle(!0, !0)
                })
            },
            scope: this
        });
        else d.setActiveItem(0),
        this.actions[0].items[0].setTooltip(this.tooltip)
    },
    getHost: function() {
        return window.location.host.split(":").shift() + ":" + (window.location.port || "80")
    }
});
gxp.plugins.GoogleEarth.loader = new(Ext.extend(Ext.util.Observable, {
    ready: !(!window.google || !window.google.earth),
    loading: !1,
    constructor: function() {
        this.addEvents("ready", "failure");
        return Ext.util.Observable.prototype.constructor.apply(this, arguments)
    },
    onScriptLoad: function() {
        var a = gxp.plugins.GoogleEarth.loader;
        if (!a.ready) a.ready = !0,
        a.loading = !1,
        a.fireEvent("ready")
    },
    onLoad: function(a) {
        if (this.ready) window.setTimeout(function() {
            a.callback.call(a.scope)
        },
        0);
        else if (this.loading) this.on({
            ready: a.callback,
            failure: a.errback || Ext.emptyFn,
            scope: a.scope
        });
        else this.loadScript(a)
    },
    loadScript: function(a) {
        function b() {
            document.getElementsByTagName("head")[0].appendChild(e)
        }
        window.google && delete google.loader;
        var d = {
            autoload: Ext.encode({
                modules: [{
                    name: "earth",
                    version: "1",
                    callback: "gxp.plugins.GoogleEarth.loader.onScriptLoad"
                }]
            })
        },
        e = document.createElement("script");
        e.src = "https://www.google.com/jsapi?" + Ext.urlEncode(d);
        d = a.timeout || gxp.plugins.GoogleSource.prototype.timeout;
        window.setTimeout(function() {
            gxp.plugins.GoogleEarth.loader.ready || (this.fireEvent("failure"), this.unload())
        }.createDelegate(this), d);
        this.on({
            ready: a.callback,
            failure: a.errback || Ext.emptyFn,
            scope: a.scope
        });
        this.loading = !0;
        if (document.body) b();
        else Ext.onReady(b);
        this.script = e
    },
    unload: function() {
        this.purgeListeners();
        this.script && (document.getElementsByTagName("head")[0].removeChild(this.script), delete this.script);
        this.ready = this.loading = !1;
        delete google.loader;
        delete google.earth
    }
}));
Ext.preg(gxp.plugins.GoogleEarth.prototype.ptype, gxp.plugins.GoogleEarth);
Ext.namespace("gxp");
gxp.FilterBuilder = Ext.extend(Ext.Container, {
    builderTypeNames: ["any", "all", "none", "not all"],
    allowedBuilderTypes: null,
    allowBlank: !1,
    preComboText: "Match",
    postComboText: "of the following:",
    cls: "gxp-filterbuilder",
    builderType: null,
    childFilterContainer: null,
    customizeFilterOnInit: !0,
    addConditionText: "add condition",
    addGroupText: "add group",
    removeConditionText: "remove condition",
    allowGroups: !0,
    initComponent: function() {
        Ext.applyIf(this, {
            defaultBuilderType: gxp.FilterBuilder.ANY_OF
        });
        if (this.customizeFilterOnInit) this.filter = this.customizeFilter(this.filter);
        this.builderType = this.getBuilderType();
        this.items = [{
            xtype: "container",
            layout: "form",
            ref: "form",
            defaults: {
                anchor: "100%"
            },
            hideLabels: !0,
            items: [{
                xtype: "compositefield",
                style: "padding-left: 2px",
                items: [{
                    xtype: "label",
                    style: "padding-top: 0.3em",
                    text: this.preComboText
                },
                this.createBuilderTypeCombo(), {
                    xtype: "label",
                    style: "padding-top: 0.3em",
                    text: this.postComboText
                }]
            },
            this.createChildFiltersPanel(), {
                xtype: "toolbar",
                items: this.createToolBar()
            }]
        }];
        this.addEvents("change");
        gxp.FilterBuilder.superclass.initComponent.call(this)
    },
    createToolBar: function() {
        var a = [{
            text: this.addConditionText,
            iconCls: "add",
            handler: function() {
                this.addCondition()
            },
            scope: this
        }];
        this.allowGroups && a.push({
            text: this.addGroupText,
            iconCls: "add",
            handler: function() {
                this.addCondition(!0)
            },
            scope: this
        });
        return a
    },
    getFilter: function() {
        var a;
        this.filter && (a = this.filter.clone(), a instanceof OpenLayers.Filter.Logical && (a = this.cleanFilter(a)));
        return a
    },
    cleanFilter: function(a) {
        if (a instanceof OpenLayers.Filter.Logical) if (a.type !== OpenLayers.Filter.Logical.NOT && 1 === a.filters.length) a = this.cleanFilter(a.filters[0]);
        else for (var b, d = 0,
        e = a.filters.length; d < e; ++d) if (b = a.filters[d], b instanceof OpenLayers.Filter.Logical) if (b = this.cleanFilter(b)) a.filters[d] = b;
        else {
            a = b;
            break
        } else {
            if (!b || null === b.type || null === b.property || null === b[a.type === OpenLayers.Filter.Comparison.BETWEEN ? "lowerBoundary": "value"]) {
                a = !1;
                break
            }
        } else if (!a || null === a.type || null === a.property || null === a[a.type === OpenLayers.Filter.Comparison.BETWEEN ? "lowerBoundary": "value"]) a = !1;
        return a
    },
    customizeFilter: function(a) {
        if (a) {
            var a = this.cleanFilter(a),
            b,
            d,
            e;
            switch (a.type) {
            case OpenLayers.Filter.Logical.AND:
            case OpenLayers.Filter.Logical.OR:
                if (!a.filters || 0 === a.filters.length) a.filters = [this.createDefaultFilter()];
                else for (d = 0, e = a.filters.length; d < e; ++d) b = a.filters[d],
                b instanceof OpenLayers.Filter.Logical && (a.filters[d] = this.customizeFilter(b));
                a = new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.OR,
                    filters: [a]
                });
                break;
            case OpenLayers.Filter.Logical.NOT:
                if (!a.filters || 0 === a.filters.length) a.filters = [new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.OR,
                    filters: [this.createDefaultFilter()]
                })];
                else if (b = a.filters[0], b instanceof OpenLayers.Filter.Logical) if (b.type !== OpenLayers.Filter.Logical.NOT) {
                    var g;
                    for (d = 0, e = b.filters.length; d < e; ++d) g = b.filters[d],
                    g instanceof OpenLayers.Filter.Logical && (b.filters[d] = this.customizeFilter(g))
                } else a = b.filters && 0 < b.filters.length ? this.customizeFilter(b.filters[0]) : this.wrapFilter(this.createDefaultFilter());
                else a.filters = [new OpenLayers.Filter.Logical({
                    type: this.defaultBuilderType === gxp.FilterBuilder.NOT_ALL_OF ? OpenLayers.Filter.Logical.AND: OpenLayers.Filter.Logical.OR,
                    filters: [b]
                })];
                break;
            default:
                a = this.wrapFilter(a)
            }
        } else a = this.wrapFilter(this.createDefaultFilter());
        return a
    },
    createDefaultFilter: function() {
        return new OpenLayers.Filter.Comparison
    },
    wrapFilter: function(a) {
        return new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.OR,
            filters: [new OpenLayers.Filter.Logical({
                type: this.defaultBuilderType === gxp.FilterBuilder.ALL_OF ? OpenLayers.Filter.Logical.AND: OpenLayers.Filter.Logical.OR,
                filters: [a]
            })]
        })
    },
    addCondition: function(a) {
        var b, d;
        a ? (d = "gxp_filterbuilder", b = this.wrapFilter(this.createDefaultFilter())) : (d = "gxp_filterfield", b = this.createDefaultFilter());
        this.childFilterContainer.add(this.newRow({
            xtype: d,
            filter: b,
            columnWidth: 1,
            attributes: this.attributes,
            allowBlank: a ? void 0 : this.allowBlank,
            customizeFilterOnInit: a && !1,
            listeners: {
                change: function() {
                    this.fireEvent("change", this)
                },
                scope: this
            }
        }));
        this.filter.filters[0].filters.push(b);
        this.childFilterContainer.doLayout()
    },
    removeCondition: function(a, b) {
        var d = this.filter.filters[0].filters;
        0 < d.length && (d.remove(b), this.childFilterContainer.remove(a, !0));
        0 === d.length && this.addCondition();
        this.fireEvent("change", this)
    },
    createBuilderTypeCombo: function() {
        for (var a = this.allowedBuilderTypes || [gxp.FilterBuilder.ANY_OF, gxp.FilterBuilder.ALL_OF, gxp.FilterBuilder.NONE_OF], b = a.length, d = Array(b), e, g = 0; g < b; ++g) e = a[g],
        d[g] = [e, this.builderTypeNames[e]];
        return {
            xtype: "combo",
            store: new Ext.data.SimpleStore({
                data: d,
                fields: ["value", "name"]
            }),
            value: this.builderType,
            ref: "../../builderTypeCombo",
            displayField: "name",
            valueField: "value",
            triggerAction: "all",
            mode: "local",
            listeners: {
                select: function(a, b) {
                    this.changeBuilderType(b.get("value"));
                    this.fireEvent("change", this)
                },
                scope: this
            },
            width: 60
        }
    },
    changeBuilderType: function(a) {
        if (a !== this.builderType) {
            this.builderType = a;
            var b = this.filter.filters[0];
            switch (a) {
            case gxp.FilterBuilder.ANY_OF:
                this.filter.type = OpenLayers.Filter.Logical.OR;
                b.type = OpenLayers.Filter.Logical.OR;
                break;
            case gxp.FilterBuilder.ALL_OF:
                this.filter.type = OpenLayers.Filter.Logical.OR;
                b.type = OpenLayers.Filter.Logical.AND;
                break;
            case gxp.FilterBuilder.NONE_OF:
                this.filter.type = OpenLayers.Filter.Logical.NOT;
                b.type = OpenLayers.Filter.Logical.OR;
                break;
            case gxp.FilterBuilder.NOT_ALL_OF:
                this.filter.type = OpenLayers.Filter.Logical.NOT,
                b.type = OpenLayers.Filter.Logical.AND
            }
        }
    },
    createChildFiltersPanel: function() {
        this.childFilterContainer = new Ext.Container;
        for (var a = this.filter.filters[0].filters, b, d = 0, e = a.length; d < e; ++d) {
            b = a[d];
            var g = {
                xtype: "gxp_filterfield",
                allowBlank: this.allowBlank,
                columnWidth: 1,
                filter: b,
                attributes: this.attributes,
                listeners: {
                    change: function() {
                        this.fireEvent("change", this)
                    },
                    scope: this
                }
            };
            this.childFilterContainer.add(this.newRow(Ext.applyIf(b instanceof OpenLayers.Filter.Logical ? {
                xtype: "gxp_filterbuilder"
            }: {
                xtype: "container",
                layout: "form",
                hideLabels: !0,
                items: g
            },
            g)))
        }
        return this.childFilterContainer
    },
    newRow: function(a) {
        var b = new Ext.Container({
            layout: "column",
            items: [{
                xtype: "container",
                width: 28,
                height: 26,
                style: "padding-left: 2px",
                items: {
                    xtype: "button",
                    tooltip: this.removeConditionText,
                    iconCls: "delete",
                    handler: function() {
                        this.removeCondition(b, a.filter)
                    },
                    scope: this
                }
            },
            a]
        });
        return b
    },
    getBuilderType: function() {
        var a = this.defaultBuilderType;
        if (this.filter) {
            var b = this.filter.filters[0];
            if (this.filter.type === OpenLayers.Filter.Logical.NOT) switch (b.type) {
            case OpenLayers.Filter.Logical.OR:
                a = gxp.FilterBuilder.NONE_OF;
                break;
            case OpenLayers.Filter.Logical.AND:
                a = gxp.FilterBuilder.NOT_ALL_OF
            } else switch (b.type) {
            case OpenLayers.Filter.Logical.OR:
                a = gxp.FilterBuilder.ANY_OF;
                break;
            case OpenLayers.Filter.Logical.AND:
                a = gxp.FilterBuilder.ALL_OF
            }
        }
        return a
    },
    setFilter: function(a) {
        this.filter = this.customizeFilter(a);
        this.changeBuilderType(this.getBuilderType());
        this.builderTypeCombo.setValue(this.builderType);
        this.form.remove(this.childFilterContainer);
        this.form.insert(1, this.createChildFiltersPanel());
        this.form.doLayout();
        this.fireEvent("change", this)
    }
});
gxp.FilterBuilder.ANY_OF = 0;
gxp.FilterBuilder.ALL_OF = 1;
gxp.FilterBuilder.NONE_OF = 2;
gxp.FilterBuilder.NOT_ALL_OF = 3;
Ext.reg("gxp_filterbuilder", gxp.FilterBuilder);
Ext.namespace("gxp");
gxp.WMSLayerPanel = Ext.extend(Ext.TabPanel, {
    layerRecord: null,
    source: null,
    styling: !0,
    sameOriginStyling: !0,
    rasterStyling: !1,
    transparent: null,
    editableStyles: !1,
    activeTab: 0,
    border: !1,
    imageFormats: /png|gif|jpe?g/i,
    aboutText: "About",
    titleText: "Title",
    nameText: "Name",
    descriptionText: "Description",
    displayText: "Display",
    opacityText: "Opacity",
    formatText: "Tile format",
    infoFormatText: "Info format",
    infoFormatEmptyText: "Select a format",
    transparentText: "Transparent",
    cacheText: "Caching",
    cacheFieldText: "Use cached tiles",
    stylesText: "Styles",
    displayOptionsText: "Display options",
    queryText: "Limit with filters",
    scaleText: "Limit by scale",
    minScaleText: "Min scale",
    maxScaleText: "Max scale",
    switchToFilterBuilderText: "Switch back to filter builder",
    cqlPrefixText: "or ",
    cqlText: "use CQL filter instead",
    initComponent: function() {
        this.cqlFormat = new OpenLayers.Format.CQL;
        this.source && this.source.getSchema(this.layerRecord,
        function(a) {
            if (!1 !== a) {
                var d = this.layerRecord.getLayer().params.CQL_FILTER;
                this.filterBuilder = new gxp.FilterBuilder({
                    filter: d && this.cqlFormat.read(d),
                    allowGroups: !1,
                    listeners: {
                        afterrender: function() {
                            this.filterBuilder.cascade(function(a) {
                                "toolbar" === a.getXType() && (a.addText(this.cqlPrefixText), a.addButton({
                                    text: this.cqlText,
                                    handler: this.switchToCQL,
                                    scope: this
                                }))
                            },
                            this)
                        },
                        change: function(a) {
                            var a = a.getFilter(),
                            b = null; ! 1 !== a && (b = this.cqlFormat.write(a));
                            this.layerRecord.getLayer().mergeNewParams({
                                CQL_FILTER: b
                            })
                        },
                        scope: this
                    },
                    attributes: a
                });
                this.filterFieldset.add(this.filterBuilder);
                this.filterFieldset.doLayout()
            }
        },
        this);
        this.addEvents("change");
        this.items = [this.createAboutPanel(), this.createDisplayPanel()];
        if (this.styling && gxp.WMSStylesDialog && this.layerRecord.get("styles")) {
            var a = this.layerRecord.get("restUrl");
            a || (a = (this.source || this.layerRecord.get("layer")).url.split("?").shift().replace(/\/(wms|ows)\/?$/, "/rest"));
            this.editableStyles = this.sameOriginStyling ? "/" === a.charAt(0) : !0;
            this.items.push(this.createStylesPanel(a))
        }
        gxp.WMSLayerPanel.superclass.initComponent.call(this)
    },
    switchToCQL: function() {
        var a = this.filterBuilder.getFilter(),
        b = ""; ! 1 !== a && (b = this.cqlFormat.write(a));
        this.filterBuilder.hide();
        this.cqlField.setValue(b);
        this.cqlField.show();
        this.cqlToolbar.show()
    },
    switchToFilterBuilder: function() {
        var a = null;
        try {
            a = this.cqlFormat.read(this.cqlField.getValue())
        } catch(b) {}
        this.cqlField.hide();
        this.cqlToolbar.hide();
        this.filterBuilder.show();
        null !== a && this.filterBuilder.setFilter(a)
    },
    createStylesPanel: function(a) {
        var b = gxp.WMSStylesDialog.createGeoServerStylerConfig(this.layerRecord, a); ! 0 === this.rasterStyling && b.plugins.push({
            ptype: "gxp_wmsrasterstylesdialog"
        });
        var d = this.ownerCt;
        if (! (d.ownerCt instanceof Ext.Window)) b.dialogCls = Ext.Panel,
        b.showDlg = function(a) {
            a.layout = "fit";
            a.autoHeight = !1;
            d.add(a)
        };
        return Ext.apply(b, {
            title: this.stylesText,
            style: "padding: 10px",
            editable: !1,
            listeners: Ext.apply(b.listeners, {
                beforerender: {
                    fn: function(b) {
                        var d = !this.editableStyles;
                        if (!d)"boolean" == typeof this.authorized ? (b.editable = this.authorized, b.ownerCt.doLayout()) : Ext.Ajax.request({
                            method: "PUT",
                            url: a + "/styles",
                            callback: function(a, d, g) {
                                b.editable = 405 == g.status;
                                b.ownerCt.doLayout()
                            }
                        });
                        return d
                    },
                    scope: this,
                    single: !0
                }
            })
        })
    },
    createAboutPanel: function() {
        return {
            title: this.aboutText,
            bodyStyle: {
                padding: "10px"
            },
            defaults: {
                border: !1
            },
            items: [{
                layout: "form",
                labelWidth: 70,
                items: [{
                    xtype: "textfield",
                    fieldLabel: this.titleText,
                    anchor: "99%",
                    value: this.layerRecord.get("title"),
                    listeners: {
                        change: function(a) {
                            this.layerRecord.set("title", a.getValue());
                            this.layerRecord.commit();
                            this.fireEvent("change")
                        },
                        scope: this
                    }
                },
                {
                    xtype: "textfield",
                    fieldLabel: this.nameText,
                    anchor: "99%",
                    value: this.layerRecord.get("name"),
                    readOnly: !0
                }]
            },
            {
                layout: "form",
                labelAlign: "top",
                items: [{
                    xtype: "textarea",
                    fieldLabel: this.descriptionText,
                    grow: !0,
                    growMax: 150,
                    anchor: "99%",
                    value: this.layerRecord.get("abstract"),
                    readOnly: !0
                }]
            }]
        }
    },
    onFormatChange: function(a) {
        var b = this.layerRecord.getLayer(),
        a = a.getValue();
        b.mergeNewParams({
            format: a
        });
        b = this.transparentCb;
        if ("image/jpeg" == a) this.transparent = b.getValue(),
        b.setValue(!1);
        else if (null !== this.transparent) b.setValue(this.transparent),
        this.transparent = null;
        b.setDisabled("image/jpeg" == a);
        this.fireEvent("change")
    },
    addScaleOptions: function(a, b) {
        a.alwaysInRange = null;
        a.addOptions(b);
        a.display();
        a.redraw()
    },
    createDisplayPanel: function() {
        var a = this.layerRecord,
        b = a.getLayer(),
        d = b.opacity;
        null == d && (d = 1);
        var e = [],
        d = b.params.FORMAT.toLowerCase();
        Ext.each(a.get("formats"),
        function(a) {
            this.imageFormats.test(a) && e.push(a.toLowerCase())
        },
        this); - 1 === e.indexOf(d) && e.push(d);
        var g = b.params.TRANSPARENT;
        return {
            title: this.displayText,
            layout: "form",
            bodyStyle: {
                padding: "10px"
            },
            defaults: {
                labelWidth: 70
            },
            items: [{
                xtype: "fieldset",
                title: this.displayOptionsText,
                items: [{
                    xtype: "gx_opacityslider",
                    name: "opacity",
                    anchor: "99%",
                    isFormField: !0,
                    fieldLabel: this.opacityText,
                    listeners: {
                        change: function() {
                            this.fireEvent("change")
                        },
                        scope: this
                    },
                    layer: this.layerRecord
                },
                {
                    xtype: "compositefield",
                    fieldLabel: this.formatText,
                    anchor: "99%",
                    items: [{
                        xtype: "combo",
                        width: 90,
                        listWidth: 150,
                        store: e,
                        value: d,
                        mode: "local",
                        triggerAction: "all",
                        editable: !1,
                        listeners: {
                            select: this.onFormatChange,
                            scope: this
                        }
                    },
                    {
                        xtype: "checkbox",
                        ref: "../../../transparentCb",
                        checked: "true" === g || !0 === g,
                        listeners: {
                            check: function(a, d) {
                                b.mergeNewParams({
                                    transparent: d ? "true": "false"
                                });
                                this.fireEvent("change")
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "label",
                        cls: "gxp-layerproperties-label",
                        text: this.transparentText
                    }]
                },
                {
                    xtype: "compositefield",
                    anchor: "99%",
                    hidden: null == this.layerRecord.get("layer").params.TILED,
                    fieldLabel: this.cacheText,
                    items: [{
                        xtype: "checkbox",
                        checked: !0 === this.layerRecord.get("layer").params.TILED,
                        listeners: {
                            check: function(a, b) {
                                this.layerRecord.get("layer").mergeNewParams({
                                    TILED: b
                                });
                                this.fireEvent("change")
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "label",
                        cls: "gxp-layerproperties-label",
                        text: this.cacheFieldText
                    }]
                },
                {
                    xtype: "combo",
                    fieldLabel: this.infoFormatText,
                    emptyText: this.infoFormatEmptyText,
                    store: a.get("infoFormats"),
                    value: a.get("infoFormat"),
                    hidden: void 0 === a.get("infoFormats"),
                    mode: "local",
                    listWidth: 150,
                    triggerAction: "all",
                    editable: !1,
                    anchor: "99%",
                    listeners: {
                        select: function(b) {
                            b = b.getValue();
                            a.set("infoFormat", b);
                            this.fireEvent("change")
                        }
                    },
                    scope: this
                }]
            },
            {
                xtype: "fieldset",
                title: this.queryText,
                hideLabels: !0,
                ref: "../filterFieldset",
                listeners: {
                    expand: function() {
                        this.layerRecord.getLayer().mergeNewParams({
                            CQL_FILTER: this.cqlFilter
                        })
                    },
                    collapse: function() {
                        this.cqlFilter = this.layerRecord.getLayer().params.CQL_FILTER;
                        this.layerRecord.getLayer().mergeNewParams({
                            CQL_FILTER: null
                        })
                    },
                    scope: this
                },
                hidden: null === this.source,
                checkboxToggle: !0,
                items: [{
                    xtype: "textarea",
                    value: this.layerRecord.getLayer().params.CQL_FILTER,
                    grow: !0,
                    anchor: "99%",
                    width: "100%",
                    growMax: 100,
                    ref: "../../cqlField",
                    hidden: !0
                }],
                buttons: [{
                    ref: "../../../cqlToolbar",
                    hidden: !0,
                    text: this.switchToFilterBuilderText,
                    handler: this.switchToFilterBuilder,
                    scope: this
                }]
            },
            {
                xtype: "fieldset",
                title: this.scaleText,
                listeners: {
                    expand: function() {
                        var a = this.layerRecord.getLayer(); (void 0 !== this.minScale || void 0 !== this.maxScale) && this.addScaleOptions(a, {
                            minScale: this.maxScale,
                            maxScale: this.minScale
                        })
                    },
                    collapse: function() {
                        var a = this.layerRecord.getLayer();
                        this.minScale = a.options.maxScale;
                        this.maxScale = a.options.minScale;
                        this.addScaleOptions(a, {
                            minScale: null,
                            maxScale: null
                        })
                    },
                    scope: this
                },
                checkboxToggle: !0,
                items: [{
                    xtype: "compositefield",
                    fieldLabel: this.minScaleText,
                    items: [{
                        xtype: "label",
                        text: "1:",
                        cls: "gxp-layerproperties-label"
                    },
                    {
                        xtype: "numberfield",
                        anchor: "99%",
                        width: "85%",
                        listeners: {
                            change: function(a) {
                                a = {
                                    maxScale: parseInt(a.getValue())
                                };
                                this.addScaleOptions(this.layerRecord.getLayer(), a)
                            },
                            scope: this
                        },
                        value: this.layerRecord.getLayer().options.maxScale
                    }]
                },
                {
                    xtype: "compositefield",
                    fieldLabel: this.maxScaleText,
                    items: [{
                        xtype: "label",
                        text: "1:",
                        cls: "gxp-layerproperties-label"
                    },
                    {
                        xtype: "numberfield",
                        anchor: "99%",
                        width: "85%",
                        listeners: {
                            change: function(a) {
                                a = {
                                    minScale: parseInt(a.getValue())
                                };
                                this.addScaleOptions(this.layerRecord.getLayer(), a)
                            },
                            scope: this
                        },
                        value: this.layerRecord.getLayer().options.minScale
                    }]
                }]
            }]
        }
    }
});
Ext.reg("gxp_wmslayerpanel", gxp.WMSLayerPanel);
Ext.namespace("gxp.form");
gxp.form.FilterField = Ext.extend(Ext.form.CompositeField, {
    lowerBoundaryTip: "lower boundary",
    upperBoundaryTip: "upper boundary",
    filter: null,
    attributes: null,
    attributesComboConfig: null,
    initComponent: function() {
        if (!this.filter) this.filter = this.createDefaultFilter();
        var a = "remote",
        b = new GeoExt.data.AttributeStore;
        if (this.attributes) 0 != this.attributes.getCount() ? (a = "local", this.attributes.each(function(a) { / gml: ((Multi) ? (Point | Line | Polygon | Curve | Surface | Geometry)). * /.exec(a.get("type"))||b.add([a])})):b=this.attributes;
a={xtype:"combo",store:b,editable:"local"==a,typeAhead:!0,forceSelection:!0,mode:a,triggerAction:"all",ref:"property",allowBlank:this.allowBlank,displayField:"name",valueField:"name",value:this.filter.property,listeners:{select:function(a,b){this.items.get(1).enable();this.filter.property=b.get("name");this.fireEvent("change",this.filter,this)},blur:function(a){var b=a.store.findExact("name",a.getValue());-1!=b?a.fireEvent("select",a,a.store.getAt(b)):null!=a.startValue&&a.setValue(a.startValue)},
scope:this},width:120};this.attributesComboConfig=this.attributesComboConfig||{};Ext.applyIf(this.attributesComboConfig,a);this.items=this.createFilterItems();this.addEvents("change");gxp.form.FilterField.superclass.initComponent.call(this)},validateValue:function(){return this.filter.type===OpenLayers.Filter.Comparison.BETWEEN?null!==this.filter.property&&null!==this.filter.upperBoundary&&null!==this.filter.lowerBoundary:null!==this.filter.property&&null!==this.filter.value&&null!==this.filter.type},
createDefaultFilter:function(){return new OpenLayers.Filter.Comparison},createFilterItems:function(){var a=this.filter.type===OpenLayers.Filter.Comparison.BETWEEN;return[this.attributesComboConfig,Ext.applyIf({xtype:"gxp_comparisoncombo",ref:"type",disabled:null==this.filter.property,allowBlank:this.allowBlank,value:this.filter.type,listeners:{select:function(a,d){this.items.get(2).enable();this.items.get(3).enable();this.items.get(4).enable();this.setFilterType(d.get("value"));this.fireEvent("change",
this.filter,this)},scope:this}},this.comparisonComboConfig),{xtype:"textfield",disabled:null==this.filter.type,hidden:a,ref:"value",value:this.filter.value,width:50,grow:!0,growMin:50,anchor:"100%",allowBlank:this.allowBlank,listeners:{change:function(a,d){this.filter.value=d;this.fireEvent("change",this.filter,this)},scope:this}},{xtype:"textfield",disabled:null==this.filter.type,hidden:!a,value:this.filter.lowerBoundary,tooltip:this.lowerBoundaryTip,grow:!0,growMin:30,ref:"lowerBoundary",anchor:"100%",
allowBlank:this.allowBlank,listeners:{change:function(a,d){this.filter.lowerBoundary=d;this.fireEvent("change",this.filter,this)},render:function(a){Ext.QuickTips.register({target:a.getEl(),text:this.lowerBoundaryTip})},autosize:function(a,d){a.setWidth(d);a.ownerCt.doLayout()},scope:this}},{xtype:"textfield",disabled:null==this.filter.type,hidden:!a,grow:!0,growMin:30,ref:"upperBoundary",value:this.filter.upperBoundary,allowBlank:this.allowBlank,listeners:{change:function(a,d){this.filter.upperBoundary=
d;this.fireEvent("change",this.filter,this)},render:function(a){Ext.QuickTips.register({target:a.getEl(),text:this.upperBoundaryTip})},scope:this}}]},setFilterType:function(a){this.filter.type=a;a===OpenLayers.Filter.Comparison.BETWEEN?(this.items.get(2).hide(),this.items.get(3).show(),this.items.get(4).show()):(this.items.get(2).show(),this.items.get(3).hide(),this.items.get(4).hide());this.doLayout()},setFilter:function(a){var b=this.filter.type;this.filter=a;b!==a.type&&this.setFilterType(a.type);
this.property.setValue(a.property);this.type.setValue(a.type);a.type===OpenLayers.Filter.Comparison.BETWEEN?(this.lowerBoundary.setValue(a.lowerBoundary),this.upperBoundary.setValue(a.upperBoundary)):this.value.setValue(a.value);this.fireEvent("change",this.filter,this)}});Ext.reg("gxp_filterfield",gxp.form.FilterField);Ext.namespace("gxp.form");
gxp.form.ComparisonComboBox=Ext.extend(Ext.form.ComboBox,{allowedTypes:[[OpenLayers.Filter.Comparison.EQUAL_TO,"="],[OpenLayers.Filter.Comparison.NOT_EQUAL_TO,"<>"],[OpenLayers.Filter.Comparison.LESS_THAN,"<"],[OpenLayers.Filter.Comparison.GREATER_THAN,">"],[OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,"<="],[OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,">="],[OpenLayers.Filter.Comparison.LIKE,"like"],[OpenLayers.Filter.Comparison.BETWEEN,"between"]],allowBlank:!1,mode:"local",typeAhead:!0,
forceSelection:!0,triggerAction:"all",width:50,editable:!0,initComponent:function(){var a={displayField:"name",valueField:"value",store:new Ext.data.SimpleStore({data:this.allowedTypes,fields:["value","name"]}),value:void 0===this.value?this.allowedTypes[0][0]:this.value,listeners:{blur:function(){var a=this.store.findExact("value",this.getValue());-1!=a?this.fireEvent("select",this,this.store.getAt(a)):null!=this.startValue&&this.setValue(this.startValue)}}};Ext.applyIf(this,a);gxp.form.ComparisonComboBox.superclass.initComponent.call(this)}});
Ext.reg("gxp_comparisoncombo",gxp.form.ComparisonComboBox);Ext.namespace("gxp");
gxp.ScaleLimitPanel=Ext.extend(Ext.Panel,{maxScaleDenominatorLimit:1.577757414193268E9*OpenLayers.DOTS_PER_INCH/256,
            limitMaxScaleDenominator: !0,
            maxScaleDenominator: void 0,
            minScaleDenominatorLimit: 1.577757414193268E9 * Math.pow(0.5, 19) * OpenLayers.DOTS_PER_INCH / 256,
            limitMinScaleDenominator: !0,
            minScaleDenominator: void 0,
            scaleLevels: 20,
            scaleSliderTemplate: "{scaleType} Scale 1:{scale}",
            modifyScaleTipContext: Ext.emptyFn,
            scaleFactor: null,
            changing: !1,
            border: !1,
            maxScaleLimitText: "Max scale limit",
            minScaleLimitText: "Min scale limit",
            initComponent: function() {
                this.layout = "column";
                this.defaults = {
                    border: !1,
                    bodyStyle: "margin: 0 5px;"
                };
                this.bodyStyle = {
                    padding: "5px"
                };
                this.scaleSliderTemplate = new Ext.Template(this.scaleSliderTemplate);
                Ext.applyIf(this, {
                    minScaleDenominator: this.minScaleDenominatorLimit,
                    maxScaleDenominator: this.maxScaleDenominatorLimit
                });
                this.scaleFactor = Math.pow(this.maxScaleDenominatorLimit / this.minScaleDenominatorLimit, 1 / (this.scaleLevels - 1));
                this.scaleSlider = new Ext.Slider({
                    vertical: !0,
                    height: 100,
                    values: [0, 100],
                    listeners: {
                        changecomplete: function(a) {
                            this.updateScaleValues(a)
                        },
                        render: function(a) {
                            a.thumbs[0].el.setVisible(this.limitMaxScaleDenominator);
                            a.thumbs[1].el.setVisible(this.limitMinScaleDenominator);
                            a.setDisabled(!this.limitMinScaleDenominator && !this.limitMaxScaleDenominator)
                        },
                        scope: this
                    },
                    plugins: [new gxp.slider.Tip({
                        getText: function(a) {
                            var b = a.slider.thumbs.indexOf(a),
                            a = {
                                scale: "" + this.sliderValuesToScale([a.value])[0],
                                zoom: (a.value * (this.scaleLevels / 100)).toFixed(1),
                                type: 0 === b ? "Max": "Min",
                                scaleType: 0 === b ? "Min": "Max"
                            };
                            this.modifyScaleTipContext(this, a);
                            return this.scaleSliderTemplate.apply(a)
                        }.createDelegate(this)
                    })]
                });
                this.maxScaleDenominatorInput = new Ext.form.NumberField({
                    allowNegative: !1,
                    width: 100,
                    fieldLabel: "1",
                    value: Math.round(this.maxScaleDenominator),
                    disabled: !this.limitMaxScaleDenominator,
                    validator: function(a) {
                        return ! this.limitMinScaleDenominator || a > this.minScaleDenominator
                    }.createDelegate(this),
                    listeners: {
                        valid: function(a) {
                            var a = Number(a.getValue()),
                            b = Math.round(this.maxScaleDenominatorLimit);
                            if (a < b && a > this.minScaleDenominator) this.maxScaleDenominator = a,
                            this.updateSliderValues()
                        },
                        change: function(a) {
                            var b = Number(a.getValue()),
                            d = Math.round(this.maxScaleDenominatorLimit);
                            b > d ? a.setValue(d) : b < this.minScaleDenominator ? a.setValue(this.minScaleDenominator) : (this.maxScaleDenominator = b, this.updateSliderValues())
                        },
                        scope: this
                    }
                });
                this.minScaleDenominatorInput = new Ext.form.NumberField({
                    allowNegative: !1,
                    width: 100,
                    fieldLabel: "1",
                    value: Math.round(this.minScaleDenominator),
                    disabled: !this.limitMinScaleDenominator,
                    validator: function(a) {
                        return ! this.limitMaxScaleDenominator || a < this.maxScaleDenominator
                    }.createDelegate(this),
                    listeners: {
                        valid: function(a) {
                            var a = Number(a.getValue()),
                            b = Math.round(this.minScaleDenominatorLimit);
                            if (a > b && a < this.maxScaleDenominator) this.minScaleDenominator = a,
                            this.updateSliderValues()
                        },
                        change: function(a) {
                            var b = Number(a.getValue()),
                            d = Math.round(this.minScaleDenominatorLimit);
                            b < d ? a.setValue(d) : b > this.maxScaleDenominator ? a.setValue(this.maxScaleDenominator) : (this.minScaleDenominator = b, this.updateSliderValues())
                        },
                        scope: this
                    }
                });
                this.items = [this.scaleSlider, {
                    xtype: "panel",
                    layout: "form",
                    defaults: {
                        border: !1
                    },
                    items: [{
                        labelWidth: 90,
                        layout: "form",
                        width: 150,
                        items: [{
                            xtype: "checkbox",
                            checked: !!this.limitMinScaleDenominator,
                            fieldLabel: this.maxScaleLimitText,
                            listeners: {
                                check: function(a, b) {
                                    this.limitMinScaleDenominator = b;
                                    var d = this.scaleSlider;
                                    d.setValue(1, 100);
                                    d.thumbs[1].el.setVisible(b);
                                    this.minScaleDenominatorInput.setDisabled(!b);
                                    this.updateScaleValues(d);
                                    d.setDisabled(!this.limitMinScaleDenominator && !this.limitMaxScaleDenominator)
                                },
                                scope: this
                            }
                        }]
                    },
                    {
                        labelWidth: 10,
                        layout: "form",
                        items: [this.minScaleDenominatorInput]
                    },
                    {
                        labelWidth: 90,
                        layout: "form",
                        items: [{
                            xtype: "checkbox",
                            checked: !!this.limitMaxScaleDenominator,
                            fieldLabel: this.minScaleLimitText,
                            listeners: {
                                check: function(a, b) {
                                    this.limitMaxScaleDenominator = b;
                                    var d = this.scaleSlider;
                                    d.setValue(0, 0);
                                    d.thumbs[0].el.setVisible(b);
                                    this.maxScaleDenominatorInput.setDisabled(!b);
                                    this.updateScaleValues(d);
                                    d.setDisabled(!this.limitMinScaleDenominator && !this.limitMaxScaleDenominator)
                                },
                                scope: this
                            }
                        }]
                    },
                    {
                        labelWidth: 10,
                        layout: "form",
                        items: [this.maxScaleDenominatorInput]
                    }]
                }];
                this.addEvents("change");
                gxp.ScaleLimitPanel.superclass.initComponent.call(this)
            },
            updateScaleValues: function(a) {
                if (!this.changing) {
                    var b = a.getValues(),
                    d = !1; ! this.limitMaxScaleDenominator && 0 < b[0] && (b[0] = 0, d = !0); ! this.limitMinScaleDenominator && 100 > b[1] && (b[1] = 100, d = !0);
                    d ? (a.setValue(0, b[0]), a.setValue(1, b[1])) : (b = this.sliderValuesToScale(b), a = b[0], b = b[1], this.changing = !0, this.minScaleDenominatorInput.setValue(b), this.maxScaleDenominatorInput.setValue(a), this.changing = !1, this.fireEvent("change", this, this.limitMinScaleDenominator ? b: void 0, this.limitMaxScaleDenominator ? a: void 0))
                }
            },
            updateSliderValues: function() {
                if (!this.changing) {
                    var a = this.minScaleDenominator,
                    b = this.maxScaleDenominator,
                    d = this.scaleToSliderValues([b, a]);
                    this.changing = !0;
                    this.scaleSlider.setValue(0, d[0]);
                    this.scaleSlider.setValue(1, d[1]);
                    this.changing = !1;
                    this.fireEvent("change", this, this.limitMinScaleDenominator ? a: void 0, this.limitMaxScaleDenominator ? b: void 0)
                }
            },
            sliderValuesToScale: function(a) {
                var b = 100 / (this.scaleLevels - 1);
                return [Math.round(Math.pow(this.scaleFactor, (100 - a[0]) / b) * this.minScaleDenominatorLimit), Math.round(Math.pow(this.scaleFactor, (100 - a[1]) / b) * this.minScaleDenominatorLimit)]
            },
            scaleToSliderValues: function(a) {
                var b = 100 / (this.scaleLevels - 1);
                return [100 - b * Math.log(a[0] / this.minScaleDenominatorLimit) / Math.log(this.scaleFactor), 100 - b * Math.log(a[1] / this.minScaleDenominatorLimit) / Math.log(this.scaleFactor)]
            }
        }); Ext.reg("gxp_scalelimitpanel", gxp.ScaleLimitPanel); Ext.namespace("gxp.slider"); gxp.slider.Tip = Ext.extend(Ext.slider.Tip, {
            hover: !0,
            dragging: !1,
            init: function(a) {
                if (this.hover) a.on("render", this.registerThumbListeners, this);
                this.slider = a;
                gxp.slider.Tip.superclass.init.apply(this, arguments)
            },
            registerThumbListeners: function() {
                for (var a = 0,
                b = this.slider.thumbs.length; a < b; ++a) this.slider.thumbs[a].el.on({
                    mouseover: this.createHoverListener(a),
                    mouseout: function() {
                        this.dragging || this.hide.apply(this, arguments)
                    },
                    scope: this
                })
            },
            createHoverListener: function(a) {
                return function() {
                    this.onSlide(this.slider, {},
                    this.slider.thumbs[a]);
                    this.dragging = !1
                }.createDelegate(this)
            },
            onSlide: function(a, b, d) {
                this.dragging = !0;
                gxp.slider.Tip.superclass.onSlide.apply(this, arguments)
            }
        }); Ext.namespace("gxp"); gxp.TextSymbolizer = Ext.extend(Ext.Panel, {
            fonts: void 0,
            symbolizer: null,
            defaultSymbolizer: null,
            attributes: null,
            colorManager: null,
            haloCache: null,
            border: !1,
            layout: "form",
            labelValuesText: "Label values",
            haloText: "Halo",
            sizeText: "Size",
            priorityText: "Priority",
            labelOptionsText: "Label options",
            autoWrapText: "Auto wrap",
            followLineText: "Follow line",
            maxDisplacementText: "Maximum displacement",
            repeatText: "Repeat",
            forceLeftToRightText: "Force left to right",
            graphicResizeText: "Graphic resize",
            graphicMarginText: "Graphic margin",
            graphicTitle: "Graphic",
            fontColorTitle: "Font color and opacity",
            positioningText: "Label positioning",
            anchorPointText: "Anchor point",
            displacementXText: "Displacement (X-direction)",
            displacementYText: "Displacement (Y-direction)",
            perpendicularOffsetText: "Perpendicular offset",
            priorityHelp: "The higher the value of the specified field, the sooner the label will be drawn (which makes it win in the conflict resolution game)",
            autoWrapHelp: "Wrap labels that exceed a certain length in pixels",
            followLineHelp: "Should the label follow the geometry of the line?",
            maxDisplacementHelp: "Maximum displacement in pixels if label position is busy",
            repeatHelp: "Repeat labels after a certain number of pixels",
            forceLeftToRightHelp: "Labels are usually flipped to make them readable. If the character happens to be a directional arrow then this is not desirable",
            graphic_resizeHelp: "Specifies a mode for resizing label graphics (such as highway shields) to fit the text of the label. The default mode, \u2018none\u2019, never modifies the label graphic. In stretch mode, GeoServer will resize the graphic to exactly surround the label text, possibly modifying the image\u2019s aspect ratio. In proportional mode, GeoServer will expand the image to be large enough to surround the text while preserving its original aspect ratio.",
            graphic_marginHelp: "Similar to the margin shorthand property in CSS for HTML, its interpretation varies depending on how many margin values are provided: 1 = use that margin length on all sides of the label 2 = use the first for top & bottom margins and the second for left & right margins. 3 = use the first for the top margin, second for left & right margins, third for the bottom margin. 4 = use the first for the top margin, second for the right margin, third for the bottom margin, and fourth for the left margin.",
            initComponent: function() {
                if (!this.symbolizer) this.symbolizer = {};
                Ext.applyIf(this.symbolizer, this.defaultSymbolizer);
                if (!this.symbolizer.vendorOptions) this.symbolizer.vendorOptions = {};
                this.haloCache = {};
                this.attributes.load();
                var a = {
                    xtype: "combo",
                    fieldLabel: this.labelValuesText,
                    store: this.attributes,
                    mode: "local",
                    lastQuery: "",
                    editable: !1,
                    triggerAction: "all",
                    allowBlank: !1,
                    displayField: "name",
                    valueField: "name",
                    value: this.symbolizer.label && this.symbolizer.label.replace(/^\${(.*)}$/, "$1"),
                    listeners: {
                        select: function(a, d) {
                            this.symbolizer.label = "${" + d.get("name") + "}";
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    },
                    width: 120
                };
                this.attributesComboConfig = this.attributesComboConfig || {};
                Ext.applyIf(this.attributesComboConfig, a);
                this.labelWidth = 80;
                this.items = [this.attributesComboConfig, {
                    cls: "x-html-editor-tb",
                    style: "background: transparent; border: none; padding: 0 0em 0.5em;",
                    xtype: "toolbar",
                    items: [{
                        xtype: "gxp_fontcombo",
                        fonts: this.fonts || void 0,
                        width: 110,
                        value: this.symbolizer.fontFamily,
                        listeners: {
                            select: function(a, d) {
                                this.symbolizer.fontFamily = d.get("field1");
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "tbtext",
                        text: this.sizeText + ": "
                    },
                    {
                        xtype: "numberfield",
                        allowNegative: !1,
                        emptyText: OpenLayers.Renderer.defaultSymbolizer.fontSize,
                        value: this.symbolizer.fontSize,
                        width: 30,
                        listeners: {
                            change: function(a, d) {
                                d = parseFloat(d);
                                isNaN(d) ? delete this.symbolizer.fontSize: this.symbolizer.fontSize = d;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        enableToggle: !0,
                        cls: "x-btn-icon",
                        iconCls: "x-edit-bold",
                        pressed: "bold" === this.symbolizer.fontWeight,
                        listeners: {
                            toggle: function(a, d) {
                                this.symbolizer.fontWeight = d ? "bold": "normal";
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        enableToggle: !0,
                        cls: "x-btn-icon",
                        iconCls: "x-edit-italic",
                        pressed: "italic" === this.symbolizer.fontStyle,
                        listeners: {
                            toggle: function(a, d) {
                                this.symbolizer.fontStyle = d ? "italic": "normal";
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }]
                },
                {
                    xtype: "gxp_fillsymbolizer",
                    fillText: this.fontColorTitle,
                    symbolizer: this.symbolizer,
                    colorProperty: "fontColor",
                    opacityProperty: "fontOpacity",
                    checkboxToggle: !1,
                    autoHeight: !0,
                    width: 213,
                    labelWidth: 70,
                    plugins: this.colorManager && [new this.colorManager],
                    listeners: {
                        change: function() {
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    }
                },
                {
                    xtype: "fieldset",
                    title: this.graphicTitle,
                    checkboxToggle: !0,
                    hideMode: "offsets",
                    collapsed: !(this.symbolizer.fillColor || this.symbolizer.fillOpacity),
                    labelWidth: 70,
                    items: [{
                        xtype: "gxp_pointsymbolizer",
                        symbolizer: this.symbolizer,
                        border: !1,
                        labelWidth: 70
                    },
                    this.createVendorSpecificField({
                        name: "graphic-resize",
                        xtype: "combo",
                        store: ["none", "stretch", "proportional"],
                        mode: "local",
                        width: 100,
                        triggerAction: "all",
                        fieldLabel: this.graphicResizeText
                    }), this.createVendorSpecificField({
                        name: "graphic-margin",
                        width: 100,
                        fieldLabel: this.graphicMarginText,
                        xtype: "textfield"
                    })],
                    listeners: {
                        collapse: function() {
                            this.graphicCache = {
                                externalGraphic: this.symbolizer.externalGraphic,
                                fillColor: this.symbolizer.fillColor,
                                fillOpacity: this.symbolizer.fillOpacity,
                                graphicName: this.symbolizer.graphicName,
                                pointRadius: this.symbolizer.pointRadius,
                                rotation: this.symbolizer.rotation,
                                strokeColor: this.symbolizer.strokeColor,
                                strokeWidth: this.symbolizer.strokeWidth,
                                strokeDashStyle: this.symbolizer.strokeDashStyle
                            };
                            delete this.symbolizer.externalGraphic;
                            delete this.symbolizer.fillColor;
                            delete this.symbolizer.fillOpacity;
                            delete this.symbolizer.graphicName;
                            delete this.symbolizer.pointRadius;
                            delete this.symbolizer.rotation;
                            delete this.symbolizer.strokeColor;
                            delete this.symbolizer.strokeWidth;
                            delete this.symbolizer.strokeDashStyle;
                            this.fireEvent("change", this.symbolizer)
                        },
                        expand: function() {
                            Ext.apply(this.symbolizer, this.graphicCache);
                            this.doLayout();
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    }
                },
                {
                    xtype: "fieldset",
                    title: this.haloText,
                    checkboxToggle: !0,
                    collapsed: !(this.symbolizer.haloRadius || this.symbolizer.haloColor || this.symbolizer.haloOpacity),
                    autoHeight: !0,
                    labelWidth: 50,
                    items: [{
                        xtype: "numberfield",
                        fieldLabel: this.sizeText,
                        anchor: "89%",
                        allowNegative: !1,
                        emptyText: OpenLayers.Renderer.defaultSymbolizer.haloRadius,
                        value: this.symbolizer.haloRadius,
                        listeners: {
                            change: function(a, d) {
                                d = parseFloat(d);
                                isNaN(d) ? delete this.symbolizer.haloRadius: this.symbolizer.haloRadius = d;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "gxp_fillsymbolizer",
                        symbolizer: {
                            fillColor: "haloColor" in this.symbolizer ? this.symbolizer.haloColor: OpenLayers.Renderer.defaultSymbolizer.haloColor,
                            fillOpacity: "haloOpacity" in this.symbolizer ? this.symbolizer.haloOpacity: 100 * OpenLayers.Renderer.defaultSymbolizer.haloOpacity
                        },
                        defaultColor: OpenLayers.Renderer.defaultSymbolizer.haloColor,
                        checkboxToggle: !1,
                        width: 190,
                        labelWidth: 60,
                        plugins: this.colorManager && [new this.colorManager],
                        listeners: {
                            change: function(a) {
                                this.symbolizer.haloColor = a.fillColor;
                                this.symbolizer.haloOpacity = a.fillOpacity;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }],
                    listeners: {
                        collapse: function() {
                            this.haloCache = {
                                haloRadius: this.symbolizer.haloRadius,
                                haloColor: this.symbolizer.haloColor,
                                haloOpacity: this.symbolizer.haloOpacity
                            };
                            delete this.symbolizer.haloRadius;
                            delete this.symbolizer.haloColor;
                            delete this.symbolizer.haloOpacity;
                            this.fireEvent("change", this.symbolizer)
                        },
                        expand: function() {
                            Ext.apply(this.symbolizer, this.haloCache);
                            this.doLayout();
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    }
                },
                {
                    xtype: "fieldset",
                    title: this.positioningText,
                    checkboxToggle: !0,
                    collapsed: !0,
                    autoHeight: !0,
                    labelWidth: 75,
                    defaults: {
                        width: 100
                    },
                    items: [Ext.applyIf({
                        fieldLabel: this.anchorPointText,
                        value: this.symbolizer.labelAlign || "lb",
                        store: [["lt", "Left-top"], ["ct", "Center-top"], ["rt", "Right-top"], ["lm", "Left-center"], ["cm", "Center"], ["rm", "Right-center"], ["lb", "Left-bottom"], ["cb", "Center-bottom"], ["rb", "Right-bottom"]],
                        listeners: {
                            select: function(a) {
                                this.symbolizer.labelAlign = a.getValue();
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    this.attributesComboConfig), {
                        xtype: "numberfield",
                        fieldLabel: this.displacementXText,
                        value: this.symbolizer.labelXOffset,
                        listeners: {
                            change: function(a, d) {
                                this.symbolizer.labelXOffset = d;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "numberfield",
                        fieldLabel: this.displacementYText,
                        value: this.symbolizer.labelYOffset,
                        listeners: {
                            change: function(a, d) {
                                this.symbolizer.labelYOffset = d;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "numberfield",
                        fieldLabel: this.perpendicularOffsetText,
                        value: this.symbolizer.labelPerpendicularOffset,
                        listeners: {
                            change: function(a, d) {
                                Ext.isEmpty(d) ? delete this.symbolizer.labelPerpendicularOffset: this.symbolizer.labelPerpendicularOffset = d;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }]
                },
                {
                    xtype: "fieldset",
                    title: this.priorityText,
                    checkboxToggle: !0,
                    collapsed: !0,
                    autoHeight: !0,
                    labelWidth: 50,
                    items: [Ext.applyIf({
                        fieldLabel: this.priorityText,
                        value: this.symbolizer.priority && this.symbolizer.priority.replace(/^\${(.*)}$/, "$1"),
                        allowBlank: !0,
                        name: "priority",
                        listeners: {
                            select: function(a, d) {
                                this.symbolizer[a.name] = "${" + d.get("name") + "}";
                                this.fireEvent("change", this.symbolizer)
                            },
                            render: this.attachHelpToField,
                            scope: this
                        }
                    },
                    this.attributesComboConfig)]
                },
                {
                    xtype: "fieldset",
                    title: this.labelOptionsText,
                    checkboxToggle: !0,
                    collapsed: !0,
                    autoHeight: !0,
                    labelWidth: 80,
                    defaults: {
                        width: 100
                    },
                    items: [this.createVendorSpecificField({
                        name: "autoWrap",
                        allowBlank: !1,
                        fieldLabel: this.autoWrapText
                    }), this.createVendorSpecificField({
                        name: "followLine",
                        xtype: "checkbox",
                        fieldLabel: this.followLineText
                    }), this.createVendorSpecificField({
                        name: "maxDisplacement",
                        fieldLabel: this.maxDisplacementText
                    }), this.createVendorSpecificField({
                        name: "repeat",
                        fieldLabel: this.repeatText
                    }), this.createVendorSpecificField({
                        name: "forceLeftToRight",
                        xtype: "checkbox",
                        fieldLabel: this.forceLeftToRightText
                    })]
                }];
                this.addEvents("change");
                gxp.TextSymbolizer.superclass.initComponent.call(this)
            },
            createVendorSpecificField: function(a) {
                var b = function(b, e) {
                    Ext.isEmpty(e) ? delete this.symbolizer.vendorOptions[a.name] : this.symbolizer.vendorOptions[a.name] = e;
                    this.fireEvent("change", this.symbolizer)
                };
                return Ext.applyIf(a, {
                    xtype: "numberfield",
                    allowNegative: !1,
                    value: this.symbolizer.vendorOptions[a.name],
                    listeners: {
                        render: this.attachHelpToField,
                        change: b,
                        check: b,
                        scope: this
                    }
                })
            },
            attachHelpToField: function(a) {
                var b = a.name.replace(/-/g, "_") + "Help";
                Ext.QuickTips.register({
                    target: a.getEl(),
                    dismissDelay: 2E4,
                    text: this[b]
                })
            }
        }); Ext.reg("gxp_textsymbolizer", gxp.TextSymbolizer); Ext.namespace("gxp"); gxp.FillSymbolizer = Ext.extend(Ext.FormPanel, {
            symbolizer: null,
            colorProperty: "fillColor",
            opacityProperty: "fillOpacity",
            colorManager: null,
            checkboxToggle: !0,
            defaultColor: null,
            border: !1,
            fillText: "Fill",
            colorText: "Color",
            opacityText: "Opacity",
            initComponent: function() {
                if (!this.symbolizer) this.symbolizer = {};
                var a;
                this.colorManager && (a = [new this.colorManager]);
                var b = 100;
                this.opacityProperty in this.symbolizer ? b = this.symbolizer[this.opacityProperty] : OpenLayers.Renderer.defaultSymbolizer[this.opacityProperty] && (b = 100 * OpenLayers.Renderer.defaultSymbolizer[this.opacityProperty]);
                this.items = [{
                    xtype: "fieldset",
                    title: this.fillText,
                    autoHeight: !0,
                    checkboxToggle: this.checkboxToggle,
                    collapsed: !0 === this.checkboxToggle && !1 === this.symbolizer.fill,
                    hideMode: "offsets",
                    defaults: {
                        width: 100
                    },
                    items: [{
                        xtype: "gxp_colorfield",
                        fieldLabel: this.colorText,
                        name: "color",
                        emptyText: OpenLayers.Renderer.defaultSymbolizer[this.colorProperty],
                        value: this.symbolizer[this.colorProperty],
                        defaultBackground: this.defaultColor || OpenLayers.Renderer.defaultSymbolizer[this.colorProperty],
                        plugins: a,
                        listeners: {
                            valid: function(a) {
                                var a = a.getValue(),
                                b = this.symbolizer[this.colorProperty] != a;
                                this.symbolizer[this.colorProperty] = a;
                                b && this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "slider",
                        fieldLabel: this.opacityText,
                        name: "opacity",
                        values: [b],
                        isFormField: !0,
                        listeners: {
                            changecomplete: function(a, b) {
                                this.symbolizer[this.opacityProperty] = b / 100;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        },
                        plugins: [new GeoExt.SliderTip({
                            getText: function(a) {
                                return a.value + "%"
                            }
                        })]
                    }],
                    listeners: {
                        collapse: function() {
                            if (!1 !== this.symbolizer.fill) this.symbolizer.fill = !1,
                            this.fireEvent("change", this.symbolizer)
                        },
                        expand: function() {
                            this.symbolizer.fill = !0;
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    }
                }];
                this.addEvents("change");
                gxp.FillSymbolizer.superclass.initComponent.call(this)
            }
        }); Ext.reg("gxp_fillsymbolizer", gxp.FillSymbolizer); Ext.namespace("gxp.form"); gxp.form.ColorField = Ext.extend(Ext.form.TextField, {
            cssColors: {
                aqua: "#00FFFF",
                black: "#000000",
                blue: "#0000FF",
                fuchsia: "#FF00FF",
                gray: "#808080",
                green: "#008000",
                lime: "#00FF00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#FF0000",
                silver: "#C0C0C0",
                teal: "#008080",
                white: "#FFFFFF",
                yellow: "#FFFF00"
            },
            defaultBackground: "#ffffff",
            initComponent: function() {
                if (this.value) this.value = this.hexToColor(this.value);
                gxp.form.ColorField.superclass.initComponent.call(this);
                this.on({
                    render: this.colorField,
                    valid: this.colorField,
                    scope: this
                })
            },
            isDark: function(a) {
                var b = !1;
                if (a) var b = parseInt(a.substring(1, 3), 16) / 255,
                d = parseInt(a.substring(3, 5), 16) / 255,
                a = parseInt(a.substring(5, 7), 16) / 255,
                b = 0.5 > 0.299 * b + 0.587 * d + 0.144 * a;
                return b
            },
            colorField: function() {
                var a = this.colorToHex(this.getValue()) || this.defaultBackground;
                this.getEl().setStyle({
                    background: a,
                    color: this.isDark(a) ? "#ffffff": "#000000"
                })
            },
            getHexValue: function() {
                return this.colorToHex(gxp.form.ColorField.superclass.getValue.apply(this, arguments))
            },
            getValue: function() {
                var a = this.getHexValue(),
                b = this.initialConfig.value;
                a === this.hexToColor(b) && (a = b);
                return a
            },
            setValue: function(a) {
                gxp.form.ColorField.superclass.setValue.apply(this, [this.hexToColor(a)])
            },
            colorToHex: function(a) {
                return ! a ? a: a.match(/^#[0-9a-f]{6}$/i) ? a: this.cssColors[a.toLowerCase()] || null
            },
            hexToColor: function(a) {
                if (!a) return a;
                for (var b in this.cssColors) if (this.cssColors[b] == a.toUpperCase()) {
                    a = b;
                    break
                }
                return a
            }
        }); Ext.reg("gxp_colorfield", gxp.form.ColorField); Ext.namespace("gxp.form"); gxp.form.FontComboBox = Ext.extend(Ext.form.ComboBox, {
            fonts: "Arial Unicode MS,Serif,SansSerif,Arial,Courier New,Tahoma,Times New Roman,Verdana".split(","),
            defaultFont: "Serif",
            allowBlank: !1,
            mode: "local",
            triggerAction: "all",
            editable: !1,
            initComponent: function() {
                var a = this.fonts || gxp.form.FontComboBox.prototype.fonts,
                b = this.defaultFont; - 1 === a.indexOf(this.defaultFont) && (b = a[0]);
                a = {
                    displayField: "field1",
                    valueField: "field1",
                    store: a,
                    value: b,
                    tpl: new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item"><span style="font-family: {field1};">{field1}</span></div></tpl>')
                };
                Ext.applyIf(this, a);
                gxp.form.FontComboBox.superclass.initComponent.call(this)
            }
        }); Ext.reg("gxp_fontcombo", gxp.form.FontComboBox); Ext.namespace("gxp"); gxp.PolygonSymbolizer = Ext.extend(Ext.Panel, {
            symbolizer: null,
            initComponent: function() {
                this.items = [{
                    xtype: "gxp_fillsymbolizer",
                    symbolizer: this.symbolizer,
                    listeners: {
                        change: function() {
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    }
                },
                {
                    xtype: "gxp_strokesymbolizer",
                    symbolizer: this.symbolizer,
                    listeners: {
                        change: function() {
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    }
                }];
                this.addEvents("change");
                gxp.PolygonSymbolizer.superclass.initComponent.call(this)
            }
        }); Ext.reg("gxp_polygonsymbolizer", gxp.PolygonSymbolizer); Ext.namespace("gxp"); gxp.StrokeSymbolizer = Ext.extend(Ext.FormPanel, {
            solidStrokeName: "solid",
            dashStrokeName: "dash",
            dotStrokeName: "dot",
            titleText: "Stroke",
            styleText: "Style",
            colorText: "Color",
            widthText: "Width",
            opacityText: "Opacity",
            symbolizer: null,
            colorManager: null,
            checkboxToggle: !0,
            defaultColor: null,
            dashStyles: null,
            border: !1,
            initComponent: function() {
                this.dashStyles = this.dashStyles || [["solid", this.solidStrokeName], ["4 4", this.dashStrokeName], ["2 4", this.dotStrokeName]];
                if (!this.symbolizer) this.symbolizer = {};
                var a;
                this.colorManager && (a = [new this.colorManager]);
                this.items = [{
                    xtype: "fieldset",
                    title: this.titleText,
                    autoHeight: !0,
                    checkboxToggle: this.checkboxToggle,
                    collapsed: !0 === this.checkboxToggle && !1 === this.symbolizer.stroke,
                    hideMode: "offsets",
                    defaults: {
                        width: 100
                    },
                    items: [{
                        xtype: "combo",
                        name: "style",
                        fieldLabel: this.styleText,
                        store: new Ext.data.SimpleStore({
                            data: this.dashStyles,
                            fields: ["value", "display"]
                        }),
                        displayField: "display",
                        valueField: "value",
                        value: this.getDashArray(this.symbolizer.strokeDashstyle) || OpenLayers.Renderer.defaultSymbolizer.strokeDashstyle,
                        mode: "local",
                        allowBlank: !0,
                        triggerAction: "all",
                        editable: !1,
                        listeners: {
                            select: function(a, d) {
                                this.symbolizer.strokeDashstyle = d.get("value");
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "gxp_colorfield",
                        name: "color",
                        fieldLabel: this.colorText,
                        emptyText: OpenLayers.Renderer.defaultSymbolizer.strokeColor,
                        value: this.symbolizer.strokeColor,
                        defaultBackground: this.defaultColor || OpenLayers.Renderer.defaultSymbolizer.strokeColor,
                        plugins: a,
                        listeners: {
                            valid: function(a) {
                                var a = a.getValue(),
                                d = this.symbolizer.strokeColor != a;
                                this.symbolizer.strokeColor = a;
                                d && this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "numberfield",
                        name: "width",
                        fieldLabel: this.widthText,
                        allowNegative: !1,
                        emptyText: OpenLayers.Renderer.defaultSymbolizer.strokeWidth,
                        value: this.symbolizer.strokeWidth,
                        listeners: {
                            change: function(a, d) {
                                d = parseFloat(d);
                                isNaN(d) ? delete this.symbolizer.strokeWidth: this.symbolizer.strokeWidth = d;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "slider",
                        name: "opacity",
                        fieldLabel: this.opacityText,
                        values: [100 * ("strokeOpacity" in this.symbolizer ? this.symbolizer.strokeOpacity: OpenLayers.Renderer.defaultSymbolizer.strokeOpacity)],
                        isFormField: !0,
                        listeners: {
                            changecomplete: function(a, d) {
                                this.symbolizer.strokeOpacity = d / 100;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        },
                        plugins: [new GeoExt.SliderTip({
                            getText: function(a) {
                                return a.value + "%"
                            }
                        })]
                    }],
                    listeners: {
                        collapse: function() {
                            if (!1 !== this.symbolizer.stroke) this.symbolizer.stroke = !1,
                            this.fireEvent("change", this.symbolizer)
                        },
                        expand: function() {
                            this.symbolizer.stroke = !0;
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    }
                }];
                this.addEvents("change");
                gxp.StrokeSymbolizer.superclass.initComponent.call(this)
            },
            getDashArray: function(a) {
                var b;
                a && (a = a.split(/\s+/), a = a[0] / a[1], isNaN(a) || (b = 1 <= a ? "4 4": "2 4"));
                return b
            }
        }); Ext.reg("gxp_strokesymbolizer", gxp.StrokeSymbolizer); Ext.namespace("gxp"); gxp.LineSymbolizer = Ext.extend(Ext.Panel, {
            symbolizer: null,
            initComponent: function() {
                this.items = [{
                    xtype: "gxp_strokesymbolizer",
                    symbolizer: this.symbolizer,
                    listeners: {
                        change: function() {
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    }
                }];
                this.addEvents("change");
                gxp.LineSymbolizer.superclass.initComponent.call(this)
            }
        }); Ext.reg("gxp_linesymbolizer", gxp.LineSymbolizer); Ext.namespace("gxp"); gxp.PointSymbolizer = Ext.extend(Ext.Panel, {
            symbolizer: null,
            graphicCircleText: "circle",
            graphicSquareText: "square",
            graphicTriangleText: "triangle",
            graphicStarText: "star",
            graphicCrossText: "cross",
            graphicXText: "x",
            graphicExternalText: "external",
            urlText: "URL",
            opacityText: "opacity",
            symbolText: "Symbol",
            sizeText: "Size",
            rotationText: "Rotation",
            pointGraphics: null,
            colorManager: null,
            external: null,
            layout: "form",
            initComponent: function() {
                if (!this.symbolizer) this.symbolizer = {};
                if (!this.pointGraphics) this.pointGraphics = [{
                    display: this.graphicCircleText,
                    value: "circle",
                    mark: !0
                },
                {
                    display: this.graphicSquareText,
                    value: "square",
                    mark: !0
                },
                {
                    display: this.graphicTriangleText,
                    value: "triangle",
                    mark: !0
                },
                {
                    display: this.graphicStarText,
                    value: "star",
                    mark: !0
                },
                {
                    display: this.graphicCrossText,
                    value: "cross",
                    mark: !0
                },
                {
                    display: this.graphicXText,
                    value: "x",
                    mark: !0
                },
                {
                    display: this.graphicExternalText
                }];
                this.external = !!this.symbolizer.externalGraphic;
                this.markPanel = new Ext.Panel({
                    border: !1,
                    collapsed: this.external,
                    layout: "form",
                    items: [{
                        xtype: "gxp_fillsymbolizer",
                        symbolizer: this.symbolizer,
                        labelWidth: this.labelWidth,
                        labelAlign: this.labelAlign,
                        colorManager: this.colorManager,
                        listeners: {
                            change: function() {
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "gxp_strokesymbolizer",
                        symbolizer: this.symbolizer,
                        labelWidth: this.labelWidth,
                        labelAlign: this.labelAlign,
                        colorManager: this.colorManager,
                        listeners: {
                            change: function() {
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        }
                    }]
                });
                this.urlField = new Ext.form.TextField({
                    name: "url",
                    fieldLabel: this.urlText,
                    value: this.symbolizer.externalGraphic,
                    hidden: !0,
                    listeners: {
                        change: function(a, b) {
                            this.symbolizer.externalGraphic = b;
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    },
                    width: 100
                });
                this.graphicPanel = new Ext.Panel({
                    border: !1,
                    collapsed: !this.external,
                    layout: "form",
                    items: [this.urlField, {
                        xtype: "slider",
                        name: "opacity",
                        fieldLabel: this.opacityText,
                        value: [null == this.symbolizer.graphicOpacity ? 100 : 100 * this.symbolizer.graphicOpacity],
                        isFormField: !0,
                        listeners: {
                            changecomplete: function(a, b) {
                                this.symbolizer.graphicOpacity = b / 100;
                                this.fireEvent("change", this.symbolizer)
                            },
                            scope: this
                        },
                        plugins: [new GeoExt.SliderTip({
                            getText: function(a) {
                                return a.value + "%"
                            }
                        })],
                        width: 100
                    }]
                });
                this.items = [{
                    xtype: "combo",
                    name: "mark",
                    fieldLabel: this.symbolText,
                    store: new Ext.data.JsonStore({
                        data: {
                            root: this.pointGraphics
                        },
                        root: "root",
                        fields: ["value", "display", "preview", {
                            name: "mark",
                            type: "boolean"
                        }]
                    }),
                    value: this.external ? 0 : this.symbolizer.graphicName,
                    displayField: "display",
                    valueField: "value",
                    tpl: new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item gx-pointsymbolizer-mark-item"><tpl if="preview"><img src="{preview}" alt="{display}"/></tpl><span>{display}</span></div></tpl>'),
                    mode: "local",
                    allowBlank: !1,
                    triggerAction: "all",
                    editable: !1,
                    listeners: {
                        select: function(a, b) {
                            var d = b.get("mark"),
                            e = b.get("value");
                            if (d) {
                                if (this.external) this.external = !1,
                                delete this.symbolizer.externalGraphic,
                                this.updateGraphicDisplay();
                                this.symbolizer.graphicName = e
                            } else if (e ? (this.urlField.hide(), this.urlField.getEl().up(".x-form-item").setDisplayed(!1), this.symbolizer.externalGraphic = e) : (this.urlField.show(), this.urlField.getEl().up(".x-form-item").setDisplayed(!0)), !this.external) this.external = !0,
                            this.updateGraphicDisplay();
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    },
                    width: 100
                },
                {
                    xtype: "textfield",
                    name: "size",
                    fieldLabel: this.sizeText,
                    value: this.symbolizer.pointRadius && 2 * this.symbolizer.pointRadius,
                    listeners: {
                        change: function(a, b) {
                            this.symbolizer.pointRadius = b / 2;
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    },
                    width: 100
                },
                {
                    xtype: "textfield",
                    name: "rotation",
                    fieldLabel: this.rotationText,
                    value: this.symbolizer.rotation,
                    listeners: {
                        change: function(a, b) {
                            this.symbolizer.rotation = b;
                            this.fireEvent("change", this.symbolizer)
                        },
                        scope: this
                    },
                    width: 100
                },
                this.markPanel, this.graphicPanel];
                this.addEvents("change");
                gxp.PointSymbolizer.superclass.initComponent.call(this)
            },
            updateGraphicDisplay: function() {
                this.external ? (this.markPanel.collapse(), this.graphicPanel.expand()) : (this.graphicPanel.collapse(), this.markPanel.expand())
            }
        }); Ext.reg("gxp_pointsymbolizer", gxp.PointSymbolizer); Ext.namespace("gxp"); gxp.GoogleEarthPanel = Ext.extend(Ext.Panel, {
            HORIZONTAL_FIELD_OF_VIEW: 30 * Math.PI / 180,
            map: null,
            mapPanel: null,
            layers: null,
            earth: null,
            projection: null,
            layerCache: null,
            initComponent: function() {
                this.addEvents("beforeadd", "pluginfailure", "pluginready");
                gxp.GoogleEarthPanel.superclass.initComponent.call(this);
                var a = this.mapPanel;
                a && !(a instanceof GeoExt.MapPanel) && (a = Ext.getCmp(a));
                if (!a) throw Error("Could not get map panel from config: " + this.mapPanel);
                this.map = a.map;
                this.layers = a.layers;
                this.projection = new OpenLayers.Projection("EPSG:4326");
                this.on("render", this.onRenderEvent, this);
                this.on("show", this.onShowEvent, this);
                this.on("hide",
                function() {
                    null != this.earth && this.updateMap();
                    this.body.dom.innerHTML = "";
                    this.earth = null
                },
                this)
            },
            onEarthReady: function(a) {
                this.earth = a;
                void 0 === this.flyToSpeed ? this.earth.getOptions().setFlyToSpeed(this.earth.SPEED_TELEPORT) : null !== this.flyToSpeed && this.earth.getOptions().setFlyToSpeed(this.flyToSpeed);
                this.resetCamera();
                this.setExtent(this.map.getExtent());
                this.earth.getNavigationControl().setVisibility(this.earth.VISIBILITY_SHOW);
                a = this.earth.getNavigationControl().getScreenXY();
                a.setXUnits(this.earth.UNITS_PIXELS);
                a.setYUnits(this.earth.UNITS_INSET_PIXELS);
                this.earth.getWindow().setVisibility(!0);
                this.layers.each(function(a) {
                    this.addLayer(a)
                },
                this);
                this.layers.on("remove", this.updateLayers, this);
                this.layers.on("update", this.updateLayers, this);
                this.layers.on("add", this.updateLayers, this);
                this.fireEvent("pluginready", this.earth)
            },
            onRenderEvent: function() {
                var a = this.ownerCt && this.ownerCt.layout instanceof Ext.layout.CardLayout;
                if (!this.hidden && !a) this.onShowEvent()
            },
            onShowEvent: function() {
                if (this.rendered) this.layerCache = {},
                google.earth.createInstance(this.body.dom, this.onEarthReady.createDelegate(this),
                function(a) {
                    this.fireEvent("pluginfailure", this, a)
                }.createDelegate(this))
            },
            beforeDestroy: function() {
                this.layers.un("remove", this.updateLayers, this);
                this.layers.un("update", this.updateLayers, this);
                this.layers.un("add", this.updateLayers, this);
                gxp.GoogleEarthPanel.superclass.beforeDestroy.call(this)
            },
            updateLayers: function() {
                if (this.earth) {
                    for (var a = this.earth.getFeatures(), b = a.getFirstChild(); null != b;) a.removeChild(b),
                    b = a.getFirstChild();
                    this.layers.each(function(a) {
                        this.addLayer(a)
                    },
                    this)
                }
            },
            addLayer: function(a, b) {
                var d = a.getLayer(),
                e = d && d.url;
                if (this.earth && d instanceof OpenLayers.Layer.WMS && "string" == typeof e && !1 !== this.fireEvent("beforeadd", a)) {
                    var g = d.id;
                    if (this.layerCache[g]) e = this.layerCache[g];
                    else {
                        var j = this.earth.createLink("kl_" + g),
                        e = e.replace(/\?.*/, ""),
                        k = d.params;
                        j.setHref(e + ("/kml?mode=refresh&layers=" + k.LAYERS + "&styles=" + k.STYLES));
                        e = this.earth.createNetworkLink("nl_" + g);
                        e.setName(g);
                        e.set(j, !1, !1);
                        this.layerCache[g] = e
                    }
                    e.setVisibility(d.getVisibility());
                    void 0 !== b && b < this.earth.getFeatures().getChildNodes().getLength() ? this.earth.getFeatures().insertBefore(this.earth.getFeatures().getChildNodes().item(b)) : this.earth.getFeatures().appendChild(e)
                }
            },
            setExtent: function(a) {
                var a = a.transform(this.map.getProjectionObject(), this.projection),
                b = a.getCenterLonLat(),
                a = this.getExtentWidth(a) / (2 * Math.tan(this.HORIZONTAL_FIELD_OF_VIEW)),
                d = this.earth.getView().copyAsLookAt(this.earth.ALTITUDE_RELATIVE_TO_GROUND);
                d.setLatitude(b.lat);
                d.setLongitude(b.lon);
                d.setRange(a);
                this.earth.getView().setAbstractView(d)
            },
            resetCamera: function() {
                var a = this.earth.getView().copyAsCamera(this.earth.ALTITUDE_RELATIVE_TO_GROUND);
                a.setRoll(0);
                a.setHeading(0);
                a.setTilt(0);
                this.earth.getView().setAbstractView(a)
            },
            getExtent: function() {
                var a = this.earth.getView().getViewportGlobeBounds();
                return new OpenLayers.Bounds(a.getWest(), a.getSouth(), a.getEast(), a.getNorth())
            },
            updateMap: function() {
                var a = this.earth.getView().copyAsLookAt(this.earth.ALTITUDE_RELATIVE_TO_GROUND),
                b = this.reprojectToMap(new OpenLayers.LonLat(a.getLongitude(), a.getLatitude()));
                this.map.zoomToExtent(this.reprojectToMap(this.getExtent()), !0);
                this.map.setCenter(b);
                var a = 2 * a.getRange() * Math.tan(this.HORIZONTAL_FIELD_OF_VIEW),
                d = this.map.getResolutionForZoom(this.map.getZoom() + 1),
                e = this.map.getExtent(),
                b = new OpenLayers.Bounds(b.lon - this.map.getSize().w / 2 * d, b.lat + this.map.getSize().h / 2 * d, b.lon + this.map.getSize().w / 2 * d, b.lat - this.map.getSize().h / 2 * d),
                e = Math.abs(this.getExtentWidth(e) - a);
                Math.abs(this.getExtentWidth(b) - a) < e && this.map.zoomTo(this.map.getZoom() + 1)
            },
            getExtentWidth: function(a) {
                var b = a.getCenterLonLat(),
                d = new OpenLayers.LonLat(a.left, b.lat),
                a = new OpenLayers.LonLat(a.right, b.lat);
                return 1E3 * OpenLayers.Util.distVincenty(d, a)
            },
            reprojectToGE: function(a) {
                return a.clone().transform(this.map.getProjectionObject(), this.projection)
            },
            reprojectToMap: function(a) {
                return a.clone().transform(this.projection, this.map.getProjectionObject())
            }
        }); Ext.reg("gxp_googleearthpanel", gxp.GoogleEarthPanel); Ext.namespace("gxp"); gxp.GoogleStreetViewPanel = Ext.extend(Ext.Panel, {
            panorama: null,
            heading: 0,
            pitch: 0,
            zoom: 0,
            location: null,
            initComponent: function() {
                Ext.applyIf(this, {
                    plain: !0,
                    border: !1
                });
                return gxp.GoogleStreetViewPanel.superclass.initComponent.call(this)
            },
            afterRender: function() {
                var a = this.ownerCt;
                a && (a = a.getSize(), Ext.applyIf(this, a), this.location || GeoExt.Popup && this.bubble(function(a) {
                    if (a instanceof GeoExt.Popup) return this.location = a.location.clone().transform(a.map.getProjectionObject(), new OpenLayers.Projection("EPSG:4326")),
                    !1
                },
                this));
                gxp.GoogleStreetViewPanel.superclass.afterRender.call(this);
                a = {
                    position: new google.maps.LatLng(this.location.lat, this.location.lon),
                    pov: {
                        heading: this.heading,
                        pitch: this.pitch,
                        zoom: this.zoom
                    }
                };
                this.panorama = new google.maps.StreetViewPanorama(this.body.dom, a)
            },
            beforeDestroy: function() {
                delete this.panorama;
                gxp.GoogleStreetViewPanel.superclass.beforeDestroy.apply(this, arguments)
            },
            onResize: function(a, b) {
                gxp.GoogleStreetViewPanel.superclass.onResize.apply(this, arguments);
                this.panorama && "object" == typeof this.panorama && google.maps.event.trigger(this.panorama, "resize")
            },
            setSize: function(a, b, d) {
                gxp.GoogleStreetViewPanel.superclass.setSize.apply(this, arguments);
                this.panorama && "object" == typeof this.panorama && google.maps.event.trigger(this.panorama, "resize")
            }
        }); Ext.reg("gxp_googlestreetviewpanel", gxp.GoogleStreetViewPanel); Ext.namespace("gxp"); gxp.NewSourceWindow = Ext.extend(Ext.Window, {
            title: "Add New Server...",
            cancelText: "Cancel",
            addServerText: "Add Server",
            addWMSText: "WMS",
            addArcText: "ArcGIS REST",
            invalidURLText: "Enter a valid URL to a WMS endpoint (e.g. http://example.com/geoserver/wms)",
            contactingServerText: "Contacting Server...",
            bodyStyle: "padding: 0px",
            width: 300,
            closeAction: "hide",
            error: null,
            initComponent: function() {
                this.addEvents("server-added");
                this.urlTextField = new Ext.form.TextField({
                    fieldLabel: "URL",
                    allowBlank: !1,
                    width: 240,
                    msgTarget: "under",
                    validator: this.urlValidator.createDelegate(this)
                });
                this.sourceTypeRadioList = new Ext.form.RadioGroup({
                    fieldLabel: "Type",
                    columns: [50, 190],
                    items: [{
                        name: "source_type",
                        inputValue: "gxp_wmscsource",
                        boxLabel: this.addWMSText,
                        checked: !0
                    },
                    {
                        name: "source_type",
                        inputValue: "gxp_arcrestsource",
                        boxLabel: this.addArcText
                    }]
                });
                this.form = new Ext.form.FormPanel({
                    items: [this.urlTextField, this.sourceTypeRadioList],
                    border: !1,
                    labelWidth: 30,
                    bodyStyle: "padding: 5px",
                    autoWidth: !0,
                    autoHeight: !0
                });
                this.bbar = [new Ext.Button({
                    text: this.cancelText,
                    handler: function() {
                        this.hide()
                    },
                    scope: this
                }), new Ext.Toolbar.Fill, new Ext.Button({
                    text: this.addServerText,
                    iconCls: "add",
                    handler: function() {
                        this.error = null;
                        this.urlTextField.validate() && this.fireEvent("server-added", this.urlTextField.getValue(), this.sourceTypeRadioList.getValue().inputValue)
                    },
                    scope: this
                })];
                this.items = this.form;
                gxp.NewSourceWindow.superclass.initComponent.call(this);
                this.form.on("render",
                function() {
                    this.loadMask = new Ext.LoadMask(this.form.getEl(), {
                        msg: this.contactingServerText
                    })
                },
                this);
                this.on("hide",
                function() {
                    this.error = null;
                    this.urlTextField.validate();
                    this.urlTextField.setValue("");
                    this.loadMask.hide()
                },
                this);
                this.on("server-added",
                function(a, b) {
                    this.setLoading();
                    this.addSource(a, b,
                    function() {
                        this.hide()
                    },
                    function() {
                        this.setError(this.sourceLoadFailureMessage)
                    },
                    this)
                },
                this)
            },
            urlRegExp: /^(http(s)?:)?\/\/([\w%]+:[\w%]+@)?([^@\/:]+)(:\d+)?\//i,
            urlValidator: function(a) {
                a = this.urlRegExp.test(a) ? !this.error || this.error: this.invalidURLText;
                this.error = null;
                return a
            },
            setLoading: function() {
                this.loadMask.show()
            },
            setError: function(a) {
                this.loadMask.hide();
                this.error = a;
                this.urlTextField.validate()
            },
            addSource: function() {}
        }); Ext.namespace("gxp"); gxp.Viewer = Ext.extend(Ext.util.Observable, {
            defaultToolType: "gxp_tool",
            tools: null,
            selectedLayer: null,
            authenticate: null,
            constructor: function(a) {
                this.addEvents("ready", "portalready", "beforelayerselectionchange", "layerselectionchange", "featureedit", "authorizationchange");
                Ext.apply(this, {
                    layerSources: {},
                    portalItems: []
                });
                this.createLayerRecordQueue = []; (a.loadConfig || this.loadConfig).call(this, a, this.applyConfig);
                gxp.Viewer.superclass.constructor.apply(this, arguments)
            },
            selectLayer: function(a) {
                var a = a || null,
                b = !1;
                if (!1 !== this.fireEvent("beforelayerselectionchange", a)) b = !0,
                this.selectedLayer && this.selectedLayer.set("selected", !1),
                (this.selectedLayer = a) && this.selectedLayer.set("selected", !0),
                this.fireEvent("layerselectionchange", a);
                return b
            },
            loadConfig: function(a) {
                this.applyConfig(a)
            },
            applyConfig: function(a) {
                this.initialConfig = Ext.apply({},
                a);
                Ext.apply(this, this.initialConfig);
                this.load()
            },
            load: function() {
                if (this.proxy) OpenLayers.ProxyHost = this.proxy;
                this.initMapPanel();
                this.initTools();
                var a = [],
                b;
                for (b in this.sources) a.push(this.createSourceLoader(b));
                a.push(function(a) {
                    Ext.onReady(function() {
                        this.initPortal();
                        a()
                    },
                    this)
                });
                gxp.util.dispatch(a, this.activate, this)
            },
            createSourceLoader: function(a) {
                return function(b) {
                    var d = this.sources[a];
                    d.projection = this.initialConfig.map.projection;
                    this.addLayerSource({
                        id: a,
                        config: d,
                        callback: b,
                        fallback: function() {
                            b()
                        },
                        scope: this
                    })
                }
            },
            addLayerSource: function(a) {
                var b = a.id || Ext.id(null, "gxp-source-"),
                d;
                a.config.id = b;
                try {
                    d = Ext.ComponentMgr.createPlugin(a.config, a.config.ptype ? a.config.ptype: this.defaultSourceType)
                } catch(e) {
                    throw Error("Could not create new source plugin with ptype: " + a.config.ptype);
                }
                d.on({
                    ready: {
                        fn: function() { (a.callback || Ext.emptyFn).call(a.scope || this, b)
                        },
                        scope: this,
                        single: !0
                    },
                    failure: {
                        fn: function() {
                            var d = a.fallback || Ext.emptyFn;
                            delete this.layerSources[b];
                            d.apply(a.scope || this, arguments)
                        },
                        scope: this,
                        single: !0
                    }
                });
                this.layerSources[b] = d;
                d.init(this);
                return d
            },
            initMapPanel: function() {
                var a = Ext.apply({},
                this.initialConfig.map),
                b = {},
                d = {
                    wrapDateLine: void 0 !== a.wrapDateLine ? a.wrapDateLine: !0,
                    maxResolution: a.maxResolution,
                    numZoomLevels: a.numZoomLevels,
                    displayInLayerSwitcher: !1
                };
                if (this.initialConfig.map) for (var e = "theme,controls,resolutions,projection,units,maxExtent,restrictedExtent,maxResolution,numZoomLevels,panMethod".split(","), g, j = e.length - 1; 0 <= j; --j) g = e[j],
                g in a && (b[g] = a[g], delete a[g]);
                this.mapPanel = Ext.ComponentMgr.create(Ext.applyIf({
                    xtype: a.xtype || "gx_mappanel",
                    map: Ext.applyIf({
                        theme: b.theme || null,
                        controls: b.controls || [new OpenLayers.Control.Navigation({
                            zoomWheelOptions: {
                                interval: 250
                            },
                            dragPanOptions: {
                                enableKinetic: !0
                            }
                        }), new OpenLayers.Control.PanPanel, new OpenLayers.Control.ZoomPanel, new OpenLayers.Control.Attribution],
                        maxExtent: b.maxExtent && OpenLayers.Bounds.fromArray(b.maxExtent),
                        restrictedExtent: b.restrictedExtent && OpenLayers.Bounds.fromArray(b.restrictedExtent),
                        numZoomLevels: 21
                    },
                    b),
                    center: a.center && new OpenLayers.LonLat(a.center[0], a.center[1]),
                    resolutions: a.resolutions,
                    forceInitialExtent: !0,
                    layers: [new OpenLayers.Layer(null, d)],
                    items: this.mapItems,
                    plugins: this.mapPlugins,
                    tbar: a.tbar || new Ext.Toolbar({
                        hidden: !0
                    })
                },
                a));
                this.mapPanel.getTopToolbar().on({
                    afterlayout: this.mapPanel.map.updateSize,
                    show: this.mapPanel.map.updateSize,
                    hide: this.mapPanel.map.updateSize,
                    scope: this.mapPanel.map
                });
                this.mapPanel.layers.on({
                    add: function(a, b) {
                        for (var d, e = b.length - 1; 0 <= e; e--) d = b[e],
                        !0 === d.get("selected") && this.selectLayer(d)
                    },
                    remove: function(a, b) { ! 0 === b.get("selected") && this.selectLayer()
                    },
                    scope: this
                })
            },
            initTools: function() {
                this.tools = {};
                if (this.initialConfig.tools && 0 < this.initialConfig.tools.length) for (var a, b = 0,
                d = this.initialConfig.tools.length; b < d; b++) {
                    try {
                        a = Ext.ComponentMgr.createPlugin(this.initialConfig.tools[b], this.defaultToolType)
                    } catch(e) {
                        throw Error("Could not create tool plugin with ptype: " + this.initialConfig.tools[b].ptype);
                    }
                    a.init(this)
                }
            },
            initPortal: function() {
                var a = this.portalConfig || {};
                if (0 === this.portalItems.length) this.mapPanel.region = "center",
                this.portalItems.push(this.mapPanel);
                this.portal = Ext.ComponentMgr.create(Ext.applyIf(a, {
                    layout: "fit",
                    hideBorders: !0,
                    items: {
                        layout: "border",
                        deferredRender: !1,
                        items: this.portalItems
                    }
                }), a.renderTo ? "panel": "viewport");
                this.fireEvent("portalready")
            },
            activate: function() {
                Ext.QuickTips.init();
                Ext.apply(Ext.QuickTips.getQuickTip(), {
                    dismissDelay: 0,
                    hideDelay: 5E3
                });
                this.addLayers();
                this.checkLayerRecordQueue();
                this.fireEvent("ready")
            },
            addLayers: function() {
                var a = this.initialConfig.map;
                if (a && a.layers) {
                    for (var b, d, e = [], g = [], j = 0; j < a.layers.length; ++j) if (b = a.layers[j], d = this.layerSources[b.source])(b = d.createLayerRecord(b)) && ("background" === b.get("group") ? e.push(b) : g.push(b));
                    a = this.mapPanel;
                    e = e.concat(g);
                    e.length && a.layers.add(e)
                }
            },
            getLayerRecordFromMap: function(a) {
                var b = null;
                this.mapPanel && this.mapPanel.layers.each(function(d) {
                    if (d.get("source") == a.source && d.get("name") == a.name) return b = d,
                    !1
                });
                return b
            },
            createLayerRecord: function(a, b, d) {
                this.createLayerRecordQueue.push({
                    config: a,
                    callback: b,
                    scope: d
                });
                this.checkLayerRecordQueue()
            },
            checkLayerRecordQueue: function() {
                for (var a, b, d, e, g = [], j = 0, k = this.createLayerRecordQueue.length; j < k; ++j) e = !1,
                a = this.createLayerRecordQueue[j],
                b = a.config.source,
                b in this.layerSources && (b = this.layerSources[b], (d = b.createLayerRecord(a.config)) ? (function(a, b) {
                    window.setTimeout(function() {
                        a.callback.call(a.scope, b)
                    },
                    0)
                } (a, d), e = !0) : b.lazy && b.store.load({
                    callback: this.checkLayerRecordQueue,
                    scope: this
                })),
                e || g.push(a);
                this.createLayerRecordQueue = g
            },
            getSource: function(a) {
                return a && this.layerSources[a.get("source")]
            },
            getState: function() {
                var a = Ext.apply({},
                this.initialConfig),
                b = this.mapPanel.map.getCenter();
                Ext.apply(a.map, {
                    center: [b.lon, b.lat],
                    zoom: this.mapPanel.map.zoom,
                    layers: []
                });
                var d = {};
                this.mapPanel.layers.each(function(b) {
                    if (b.getLayer().displayInLayerSwitcher) {
                        var g = b.get("source"),
                        j = this.layerSources[g];
                        if (!j) throw Error("Could not find source for layer '" + b.get("name") + "'");
                        a.map.layers.push(j.getConfigForRecord(b));
                        d[g] || (d[g] = j.getState())
                    }
                },
                this);
                Ext.apply(this.sources, d);
                a.tools = [];
                Ext.iterate(this.tools,
                function(b, d) {
                    d.getState != gxp.plugins.Tool.prototype.getState && a.tools.push(d.getState())
                });
                return a
            },
            isAuthorized: function(a) {
                var b = !1;
                if (this.authorizedRoles) {
                    a || (a = "ROLE_ADMINISTRATOR");
                    Ext.isArray(a) || (a = [a]);
                    for (var d = a.length - 1; 0 <= d; --d) if (~this.authorizedRoles.indexOf(a[d])) {
                        b = !0;
                        break
                    }
                }
                return b
            },
            setAuthorizedRoles: function(a) {
                this.authorizedRoles = a;
                this.fireEvent("authorizationchange")
            },
            cancelAuthentication: function() {
                this._authFn && this.un("authorizationchange", this._authFn, this);
                this.fireEvent("authorizationchange")
            },
            isAuthenticated: function() {
                return ! this.authorizedRoles || 0 < this.authorizedRoles.length
            },
            doAuthorized: function(a, b, d) {
                this.isAuthorized(a) || !this.authenticate ? window.setTimeout(function() {
                    b.call(d)
                },
                0) : (this.authenticate(), this._authFn = function() {
                    delete this._authFn;
                    this.doAuthorized(a, b, d, !0)
                },
                this.on("authorizationchange", this._authFn, this, {
                    single: !0
                }))
            },
            destroy: function() {
                this.mapPanel.destroy();
                this.portal && this.portal.destroy()
            }
        }); (function() {
            OpenLayers.DOTS_PER_INCH = 25.4 / 0.28
        })(); Ext.namespace("gxp"); gxp.LinkEmbedMapDialog = Ext.extend(gxp.EmbedMapDialog, {
            linkMessage: "Paste link in email or IM",
            linkUrl: "",
            linkBox: null,
            initComponent: function() {
                Ext.apply(this, this.getConfig());
                gxp.LinkEmbedMapDialog.superclass.initComponent.call(this)
            },
            updateSnippetAndLink: function() {
                this.snippetArea.setValue('<iframe height="' + this.heightField.getValue() + '" width="' + this.widthField.getValue() + '" src="' + gxp.util.getAbsoluteUrl(this.url) + '"></iframe>');
                this.linkBox.focus(!0, 100)
            },
            getConfig: function() {
                var a = gxp.util.getAbsoluteUrl(this.linkUrl);
                this.snippetArea = new Ext.form.TextArea({
                    height: 70,
                    selectOnFocus: !0,
                    readOnly: !0
                });
                var b = {
                    change: this.updateSnippet,
                    specialkey: function(a, b) {
                        b.getKey() == b.ENTER && this.updateSnippet()
                    },
                    scope: this
                };
                this.heightField = new Ext.form.NumberField({
                    width: 50,
                    value: 400,
                    listeners: b
                });
                this.widthField = new Ext.form.NumberField({
                    width: 50,
                    value: 600,
                    listeners: b
                });
                this.linkBox = new Ext.form.TextField({
                    value: a,
                    listeners: {
                        focus: function() {
                            this.selectText()
                        }
                    }
                });
                return {
                    border: !1,
                    defaults: {
                        border: !1,
                        cls: "gx-export-section",
                        xtype: "container",
                        layout: "fit"
                    },
                    items: [{
                        xtype: "box",
                        autoEl: {
                            tag: "div",
                            html: this.linkMessage
                        }
                    },
                    {
                        items: [this.linkBox]
                    },
                    {
                        xtype: "box",
                        autoEl: {
                            tag: "div",
                            html: this.publishMessage
                        }
                    },
                    {
                        items: [this.snippetArea]
                    },
                    {
                        items: [new Ext.Container({
                            layout: "column",
                            defaults: {
                                border: !1,
                                xtype: "box"
                            },
                            items: [{
                                autoEl: {
                                    cls: "gx-field-label",
                                    html: this.mapSizeLabel
                                }
                            },
                            new Ext.form.ComboBox({
                                editable: !1,
                                width: 75,
                                store: new Ext.data.SimpleStore({
                                    fields: ["name", "height", "width"],
                                    data: [[this.miniSizeLabel, 100, 100], [this.smallSizeLabel, 200, 300], [this.largeSizeLabel, 400, 600], [this.premiumSizeLabel, 600, 800]]
                                }),
                                triggerAction: "all",
                                displayField: "name",
                                value: this.largeSizeLabel,
                                mode: "local",
                                listeners: {
                                    select: function(a, b) {
                                        this.widthField.setValue(b.get("width"));
                                        this.heightField.setValue(b.get("height"));
                                        this.updateSnippet()
                                    },
                                    scope: this
                                }
                            }), {
                                autoEl: {
                                    cls: "gx-field-label",
                                    html: this.heightLabel
                                }
                            },
                            this.heightField, {
                                autoEl: {
                                    cls: "gx-field-label",
                                    html: this.widthLabel
                                }
                            },
                            this.widthField]
                        })]
                    }],
                    listeners: {
                        afterrender: this.updateSnippetAndLink,
                        scope: this
                    }
                }
            }
        }); Ext.reg("gx_linkembedmapdialog", gxp.LinkEmbedMapDialog); Ext.namespace("gxp"); gxp.CatalogueSearchPanel = Ext.extend(Ext.Panel, {
            width: 400,
            border: !1,
            maxRecords: 10,
            map: null,
            selectedSource: null,
            sources: null,
            searchFieldEmptyText: "Search",
            searchButtonText: "Search",
            addTooltip: "Create filter",
            addMapTooltip: "Add to map",
            advancedTitle: "Advanced",
            datatypeLabel: "Data type",
            extentLabel: "Spatial extent",
            categoryLabel: "Category",
            datasourceLabel: "Data source",
            filterLabel: "Filter search by",
            removeSourceTooltip: "Switch back to original source",
            topicCategories: null,
            defaultTopic: "General",
            initComponent: function() {
                this.addEvents("addlayer");
                this.filters = [];
                var a = [],
                b;
                for (b in this.sources) a.push([b, this.sources[b].title]);
                if (1 === a.length) this.selectedSource = a[0][0];
                b = [["datatype", "data type"], ["extent", "spatial extent"], ["category", "category"]];
                1 < a.length && b.push(["csw", "data source"]);
                this.items = [{
                    xtype: "form",
                    border: !1,
                    ref: "form",
                    hideLabels: !0,
                    autoHeight: !0,
                    style: "margin-left: 5px; margin-right: 5px; margin-bottom: 5px; margin-top: 5px",
                    items: [{
                        xtype: "compositefield",
                        items: [{
                            xtype: "textfield",
                            emptyText: this.searchFieldEmptyText,
                            ref: "../../search",
                            name: "search",
                            width: 300
                        },
                        {
                            xtype: "button",
                            text: this.searchButtonText,
                            handler: this.performQuery,
                            scope: this
                        }]
                    },
                    {
                        xtype: "fieldset",
                        collapsible: !1,
                        collapsed: !1,
                        hideLabels: !1,
                        title: this.advancedTitle,
                        items: [{
                            xtype: "gxp_cswfilterfield",
                            name: "extent",
                            property: "BoundingBox",
                            map: this.map,
                            comboFieldLabel: this.extentLabel,
                            comboStoreData: [["map", "spatial extent of the map"]],
                            target: this
                        },
                        {
                            xtype: "gxp_cswfilterfield",
                            name: "category",
                            property: "apiso:TopicCategory",
                            comboFieldLabel: this.categoryLabel,
                            comboStoreData: this.topicCategories ? this.topicCategories: [["farming", "Farming"], ["biota", "Biota"], ["boundaries", "Boundaries"], ["climatologyMeteorologyAtmosphere", "Climatology/Meteorology/Atmosphere"], ["economy", "Economy"], ["elevation", "Elevation"], ["environment", "Environment"], ["geoscientificinformation", "Geoscientific Information"], ["health", "Health"], ["imageryBaseMapsEarthCover", "Imagery/Base Maps/Earth Cover"], ["intelligenceMilitary", "Intelligence/Military"], ["inlandWaters", "Inland Waters"], ["location", "Location"], ["oceans", "Oceans"], ["planningCadastre", "Planning Cadastre"], ["society", "Society"], ["structure", "Structure"], ["transportation", "Transportation"], ["utilitiesCommunications", "Utilities/Communications"]],
                            target: this
                        },
                        {
                            xtype: "compositefield",
                            id: "csw",
                            ref: "../../cswCompositeField",
                            hidden: !0,
                            items: [{
                                xtype: "combo",
                                ref: "../../../sourceCombo",
                                fieldLabel: this.datasourceLabel,
                                store: new Ext.data.ArrayStore({
                                    fields: ["id", "value"],
                                    data: a
                                }),
                                displayField: "value",
                                valueField: "id",
                                mode: "local",
                                listeners: {
                                    select: function(a) {
                                        this.setSource(a.getValue())
                                    },
                                    render: function() {
                                        this.sourceCombo.setValue(this.selectedSource)
                                    },
                                    scope: this
                                },
                                triggerAction: "all"
                            },
                            {
                                xtype: "button",
                                iconCls: "gxp-icon-removelayers",
                                tooltip: this.removeSourceTooltip,
                                handler: function() {
                                    this.setSource(this.initialConfig.selectedSource);
                                    this.sourceCombo.setValue(this.initialConfig.selectedSource);
                                    this.cswCompositeField.hide()
                                },
                                scope: this
                            }]
                        },
                        {
                            xtype: "compositefield",
                            items: [{
                                xtype: "combo",
                                fieldLabel: this.filterLabel,
                                store: new Ext.data.ArrayStore({
                                    fields: ["id", "value"],
                                    data: b
                                }),
                                displayField: "value",
                                valueField: "id",
                                mode: "local",
                                triggerAction: "all"
                            },
                            {
                                xtype: "button",
                                iconCls: "gxp-icon-addlayers",
                                tooltip: this.addTooltip,
                                handler: function(a) {
                                    a.ownerCt.items.each(function(a) {
                                        if ("combo" === a.getXType()) {
                                            var b = a.getValue();
                                            a.clearValue(); (a = this.form.getForm().findField(b)) && a.show()
                                        }
                                    },
                                    this)
                                },
                                scope: this
                            }]
                        }]
                    },
                    {
                        xtype: "grid",
                        width: "100%",
                        anchor: "99%",
                        viewConfig: {
                            scrollOffset: 0,
                            forceFit: !0
                        },
                        border: !1,
                        ref: "../grid",
                        bbar: new Ext.PagingToolbar({
                            paramNames: this.sources[this.selectedSource].getPagingParamNames(),
                            store: this.sources[this.selectedSource].store,
                            pageSize: this.maxRecords
                        }),
                        loadMask: !0,
                        hideHeaders: !0,
                        store: this.sources[this.selectedSource].store,
                        columns: [{
                            id: "title",
                            xtype: "templatecolumn",
                            tpl: new Ext.XTemplate("<b>{title}</b><br/>{abstract}"),
                            sortable: !0
                        },
                        {
                            xtype: "actioncolumn",
                            width: 30,
                            items: [{
                                iconCls: "gxp-icon-addlayers",
                                tooltip: this.addMapTooltip,
                                handler: function(a, b) {
                                    this.addLayer(this.grid.store.getAt(b))
                                },
                                scope: this
                            }]
                        }],
                        autoExpandColumn: "title",
                        autoHeight: !0
                    }]
                }];
                gxp.CatalogueSearchPanel.superclass.initComponent.apply(this, arguments)
            },
            destroy: function() {
                this.map = this.sources = null;
                gxp.CatalogueSearchPanel.superclass.destroy.call(this)
            },
            setSource: function(a) {
                this.selectedSource = a;
                a = this.sources[a].store;
                this.grid.reconfigure(a, this.grid.getColumnModel());
                this.grid.getBottomToolbar().bindStore(a)
            },
            performQuery: function() {
                this.sources[this.selectedSource].filter({
                    queryString: this.search.getValue(),
                    limit: this.maxRecords,
                    filters: this.filters
                })
            },
            addFilter: function(a) {
                this.filters.push(a)
            },
            removeFilter: function(a) {
                this.filters.remove(a)
            },
            findWMS: function(a) {
                for (var b = null,
                d = null,
                e = 0,
                g = a.length; e < g; ++e) {
                    var j = a[e];
                    if (j && 0 < j.toLowerCase().indexOf("service=wms")) {
                        d = OpenLayers.Util.createUrlObject(j);
                        b = d.protocol + "//" + d.host + ":" + d.port + d.pathname.replace("download", "geoserver");
                        d = d.args.layers;
                        break
                    }
                }
                if (null !== b && null !== d) return {
                    url: b,
                    name: d
                };
                b = a[0].split("/");
                d = b[b.length - 1];
                return {
                    url: a[0],
                    name: d
                }
            },
            addLayer: function(a) {
                var b = a.get("URI"),
                d = a.get("bounds"),
                e = d.left,
                g = d.right,
                j = d.bottom,
                k = d.top,
                d = Math.min(e, g),
                e = Math.max(e, g),
                g = Math.min(j, k),
                j = Math.max(j, k),
                b = this.findWMS(b); ! 1 === b && (b = this.findWMS(a.get("references"))); ! 1 !== b && this.fireEvent("addlayer", this, this.selectedSource, Ext.apply({
                    title: a.get("title")[0],
                    bbox: [d, g, e, j],
                    srs: "EPSG:4326",
                    subject: this.getCategoryTitle(a)
                },
                b))
            },
            getCategoryTitle: function(a) {
                var b = this.defaultTopic;
                try {
                    b = a.get("subject")[0]
                } catch(d) {
                    return b
                }
                for (a = 0; a < this.topicCategories.length; a++) if (this.topicCategories[a][0] === b) return this.topicCategories[a][1];
                return b
            }
        }); Ext.reg("gxp_cataloguesearchpanel", gxp.CatalogueSearchPanel); Ext.namespace("gxp"); gxp.ScaleOverlay = Ext.extend(Ext.Panel, {
            map: null,
            zoomLevelText: "Zoom level",
            initComponent: function() {
                gxp.ScaleOverlay.superclass.initComponent.call(this);
                this.cls = "map-overlay";
                if (this.map) {
                    if (this.map instanceof GeoExt.MapPanel) this.map = this.map.map;
                    this.bind(this.map)
                }
                this.on("beforedestroy", this.unbind, this)
            },
            addToMapPanel: function(a) {
                this.on({
                    afterrender: function() {
                        this.bind(a.map)
                    },
                    scope: this
                })
            },
            stopMouseEvents: function(a) {
                a.stopEvent()
            },
            removeFromMapPanel: function() {
                var a = this.getEl();
                a.un("mousedown", this.stopMouseEvents, this);
                a.un("click", this.stopMouseEvents, this);
                this.unbind()
            },
            addScaleLine: function() {
                var a = new Ext.BoxComponent({
                    autoEl: {
                        tag: "div",
                        cls: "olControlScaleLine overlay-element overlay-scaleline"
                    }
                });
                this.on("afterlayout",
                function() {
                    a.getEl().dom.style.position = "relative";
                    a.getEl().dom.style.display = "inline";
                    this.getEl().on("click", this.stopMouseEvents, this);
                    this.getEl().on("mousedown", this.stopMouseEvents, this)
                },
                this);
                a.on("render",
                function() {
                    var b = new OpenLayers.Control.ScaleLine({
                        geodesic: !0,
                        div: a.getEl().dom
                    });
                    this.map.addControl(b);
                    b.activate()
                },
                this);
                this.add(a)
            },
            handleZoomEnd: function() {
                var a = this.zoomStore.queryBy(function(a) {
                    return this.map.getZoom() == a.data.level
                },
                this);
                0 < a.length ? (a = a.items[0], this.zoomSelector.setValue("1 : " + parseInt(a.data.scale, 10))) : this.zoomSelector.rendered && this.zoomSelector.clearValue()
            },
            addScaleCombo: function() {
                this.zoomStore = new GeoExt.data.ScaleStore({
                    map: this.map
                });
                this.zoomSelector = new Ext.form.ComboBox({
                    emptyText: this.zoomLevelText,
                    tpl: '<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',
                    editable: !1,
                    triggerAction: "all",
                    mode: "local",
                    store: this.zoomStore,
                    width: 110
                });
                this.zoomSelector.on({
                    click: this.stopMouseEvents,
                    mousedown: this.stopMouseEvents,
                    select: function(a, b) {
                        this.map.zoomTo(b.data.level)
                    },
                    scope: this
                });
                this.map.events.register("zoomend", this, this.handleZoomEnd);
                this.add(new Ext.Panel({
                    items: [this.zoomSelector],
                    cls: "overlay-element overlay-scalechooser",
                    border: !1
                }))
            },
            bind: function(a) {
                this.map = a;
                this.addScaleLine();
                this.addScaleCombo();
                this.doLayout()
            },
            unbind: function() {
                this.map && this.map.events && this.map.events.unregister("zoomend", this, this.handleZoomEnd);
                this.zoomSelector = this.zoomStore = null
            }
        }); Ext.reg("gxp_scaleoverlay", gxp.ScaleOverlay); Ext.namespace("gxp.menu"); gxp.menu.LayerMenu = Ext.extend(Ext.menu.Menu, {
            layerText: "Layer",
            layers: null,
            initComponent: function() {
                gxp.menu.LayerMenu.superclass.initComponent.apply(this, arguments);
                this.layers.on("add", this.onLayerAdd, this);
                this.onLayerAdd()
            },
            onRender: function(a, b) {
                gxp.menu.LayerMenu.superclass.onRender.apply(this, arguments)
            },
            beforeDestroy: function() {
                this.layers && this.layers.on && this.layers.un("add", this.onLayerAdd, this);
                delete this.layers;
                gxp.menu.LayerMenu.superclass.beforeDestroy.apply(this, arguments)
            },
            onLayerAdd: function() {
                this.removeAll();
                this.add({
                    iconCls: "gxp-layer-visibility",
                    text: this.layerText,
                    canActivate: !1
                },
                "-");
                this.layers.each(function(a) {
                    var b = a.getLayer();
                    b.displayInLayerSwitcher && (b = new Ext.menu.CheckItem({
                        id: "layer_menu_" + b.id,
                        text: a.get("title"),
                        checked: a.getLayer().getVisibility(),
                        group: "background" == a.get("group") ? "background": null,
                        listeners: {
                            checkchange: function(b, e) {
                                a.getLayer().setVisibility(e)
                            }
                        }
                    }), 2 < this.items.getCount() ? this.insert(2, b) : this.add(b))
                },
                this)
            }
        }); Ext.reg("gxp_layermenu", gxp.menu.LayerMenu); GeoExt.Lang.add("es", {
            "gxp.menu.LayerMenu.prototype": {
                layerText: "Capa"
            },
            "gxp.plugins.AddLayers.prototype": {
                addActionMenuText: "A\u00f1adir Capas",
                addActionTip: "A\u00f1adir Capas",
                addServerText: "A\u00f1adir servidor",
                addButtonText: "A\u00f1adir Capas",
                untitledText: "Sin T\u00edtulo",
                addLayerSourceErrorText: "Error obteniendo capabilities de WMS ({msg}).\nPor favor, compruebe la URL y vuelva a intentarlo.",
                availableLayersText: "Capas disponibles",
                expanderTemplateText: "<p><b>Resumen:</b> {abstract}</p>",
                panelTitleText: "T\u00edtulo",
                layerSelectionText: "Source:",
                sourceSelectOrTypeText: "Choose one or type service URL",
                doneText: "Hecho",
                uploadText: "Subir Datos"
            },
            "gxp.plugins.BingSource.prototype": {
                title: "Capas Bing",
                roadTitle: "Bing Carreteras",
                aerialTitle: "Bing Foto A\u00e9rea",
                labeledAerialTitle: "Bing H\u00edbrido"
            },
            "gxp.plugins.FeatureEditor.prototype": {
                splitButtonText: "Edit",
                createFeatureActionText: "Create",
                editFeatureActionText: "Modify",
                createFeatureActionTip: "Crear nuevo elemento",
                editFeatureActionTip: "Editar elemento existente"
            },
            "gxp.plugins.FeatureGrid.prototype": {
                displayFeatureText: "Mostrar en el mapa",
                firstPageTip: "Primera p\u00e1gina",
                previousPageTip: "P\u00e1gina anterior",
                zoomPageExtentTip: "Zoom a la extensi\u00f3n de la p\u00e1gina",
                nextPageTip: "P\u00e1gina siguiente",
                lastPageTip: "\u00daltima p\u00e1gina",
                totalMsg: "Features {1} to {2} of {0}"
            },
            "gxp.plugins.GoogleEarth.prototype": {
                menuText: "Vista 3D",
                tooltip: "Vista 3D"
            },
            "gxp.plugins.GoogleSource.prototype": {
                title: "Capas Google",
                roadmapAbstract: "Mostrar Callejero",
                satelliteAbstract: "Mostrar im\u00e1genes a\u00e9reas",
                hybridAbstract: "Mostrar im\u00e1genes con nombres de calle",
                terrainAbstract: "Mostrar callejero con terreno"
            },
            "gxp.plugins.LayerProperties.prototype": {
                menuText: "Propiedades de la capa",
                toolTip: "Propiedades de la capa"
            },
            "gxp.plugins.LayerTree.prototype": {
                shortTitle: "Capas",
                rootNodeText: "Capas",
                overlayNodeText: "Capas superpuestas",
                baseNodeText: "Capa base"
            },
            "gxp.plugins.LayerManager.prototype": {
                baseNodeText: "Capa base"
            },
            "gxp.plugins.Legend.prototype": {
                menuText: "Leyenda",
                tooltip: "Leyenda"
            },
            "gxp.plugins.LoadingIndicator.prototype": {
                loadingMapMessage: "Loading Map..."
            },
            "gxp.plugins.MapBoxSource.prototype": {
                title: "MapBox Layers",
                blueMarbleTopoBathyJanTitle: "Blue Marble Topography & Bathymetry (January)",
                blueMarbleTopoBathyJulTitle: "Blue Marble Topography & Bathymetry (July)",
                blueMarbleTopoJanTitle: "Blue Marble Topography (January)",
                blueMarbleTopoJulTitle: "Blue Marble Topography (July)",
                controlRoomTitle: "Control Room",
                geographyClassTitle: "Geography Class",
                naturalEarthHypsoTitle: "Natural Earth Hypsometric",
                naturalEarthHypsoBathyTitle: "Natural Earth Hypsometric & Bathymetry",
                naturalEarth1Title: "Natural Earth I",
                naturalEarth2Title: "Natural Earth II",
                worldDarkTitle: "World Dark",
                worldLightTitle: "World Light",
                worldPrintTitle: "World Print"
            },
            "gxp.plugins.Measure.prototype": {
                buttonText: "Medir",
                lengthMenuText: "Longitud",
                areaMenuText: "\u00c1rea",
                lengthTooltip: "Medir Longitud",
                areaTooltip: "Medir \u00c1rea",
                measureTooltip: "Medir"
            },
            "gxp.plugins.Navigation.prototype": {
                menuText: "Desplazar mapa",
                tooltip: "Desplazar mapa"
            },
            "gxp.plugins.NavigationHistory.prototype": {
                previousMenuText: "Vista anterior",
                nextMenuText: "Vista siguiente",
                previousTooltip: "Vista anterior",
                nextTooltip: "Vista siguiente"
            },
            "gxp.plugins.OSMSource.prototype": {
                title: "Capas OpenStreetMap",
                mapnikAttribution: "Datos CC-By-SA de <a href='http://openstreetmap.org/'>OpenStreetMap</a>",
                osmarenderAttribution: "Datos CC-By-SA de <a href='http://openstreetmap.org/'>OpenStreetMap</a>"
            },
            "gxp.plugins.Print.prototype": {
                buttonText: "Imprimir",
                menuText: "Imprimir mapa",
                tooltip: "Imprimir mapa",
                previewText: "Vista previa",
                notAllNotPrintableText: "No se pueden imprimir todas las capas",
                nonePrintableText: "No se puede imprimir ninguna de las capas del mapa"
            },
            "gxp.plugins.MapQuestSource.prototype": {
                title: "Capas MapQuest",
                osmAttribution: "Teselas cortes\u00eda de <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
                osmTitle: "MapQuest OpenStreetMap",
                naipAttribution: "Teselas cortes\u00eda de <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
                naipTitle: "MapQuest Im\u00e1genes"
            },
            "gxp.plugins.QueryForm.prototype": {
                queryActionText: "Consultar",
                queryMenuText: "Consultar capa",
                queryActionTip: "Consultar la capa seleccionada",
                queryByLocationText: "Query by current map extent",
                queryByAttributesText: "Consultar por atributos",
                queryMsg: "Consultando...",
                cancelButtonText: "Cancelar",
                noFeaturesTitle: "Sin coincidencias",
                noFeaturesMessage: "Su consulta no produjo resultados."
            },
            "gxp.plugins.RemoveLayer.prototype": {
                removeMenuText: "Eliminar Capa",
                removeActionTip: "Eliminar Capa"
            },
            "gxp.plugins.Styler.prototype": {
                menuText: "Editar estilos",
                tooltip: "Gestionar estilos de capa"
            },
            "gxp.plugins.WMSGetFeatureInfo.prototype": {
                buttonText: "Identify",
                infoActionTip: "Consultar elementos",
                popupTitle: "Informaci\u00f3n de elementos"
            },
            "gxp.plugins.Zoom.prototype": {
                zoomMenuText: "Zoom Box",
                zoomInMenuText: "Acercar",
                zoomOutMenuText: "Alejar",
                zoomTooltip: "Zoom by dragging a box",
                zoomInTooltip: "Acercar",
                zoomOutTooltip: "Alejar"
            },
            "gxp.plugins.ZoomToExtent.prototype": {
                menuText: "Ver extensi\u00f3n total",
                tooltip: "Ver extensi\u00f3n total"
            },
            "gxp.plugins.ZoomToDataExtent.prototype": {
                menuText: "Ver toda la capa",
                tooltip: "Ver toda la capa"
            },
            "gxp.plugins.ZoomToLayerExtent.prototype": {
                menuText: "Ver toda la la capa",
                tooltip: "Ver toda la capa"
            },
            "gxp.plugins.ZoomToSelectedFeatures.prototype": {
                menuText: "Ver los elementos seleccionados",
                tooltip: "Ver los elementos seleccionados"
            },
            "gxp.FeatureEditPopup.prototype": {
                closeMsgTitle: "\u00bfDesea guardar los cambios?",
                closeMsg: "Los cambios en este elemento no se han guardado. \u00bfDesea guardar los cambios?",
                deleteMsgTitle: "\u00bfDesea borrar el elemento?",
                deleteMsg: "\u00bfEst\u00e1 seguro de querer borrar este elemento?",
                editButtonText: "Editar",
                editButtonTooltip: "Hacer editable este elemento",
                deleteButtonText: "Borrar",
                deleteButtonTooltip: "Borrar este elemento",
                cancelButtonText: "Cancelar",
                cancelButtonTooltip: "Dejar de editar, descartar cambios",
                saveButtonText: "Guardar",
                saveButtonTooltip: "Guardar cambios"
            },
            "gxp.FillSymbolizer.prototype": {
                fillText: "Relleno",
                colorText: "Color",
                opacityText: "Opacidad"
            },
            "gxp.FilterBuilder.prototype": {
                builderTypeNames: ["cualquiera de", "todas", "ninguna de", "no todas"],
                preComboText: "Cumplir",
                postComboText: "las condiciones siguientes:",
                addConditionText: "a\u00f1adir condici\u00f3n",
                addGroupText: "a\u00f1adir grupo",
                removeConditionText: "eliminar condici\u00f3n"
            },
            "gxp.grid.CapabilitiesGrid.prototype": {
                nameHeaderText: "Nombre",
                titleHeaderText: "T\u00edtulo",
                queryableHeaderText: "Consultable",
                layerSelectionLabel: "Ver datos disponibles de:",
                layerAdditionLabel: "o a\u00f1adir otro servidor.",
                expanderTemplateText: "<p><b>Resumen:</b> {abstract}</p>"
            },
            "gxp.PointSymbolizer.prototype": {
                graphicCircleText: "c\u00edrculo",
                graphicSquareText: "cuadrado",
                graphicTriangleText: "tri\u00e1ngulo",
                graphicStarText: "estrella",
                graphicCrossText: "cruz",
                graphicXText: "x",
                graphicExternalText: "externo",
                urlText: "URL",
                opacityText: "opacidad",
                symbolText: "S\u00edmbolo",
                sizeText: "Tama\u00f1o",
                rotationText: "Giro"
            },
            "gxp.QueryPanel.prototype": {
                queryByLocationText: "Consultar por localizaci\u00f3n",
                currentTextText: "Extensi\u00f3n actual",
                queryByAttributesText: "Consultar por atributo",
                layerText: "Capa"
            },
            "gxp.RulePanel.prototype": {
                scaleSliderTemplate: "{scaleType} Escala 1:{scale}",
                labelFeaturesText: "Etiquetado de elementos",
                labelsText: "Etiquetas",
                basicText: "B\u00e1sico",
                advancedText: "Advanzado",
                limitByScaleText: "Limitar por escala",
                limitByConditionText: "Limitar por condici\u00f3n",
                symbolText: "S\u00edmbolo",
                nameText: "Nombre"
            },
            "gxp.ScaleLimitPanel.prototype": {
                scaleSliderTemplate: "{scaleType} Escala 1:{scale}",
                minScaleLimitText: "Escala m\u00ednima",
                maxScaleLimitText: "Escala m\u00e1xima"
            },
            "gxp.StrokeSymbolizer.prototype": {
                solidStrokeName: "continuo",
                dashStrokeName: "guiones",
                dotStrokeName: "puntos",
                titleText: "Trazo",
                styleText: "Estilo",
                colorText: "Color",
                widthText: "Ancho",
                opacityText: "Opacidad"
            },
            "gxp.StylePropertiesDialog.prototype": {
                titleText: "General",
                nameFieldText: "Nombre",
                titleFieldText: "T\u00edtulo",
                abstractFieldText: "Resumen"
            },
            "gxp.TextSymbolizer.prototype": {
                labelValuesText: "Etiquetado",
                haloText: "Halo",
                sizeText: "Tama\u00f1o"
            },
            "gxp.WMSLayerPanel.prototype": {
                aboutText: "Acerca de",
                titleText: "T\u00edtulo",
                nameText: "Nombre",
                descriptionText: "Descripci\u00f3n",
                displayText: "Mostrar",
                opacityText: "Opacidad",
                formatText: "Formato",
                transparentText: "Transparente",
                cacheText: "Cach\u00e9",
                cacheFieldText: "Usar la versi\u00f3n en cach\u00e9",
                stylesText: "Estilos",
                infoFormatText: "Info format",
                infoFormatEmptyText: "Select a format"
            },
            "gxp.EmbedMapDialog.prototype": {
                publishMessage: "\u00a1Ya puede publicar su mapa en otras webs! Simplemente copie el siguiente c\u00f3digo HTML en el lugar donde desee incrustarlo:",
                heightLabel: "Alto",
                widthLabel: "Ancho",
                mapSizeLabel: "Tama\u00f1o",
                miniSizeLabel: "M\u00ednimo",
                smallSizeLabel: "Peque\u00f1o",
                premiumSizeLabel: "Premium",
                largeSizeLabel: "Grande"
            },
            "gxp.WMSStylesDialog.prototype": {
                addStyleText: "A\u00f1adir",
                addStyleTip: "A\u00f1adir un estilo",
                chooseStyleText: "Escoger estilo",
                deleteStyleText: "Quitar",
                deleteStyleTip: "Borrar el estilo seleccionado",
                editStyleText: "Cambiar",
                editStyleTip: "Editar el estilo seleccionado",
                duplicateStyleText: "Clonar",
                duplicateStyleTip: "Duplicar el estilo seleccionado",
                addRuleText: "A\u00f1adir",
                addRuleTip: "A\u00f1adir una regla",
                newRuleText: "Nueva regla",
                deleteRuleText: "Quitar",
                deleteRuleTip: "Borrar la regla seleccionada",
                editRuleText: "Cambiar",
                editRuleTip: "Editar la regla seleccionada",
                duplicateRuleText: "Duplicar",
                duplicateRuleTip: "Duplicar la regla seleccionada",
                cancelText: "Cancelar",
                saveText: "Guardar",
                styleWindowTitle: "Estilo: {0}",
                ruleWindowTitle: "Regla: {0}",
                stylesFieldsetTitle: "Estilos",
                rulesFieldsetTitle: "Reglas"
            },
            "gxp.LayerUploadPanel.prototype": {
                titleLabel: "T\u00edtulo",
                titleEmptyText: "T\u00edtulo de la capa",
                abstractLabel: "Descripci\u00f3n",
                abstractEmptyText: "Descripci\u00f3n de la capa",
                fileLabel: "Datos",
                fieldEmptyText: "Navegue por los datos...",
                uploadText: "Subir",
                waitMsgText: "Suba sus datos data...",
                invalidFileExtensionText: "El fichero debe tener alguna de estas extensiones: ",
                optionsText: "Opciones",
                workspaceLabel: "Espacio de trabajo",
                workspaceEmptyText: "Espacio de trabajo por defecto",
                dataStoreLabel: "Almac\u00e9n de datos",
                dataStoreEmptyText: "Create new store",
                defaultDataStoreEmptyText: "Almac\u00e9n de datos por defecto"
            },
            "gxp.NewSourceDialog.prototype": {
                title: "A\u00f1adir Servidor...",
                cancelText: "Cancelar",
                addServerText: "A\u00f1adir Servidor",
                invalidURLText: "Enter a valid URL to a WMS endpoint (e.g. http://example.com/geoserver/wms)",
                contactingServerText: "Conectando con el Servidor..."
            },
            "gxp.ScaleOverlay.prototype": {
                zoomLevelText: "Escala"
            },
            "gxp.plugins.ArcGISCacheSource.prototype": {
                noLayersTitle: "No ArcGIS Layers",
                noLayersText: "Could not find any layers with a compatible projection (Web Mercator) at "
            },
            "gxp.plugins.ArcRestSource.prototype": {
                noLayersTitle: "No ArcGIS Layers",
                noLayersText: "Could not find any layers with a compatible projection (Web Mercator) at "
            },
            "gxp.plugins.MapShare.prototype": {
                text: "Share Map",
                toolTip: "Map info and download links"
            },
            "gxp.plugins.AnnotationTool.prototype": {
                errorTitle: "Error creating annotation",
                noteText: "Note",
                notesText: "Notes",
                showNotesText: "Show notes",
                editNotesText: "Edit notes",
                addNoteText: "Add note",
                newNoteText: "New note",
                projection: "EPSG:4326",
                pointText: "Point",
                lineText: "Line",
                polygonText: "Shape",
                saveFailTitle: "Could not save note",
                saveFailText: "Edit failed.  You might not have permission to save this note.",
                saveText: "Save",
                editText: "Edit",
                deleteText: "Delete",
                cancelText: "Cancel",
                titleText: "Title"
            },
            "gxp.SearchBar.prototype": {
                emptyText: "Enter search...",
                searchText: "Search",
                noSearchableLayersTitle: "No Searchable Layers",
                noSearchableLayersMsg: "There are currently no searchable layers on the map.  You must have at least one visible layer with searchable fields on the map.",
                searchTermTitle: "Search Term Required",
                searchTermText: "Please enter a search term",
                resetText: "Reset"
            },
            "gxp.plugins.PrintPage.prototype": {
                menuText: "Print Map",
                tooltip: "Print Map",
                buttonText: "Print"
            },
            "gxp.plugins.CoordinateTool.prototype": {
                title: "Map Coordinates (longitude, latitude)",
                infoActionTip: "Get coordinates at the mouse position",
                coordinatePositionText: "CoordinatePosition"
            },
            "gxp.plugins.FeedSource.prototype": {
                title: "Feed Source"
            },
            "gxp.plugins.HGLSource.prototype": {
                title: "Harvard Geospatial Library Source"
            },
            "gxp.plugins.HGLFeedSource.prototype": {
                title: "HGL Feed Source"
            },
            "gxp.plugins.PicasaFeedSource.prototype": {
                title: "Picasa Source"
            },
            "gxp.plugins.YouTubeFeedSource.prototype": {
                title: "YouTube Source"
            },
            "gxp.plugins.GeoLocator.prototype": {
                infoActionTip: "Get My Location",
                locationFailedText: "Location detection failed"
            },
            "gxp.plugins.LayerShare.prototype": {
                menuText: "Share Layer",
                toolTip: "Layer info and download links"
            },
            "gxp.plugins.MapShare.prototype": {
                text: "Share My Map",
                toolTip: "Map info and download links"
            },
            "gxp.plugins.AddCategory.prototype": {
                addCategoryMenuText: "Add Category",
                addCategoryActionTipText: "Add a category to the layer tree",
                categoryNameText: "Category name:"
            },
            "gxp.plugins.RemoveCategory.prototype": {
                removeCategoryActionText: "Remove Category",
                removeCategoryActionTipText: "Remove this category and all its layers from the map",
                cannotRemoveText: "This category cannot be removed"
            },
            "gxp.plugins.RenameCategory.prototype": {
                renameCategoryActionText: "Rename Category",
                renameCategoryActionTipText: "Give this category a new name",
                cannotRenameText: "This category cannot be renamed"
            },
            "gxp.LinkEmbedMapDialog.prototype": {
                linkMessage: "Paste link in email or IM"
            },
            "gxp.plugins.GeoNodeQueryTool.prototype": {
                infoActionTip: "Get Feature Info",
                popupTitle: "Feature Info",
                resetTitle: "Reset",
                resetToolTipText: " Clear all features"
            },
            "gxp.plugins.MapRevisionTool.prototype": {
                infoActionTip: "View a list of map revisions",
                toolText: "Revisions",
                windowTitle: "Map Revision History"
            },
            "gxp.plugins.GazetteerTool.prototype": {
                infoActionTip: "Enter a place name to search for",
                toolText: "Gazetteer",
                searchingText: "Searching...",
                fromText: "From: YYYY-MM-DD",
                toText: "To: YYYY-MM-DD",
                datesText: "Dates",
                geocodersText: "Geocoders",
                advancedText: "Advanced",
                sourceText: "Source",
                startDateText: "Start Date",
                endDateText: "End Date",
                placenameText: "Place name",
                coordinatesText: "Coordinates"
            },
            "gxp.plugins.StreetViewTool.js": {
                toolText: "Google Street View",
                streetViewTitle: "Google Street View",
                infoActionTip: "Click on the map to see Google Street View"
            }
        }); GeoExt.Lang.add("fr", {
            "gxp.plugins.AddLayers.prototype": {
                addActionMenuText: "Ajouter des couches",
                addActionTip: "Ajouter des couches",
                addServerText: "Ajouter un nouveau serveur",
                untitledText: "Sans titre",
                addLayerSourceErrorText: "Impossible d'obtenir les capacit\u00e9s WMS ({msg}).\nVeuillez v\u00e9rifier l'URL et essayez \u00e0 nouveau.",
                availableLayersText: "Couches disponibles",
                uploadText: "T\u00e9l\u00e9charger des donn\u00e9es",
                layerSelectionText: "Source:",
                sourceSelectOrTypeText: "Choisissez un URL ou taper l'URL de service",
                doneText: "Termin\u00e9"
            },
            "gxp.plugins.BingSource.prototype": {
                title: "Couches Bing",
                roadTitle: "Bing routes",
                aerialTitle: "Bing images a\u00e9riennes",
                labeledAerialTitle: "Bing images a\u00e9riennes avec \u00e9tiquettes"
            },
            "gxp.plugins.FeatureEditor.prototype": {
                splitButtonText: "R\u00e9diger",
                createFeatureActionText: "Cr\u00e9er",
                editFeatureActionText: "Modifier",
                createFeatureActionTip: "Cr\u00e9er un nouvel objet",
                editFeatureActionTip: "Modifier un objet existant"
            },
            "gxp.plugins.FeatureGrid.prototype": {
                displayFeatureText: "Afficher sur la carte",
                firstPageTip: "Premi\u00e8re page",
                previousPageTip: "Page pr\u00e9c\u00e9dente",
                zoomPageExtentTip: "Zoom sur la page",
                nextPageTip: "Page suivante",
                lastPageTip: "Derni\u00e8re page",
                totalMsg: "Caract\u00e9ristiques {1} \u00e0 {2} de {0}"
            },
            "gxp.plugins.GoogleEarth.prototype": {
                menuText: "Passer \u00e0 la visionneuse 3D",
                tooltip: "Passer \u00e0 la visionneuse 3D"
            },
            "gxp.plugins.GoogleSource.prototype": {
                title: "Couches Google",
                roadmapAbstract: "Carte routi\u00e8re",
                satelliteAbstract: "Images satellite",
                hybridAbstract: "Images avec routes",
                terrainAbstract: "Carte routi\u00e8re avec le terrain",
                roadmapTitle: "Google Routi\u00e8re",
                hybridTitle: "Google Hybrid",
                satelliteTitle: "Google Satellite",
                terrainTitle: "Google Terrain"
            },
            "gxp.plugins.LayerProperties.prototype": {
                menuText: "Propri\u00e9t\u00e9s de la couche",
                toolTip: "Propri\u00e9t\u00e9s de la couche"
            },
            "gxp.plugins.LayerTree.prototype": {
                shortTitle: "Couches",
                rootNodeText: "Couches",
                overlayNodeText: "Surimpressions",
                baseNodeText: "Couches"
            },
            "gxp.plugins.LayerManager.prototype": {
                baseNodeText: "Couche"
            },
            "gxp.plugins.Legend.prototype": {
                menuText: "L\u00e9gende",
                tooltip: "L\u00e9gende"
            },
            "gxp.plugins.Measure.prototype": {
                buttonText: "Mesure",
                lengthMenuText: "Longueur",
                areaMenuText: "Surface",
                lengthTooltip: "Mesure de longueur",
                areaTooltip: "Mesure de surface",
                measureTooltip: "Mesure"
            },
            "gxp.plugins.Navigation.prototype": {
                menuText: "Panner la carte",
                tooltip: "Panner la carte"
            },
            "gxp.plugins.NavigationHistory.prototype": {
                previousMenuText: "Position pr\u00e9c\u00e9dente",
                nextMenuText: "Position suivante",
                previousTooltip: "Position pr\u00e9c\u00e9dente",
                nextTooltip: "Position suivante"
            },
            "gxp.plugins.LoadingIndicator.prototype": {
                loadingMapMessage: "Chargement de la carte..."
            },
            "gxp.plugins.MapBoxSource.prototype": {
                title: "Couches MapBox",
                blueMarbleTopoBathyJanTitle: "Topographie et Bathym\u00e9trie Blue Marble (janvier)",
                blueMarbleTopoBathyJulTitle: "Topographie et Bathym\u00e9trie Blue Marble (juillet)",
                blueMarbleTopoJanTitle: "Topographie Blue Marble (janvier)",
                blueMarbleTopoJulTitle: "Topographie Blue Marble (juillet)",
                controlRoomTitle: "Salle de commande",
                geographyClassTitle: "Cours de g\u00e9ographie",
                naturalEarthHypsoTitle: "Hypsom\u00e9trie du monde",
                naturalEarthHypsoBathyTitle: "Hypsom\u00e9trie & Bathym\u00e9trie du monde",
                naturalEarth1Title: "Monde I",
                naturalEarth2Title: "Monde II",
                worldDarkTitle: "Monde (fonc\u00e9)",
                worldLightTitle: "Monde (\u00e9clair)",
                worldPrintTitle: "Imprimer le monde"
            },
            "gxp.plugins.OSMSource.prototype": {
                title: "Couches OpenStreetMap",
                mapnikAttribution: "Donn\u00e9es CC-By-SA par <a href='http://openstreetmap.org/'>OpenStreetMap</a>",
                osmarenderAttribution: "Donn\u00e9es CC-By-SA par <a href='http://openstreetmap.org/'>OpenStreetMap</a>"
            },
            "gxp.plugins.Print.prototype": {
                buttonText: "Imprimer",
                menuText: "Imprimer la carte",
                tooltip: "Imprimer la carte",
                previewText: "Aper\u00e7u avant impression",
                notAllNotPrintableText: "Toutes les couches ne peuvent pas \u00eatre imprim\u00e9es",
                nonePrintableText: "Aucune de vos couches ne peut \u00eatre imprim\u00e9e"
            },
            "gxp.plugins.MapQuestSource.prototype": {
                title: "MapQuest Layers",
                osmAttribution: "Avec la permission de tuiles <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
                osmTitle: "MapQuest OpenStreetMap",
                naipAttribution: "Avec la permission de tuiles <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
                naipTitle: "MapQuest Imagery"
            },
            "gxp.plugins.QueryForm.prototype": {
                queryActionText: "Interrogation",
                queryMenuText: "Couche de requ\u00eates",
                queryActionTip: "Interroger la couche s\u00e9lectionn\u00e9e",
                queryByLocationText: "Interroger par la zone de la carte actuelle",
                queryByAttributesText: "Requ\u00eate par attributs"
            },
            "gxp.plugins.RemoveLayer.prototype": {
                removeMenuText: "Enlever la couche",
                removeActionTip: "Enlever la couche"
            },
            "gxp.plugins.WMSGetFeatureInfo.prototype": {
                buttonText: "Identifier",
                infoActionTip: "Acqu\u00e9rir les informations",
                popupTitle: "Info sur l'objet"
            },
            "gxp.plugins.Zoom.prototype": {
                zoomMenuText: "Zone zoom",
                zoomInMenuText: "Zoom avant",
                zoomOutMenuText: "Zoom arri\u00e8re",
                zoomTooltip: "Zoom en tirant un carr\u00e9",
                zoomInTooltip: "Zoom avant",
                zoomOutTooltip: "Zoom arri\u00e8re"
            },
            "gxp.plugins.ZoomToExtent.prototype": {
                menuText: "Zoomer sur la carte max",
                tooltip: "Zoomer sur la carte max"
            },
            "gxp.plugins.ZoomToDataExtent.prototype": {
                menuText: "Zoomer sur la couche",
                tooltip: "Zoomer sur la couche"
            },
            "gxp.plugins.ZoomToLayerExtent.prototype": {
                menuText: "Zoomer sur la couche",
                tooltip: "Zoomer sur la couche"
            },
            "gxp.plugins.ZoomToSelectedFeatures.prototype": {
                menuText: "Zoomer sur les objets s\u00e9lectionn\u00e9s",
                tooltip: "Zoomer sur les objets s\u00e9lectionn\u00e9s"
            },
            "gxp.FeatureEditPopup.prototype": {
                closeMsgTitle: "Enregistrer les modifications ?",
                closeMsg: "Cet objet a des modifications non enregistr\u00e9es. Voulez-vous enregistrer vos modifications ?",
                deleteMsgTitle: "Supprimer l'objet ?",
                deleteMsg: "Etes-vous s\u00fbr de vouloir supprimer cet objet ?",
                editButtonText: "Modifier",
                editButtonTooltip: "Modifier cet objet",
                deleteButtonText: "Supprimer",
                deleteButtonTooltip: "Supprimer cet objet",
                cancelButtonText: "Annuler",
                cancelButtonTooltip: "Arr\u00eater de modifier, annuler les modifications",
                saveButtonText: "Enregistrer",
                saveButtonTooltip: "Enregistrer les modifications"
            },
            "gxp.FillSymbolizer.prototype": {
                fillText: "Remplir",
                colorText: "Couleur",
                opacityText: "Opacit\u00e9"
            },
            "gxp.FilterBuilder.prototype": {
                builderTypeNames: ["Tout", "tous", "aucun", "pas tout"],
                preComboText: "Match",
                postComboText: "de ce qui suit:",
                addConditionText: "Ajouter la condition",
                addGroupText: "Ajouter un groupe",
                removeConditionText: "Supprimer la condition"
            },
            "gxp.grid.CapabilitiesGrid.prototype": {
                nameHeaderText: "Nom",
                titleHeaderText: "Titre",
                queryableHeaderText: "Interrogeable",
                layerSelectionLabel: "Voir les donn\u00e9es disponibles \u00e0 partir de :",
                layerAdditionLabel: "ou ajouter un nouveau serveur.",
                expanderTemplateText: "<p><b>R\u00e9sum\u00e9:</b> {abstract}</p>"
            },
            "gxp.PointSymbolizer.prototype": {
                graphicCircleText: "Cercle",
                graphicSquareText: "Carr\u00e9",
                graphicTriangleText: "Triangle",
                graphicStarText: "\u00c9toile",
                graphicCrossText: "Croix",
                graphicXText: "x",
                graphicExternalText: "Externe",
                urlText: "URL",
                opacityText: "Opacit\u00e9",
                symbolText: "Symbole",
                sizeText: "Taille",
                rotationText: "Rotation"
            },
            "gxp.QueryPanel.prototype": {
                queryByLocationText: "Interrogation selon le lieu",
                currentTextText: "Mesure actuelle",
                queryByAttributesText: "Requ\u00eate par attributs",
                layerText: "Calque"
            },
            "gxp.RulePanel.prototype": {
                scaleSliderTemplate: "{scaleType} \u00e9chelle 1:{scale}",
                labelFeaturesText: "Label Caract\u00e9ristiques",
                advancedText: "Avanc\u00e9",
                limitByScaleText: "Limiter par l'\u00e9chelle",
                limitByConditionText: "Limiter par condition",
                symbolText: "Symbole",
                nameText: "Nom"
            },
            "gxp.ScaleLimitPanel.prototype": {
                scaleSliderTemplate: "{scaleType} \u00e9chelle 1:{scale}",
                maxScaleLimitText: "\u00c9chelle maximale"
            },
            "gxp.TextSymbolizer.prototype": {
                labelValuesText: "Label valeurs",
                haloText: "Halo",
                sizeText: "Taille"
            },
            "gxp.WMSLayerPanel.prototype": {
                aboutText: "A propos",
                titleText: "Titre",
                nameText: "Nom",
                descriptionText: "Description",
                displayText: "Affichage",
                opacityText: "Opacit\u00e9",
                formatText: "Format",
                transparentText: "Transparent",
                cacheText: "Cache",
                cacheFieldText: "Utiliser la version mise en cache",
                infoFormatText: "Info format",
                infoFormatEmptyText: "Choisissez un format"
            },
            "gxp.EmbedMapDialog.prototype": {
                publishMessage: "Votre carte est pr\u00eate \u00e0 \u00eatre publi\u00e9e sur le web. Il suffit de copier le code HTML suivant pour int\u00e9grer la carte dans votre site Web :",
                heightLabel: "Hauteur",
                widthLabel: "Largeur",
                mapSizeLabel: "Taille de la carte",
                miniSizeLabel: "Mini",
                smallSizeLabel: "Petit",
                premiumSizeLabel: "Premium",
                largeSizeLabel: "Large"
            },
            "gxp.LayerUploadPanel.prototype": {
                titleLabel: "Titre",
                titleEmptyText: "Titre de la couche",
                abstractLabel: "Description",
                abstractEmptyText: "Description couche",
                fileLabel: "Donn\u00e9es",
                fieldEmptyText: "Parcourir pour ...",
                uploadText: "Upload",
                waitMsgText: "Transfert de vos donn\u00e9es ...",
                invalidFileExtensionText: "L'extension du fichier doit \u00eatre : ",
                optionsText: "Options",
                workspaceLabel: "Espace de travail",
                workspaceEmptyText: "Espace de travail par d\u00e9faut",
                dataStoreLabel: "Magasin de donn\u00e9es",
                dataStoreEmptyText: "Cr\u00e9er une nouvelle r\u00e9serve",
                defaultDataStoreEmptyText: "R\u00e9serve de donn\u00e9es par d\u00e9faut"
            },
            "gxp.NewSourceDialog.prototype": {
                title: "Ajouter un nouveau serveur...",
                cancelText: "Annuler",
                addServerText: "Ajouter un serveur",
                invalidURLText: "Indiquez l'URL valide d'un serveur WMS (e.g. http://example.com/geoserver/wms)",
                contactingServerText: "Interrogation du serveur..."
            },
            "gxp.ScaleOverlay.prototype": {
                zoomLevelText: "Niveau de zoom"
            },
            "gxp.plugins.ArcGISCacheSource.prototype": {
                noLayersTitle: "Aucune couche ArcGIS n'a \u00e9t\u00e9 trouv\u00e9e.",
                noLayersText: " Aucune couche avec une projection compatible (Web Mercator) n'a \u00e9t\u00e9 trouv\u00e9e. "
            },
            "gxp.plugins.ArcRestSource.prototype": {
                noLayersTitle: "Aucune couche ArcGIS n'a \u00e9t\u00e9 trouv\u00e9e.",
                noLayersText: "Aucune couche avec une projection compatible (Web Mercator) n'a \u00e9t\u00e9 trouv\u00e9e \u00e0 "
            },
            "gxp.plugins.MapShare.prototype": {
                text: "Partager cette carte",
                toolTip: "Informations sur cette carte et les liens de t\u00e9l\u00e9chargement"
            },
            "gxp.plugins.AnnotationTool.prototype": {
                errorTitle: "Une erreur s'est produite lors de la cr\u00e9ation de l'annotation.",
                noteText: "Note",
                notesText: "Notes",
                showNotesText: "Montrer les notes",
                editNotesText: "R\u00e9diger les notes",
                addNoteText: "Ajouter une note",
                newNoteText: "Nouvelle note",
                projection: "EPSG:4326",
                pointText: "Point",
                lineText: "Ligne",
                polygonText: "Forme",
                saveFailTitle: "L'enregistrement de la note a \u00e9chou\u00e9",
                saveFailText: "La modification a \u00e9chou\u00e9. Vous n'avez peut-\u00eatre pas les autorisations pour sauvegarder cette note.",
                saveText: "Sauvegarder",
                editText: "R\u00e9diger",
                deleteText: "Supprimer",
                cancelText: "Annuler",
                titleText: "Titre"
            },
            "gxp.SearchBar.prototype": {
                emptyText: "Chercher...",
                searchText: "Chercher",
                noSearchableLayersTitle: "Aucune couche ne peut \u00eatre int\u00e9rroger.",
                noSearchableLayersMsg: "Il n'y a pas de couche interrogeable dans cette carte. Vous devez avoir au moins une couche visible avec des champs interrogeable dans la carte.",
                searchTermTitle: "Terme \u00e0 rechercher obligatoire.",
                searchTermText: "Veuillez entrer un terme \u00e0 rechercher.",
                resetText: "R\u00e9initialiser"
            },
            "gxp.plugins.PrintPage.prototype": {
                menuText: "Imprimer la carte",
                tooltip: "Imprimer la carte",
                buttonText: "Imprimer"
            },
            "gxp.plugins.CoordinateTool.prototype": {
                title: "Coordonn\u00e9es de la carte (longitude, latitude)",
                infoActionTip: "Prendre les coordonn\u00e9es de la position de la souris",
                coordinatePositionText: "Position des coordonn\u00e9es"
            },
            "gxp.plugins.FeedSource.prototype": {
                title: "Source d'alimentation"
            },
            "gxp.plugins.HGLSource.prototype": {
                title: "Biblioth\u00e8que g\u00e9ospatiale d'Harvard"
            },
            "gxp.plugins.HGLFeedSource.prototype": {
                title: "Source d'alimentation HGL "
            },
            "gxp.plugins.PicasaFeedSource.prototype": {
                title: "Picasa"
            },
            "gxp.plugins.YouTubeFeedSource.prototype": {
                title: "YouTube"
            },
            "gxp.plugins.GeoLocator.prototype": {
                infoActionTip: "Trouver mon emplacement",
                locationFailedText: "D\u00e9tection de l'emplacement a \u00e9chou\u00e9"
            },
            "gxp.plugins.LayerShare.prototype": {
                menuText: "Partager cette couche",
                toolTip: "Informations de la couche et les liens de t\u00e9l\u00e9chargement"
            },
            "gxp.plugins.MapShare.prototype": {
                text: "Partager ma carte",
                toolTip: "Informations de la carte et les liens de t\u00e9l\u00e9chargement"
            },
            "gxp.plugins.AddCategory.prototype": {
                addCategoryMenuText: "Ajouter une cat\u00e9gorie",
                addCategoryActionTipText: "Ajouter une cat\u00e9gorie \u00e0 la hi\u00e9rarchie des couches",
                categoryNameText: "Nom de la cat\u00e9gorie:"
            },
            "gxp.plugins.RemoveCategory.prototype": {
                removeCategoryActionText: "Supprimer la cat\u00e9gorie",
                removeCategoryActionTipText: "Supprimer cette cat\u00e9gorie et toutes ses couches de la carte",
                cannotRemoveText: " Cette cat\u00e9gorie ne peut pas \u00eatre supprim\u00e9e."
            },
            "gxp.plugins.RenameCategory.prototype": {
                renameCategoryActionText: "Modifier le nom de la cat\u00e9gorie",
                renameCategoryActionTipText: "Changer le nom de la cat\u00e9gorie",
                cannotRenameText: "Vous n'\u00eates pas autoris\u00e9 \u00e0 changer le nom de cette cat\u00e9gorie"
            },
            "gxp.LinkEmbedMapDialog.prototype": {
                linkMessage: "Veuillez copier-coller ce lien dans un email"
            },
            "gxp.plugins.GeoNodeQueryTool.prototype": {
                infoActionTip: "Voir les informations de la caract\u00e9ristique",
                popupTitle: "Infos caract\u00e9ristique",
                resetTitle: "R\u00e9initialiser",
                resetToolTipText: " Enlever les caract\u00e9ristiques"
            },
            "gxp.plugins.MapRevisionTool.prototype": {
                infoActionTip: "Voir la liste des modifications de cette carte",
                toolText: "Modifications",
                windowTitle: "Historique des modifications de la carte"
            },
            "gxp.plugins.GazetteerTool.prototype": {
                infoActionTip: "Entrer le nom d'un lieu \u00e0 localiser",
                toolText: "Index g\u00e9ographique",
                searchingText: "Cherche en cours...",
                fromText: "De: YYYY-MM-JJ",
                toText: "A: YYYY-MM-JJ",
                datesText: "Dates",
                geocodersText: "G\u00e9ocodes",
                advancedText: "Avanc\u00e9",
                sourceText: "Source",
                startDateText: "A partir de",
                endDateText: "Date de fin",
                placenameText: "Nom de lieu",
                coordinatesText: "Coordonn\u00e9es"
            },
            "gxp.plugins.StreetViewTool.prototype": {
                toolText: "Street View",
                streetViewTitle: "Google Street View",
                infoActionTip: "Cliquez sur la carte pour voir Google Street View"
            }
        }); Ext.namespace("gxp.plugins"); gxp.plugins.AddCategory = Ext.extend(gxp.plugins.Tool, {
            ptype: "gxp_addcategory",
            addCategoryMenuText: "Add Category",
            addCategoryActionTipText: "Add a category to the layer tree",
            categoryNameText: "Category name:",
            addActions: function() {
                return gxp.plugins.AddCategory.superclass.addActions.apply(this, [{
                    menuText: this.addCategoryMenuText,
                    iconCls: "icon-add",
                    disabled: !1,
                    folderAction: !0,
                    tooltip: this.addCategoryActionTipText,
                    handler: function() {
                        var a = this.target.layerTree;
                        Ext.MessageBox.prompt(this.addCategoryMenuText, this.categoryNameText,
                        function(b, d) {
                            "ok" == b && a.addCategoryFolder({
                                group: d
                            },
                            !0)
                        })
                    },
                    scope: this
                }])[0]
            }
        }); Ext.preg(gxp.plugins.AddCategory.prototype.ptype, gxp.plugins.AddCategory); Ext.namespace("gxp.plugins"); gxp.plugins.RenameCategory = Ext.extend(gxp.plugins.Tool, {
            ptype: "gxp_renamecategory",
            renameCategoryActionText: "Rename Category",
            renameCategoryActionTipText: "Give this category a new name",
            cannotRenameText: "This category cannot be renamed",
            renameNode: function(a) {
                var b = function(a) {
                    var b;
                    if (a && a.layer) {
                        var g = a.layer,
                        a = a.layerStore;
                        b = a.getAt(a.findBy(function(a) {
                            return a.getLayer() === g
                        }))
                    }
                    return b
                };
                Ext.MessageBox.prompt(this.renameCategoryActionText, this.renameCategoryActionTipText,
                function(d, e) {
                    if ("ok" == d) this.modified |= 1,
                    a.setText(e),
                    a.attributes.group = e,
                    a.group = e,
                    a.loader.filter = function(a) {
                        return a.get("group") == e && !0 == a.getLayer().displayInLayerSwitcher
                    },
                    a.eachChild(function(a) { (a = b(a)) && a.set("group", e)
                    }),
                    a.ownerTree.fireEvent("beforechildrenrendered", a.parentNode)
                })
            },
            addActions: function() {
                return gxp.plugins.RenameCategory.superclass.addActions.apply(this, [{
                    menuText: this.renameCategoryActionText,
                    iconCls: "icon-layerproperties",
                    disabled: !1,
                    folderAction: !0,
                    tooltip: this.renameCategoryActionTipText,
                    handler: function(a) {
                        if (a.selectedNode.parentNode.isRoot) return Ext.Msg.alert(this.layerContainerText, this.cannotRenameText),
                        !1;
                        this.renameNode(a.selectedNode)
                    },
                    scope: this
                }])[0]
            }
        }); Ext.preg(gxp.plugins.RenameCategory.prototype.ptype, gxp.plugins.RenameCategory); Ext.namespace("gxp.plugins"); gxp.plugins.RemoveCategory = Ext.extend(gxp.plugins.Tool, {
            ptype: "gxp_removecategory",
            removeCategoryActionText: "Remove Category",
            removeCategoryActionTipText: "Remove this category and all its layers from the map",
            cannotRemoveText: "This category cannot be removed",
            getRecordFromNode: function(a) {
                var b;
                if (a && a.layer) {
                    var d = a.layer,
                    a = a.layerStore;
                    b = a.getAt(a.findBy(function(a) {
                        return a.getLayer() === d
                    }))
                }
                return b
            },
            removeNode: function(a) {
                Ext.Msg.show({
                    title: this.removeCategoryActionText,
                    msg: this.removeCategoryActionTipText,
                    buttons: Ext.Msg.OKCANCEL,
                    fn: function(b) {
                        if ("ok" == b) {
                            if (a.parentNode.isRoot) return Ext.Msg.alert(this.layerContainerText, this.cannotRemoveText),
                            !1;
                            if (a) {
                                for (; 0 < a.childNodes.length;) if (b = this.getRecordFromNode(a.childNodes[0])) this.target.removeFromSelectControl(b),
                                this.target.mapPanel.layers.remove(b, !0);
                                a.parentNode.removeChild(a, !0)
                            }
                        }
                    },
                    scope: this
                })
            },
            addActions: function() {
                return gxp.plugins.RemoveCategory.superclass.addActions.apply(this, [{
                    menuText: this.removeCategoryActionText,
                    iconCls: "gxp-icon-removelayers",
                    disabled: !1,
                    folderAction: !0,
                    tooltip: this.removeCategoryActionTipText,
                    handler: function(a) {
                        this.removeNode(a.selectedNode)
                    },
                    scope: this
                }])[0]
            }
        }); Ext.preg(gxp.plugins.RemoveCategory.prototype.ptype, gxp.plugins.RemoveCategory); Ext.namespace("gxp.plugins"); gxp.plugins.FeedSource = Ext.extend(gxp.plugins.LayerSource, {
            ptype: "gx_feedsource",
            title: "Feed Source",
            defaultFormat: "OpenLayers.Format.GeoRSS",
            createLayerRecord: function(a) {
                var b = new OpenLayers.Layer.Vector(a.title, {
                    projection: "projection" in a ? a.projection: "EPSG:4326",
                    visibility: "visibility" in a ? a.visibility: !0,
                    strategies: [new OpenLayers.Strategy.BBOX({
                        resFactor: 1,
                        ratio: 1
                    })],
                    protocol: new OpenLayers.Protocol.HTTP({
                        url: a.url,
                        params: a.params,
                        format: this.getFormat(a)
                    }),
                    styleMap: this.getStyleMap(a)
                });
                b.events.on({
                    loadend: function() {
                        if (null == this.target.selectControl) this.target.selectControl = new OpenLayers.Control.SelectFeature(b, {
                            clickout: !0,
                            listeners: {
                                clickoutFeature: function() {}
                            },
                            scope: this
                        }),
                        this.target.mapPanel.map.addControl(this.target.selectControl);
                        else {
                            var a = this.target.selectControl.layers ? this.target.selectControl.layers: this.target.selectControl.layer ? [this.target.selectControl.layer] : [];
                            a.push(b);
                            this.target.selectControl.setLayer(a)
                        }
                        this.target.selectControl.activate()
                    },
                    scope: this
                });
                this.configureInfoPopup(b);
                return new(GeoExt.data.LayerRecord.create([{
                    name: "title",
                    type: "string"
                },
                {
                    name: "source",
                    type: "string"
                },
                {
                    name: "group",
                    type: "string"
                },
                {
                    name: "fixed",
                    type: "boolean"
                },
                {
                    name: "selected",
                    type: "boolean"
                },
                {
                    name: "visibility",
                    type: "boolean"
                },
                {
                    name: "rssFormat",
                    type: "string"
                },
                {
                    name: "defaultStyle"
                },
                {
                    name: "selectStyle"
                },
                {
                    name: "params"
                }]))({
                    layer: b,
                    title: a.title,
                    source: a.source,
                    group: a.group,
                    fixed: "fixed" in a ? a.fixed: !1,
                    selected: "selected" in a ? a.selected: !1,
                    params: "params" in a ? a.params: {},
                    visibility: "visibility" in a ? a.visibility: !1,
                    rssFormat: "rssFormat" in a ? a.rssFormat: this.defaultFormat,
                    defaultStyle: "defaultStyle" in a ? a.defaultStyle: {},
                    selectStyle: "selectStyle" in a ? a.selectStyle: {}
                },
                b.id)
            },
            getConfigForRecord: function(a) {
                var b = gxp.plugins.FeedSource.superclass.getConfigForRecord.apply(this, arguments);
                return Ext.apply(b, {
                    title: a.get("title"),
                    group: a.get("group"),
                    fixed: a.get("fixed"),
                    selected: a.get("selected"),
                    params: a.get("params"),
                    visibility: a.getLayer().getVisibility(),
                    rssFormat: a.get("rssFormat"),
                    defaultStyle: a.getLayer().styleMap.styles["default"].defaultStyle,
                    selectStyle: a.getLayer().styleMap.styles.select.defaultStyle
                })
            },
            getFormat: function(a) {
                var b = window,
                a = ("rssFormat" in a ? a.rssFormat: this.defaultFormat).split("."),
                d = 0,
                e = a.length;
                for (; d < e && !(b = b[a[d]], !b); ++d);
                if (b && b.prototype && b.prototype.initialize) return a = function() {
                    b.prototype.initialize.apply(this)
                },
                a.prototype = b.prototype,
                new a
            },
            getStyleMap: function(a) {
                return new OpenLayers.StyleMap({
                    "default": new OpenLayers.Style("defaultStyle" in a ? a.defaultStyle: {
                        graphicName: "circle",
                        pointRadius: 5,
                        fillOpacity: 0.7,
                        fillColor: "Red"
                    }),
                    select: new OpenLayers.Style("selectStyle" in a ? a.selectStyle: {
                        graphicName: "circle",
                        pointRadius: 10,
                        fillOpacity: 1,
                        fillColor: "Yellow"
                    })
                })
            },
            configureInfoPopup: function(a) {
                a.events.on({
                    featureselected: function(a) {
                        a = a.feature;
                        this.target.selectControl.popup && this.target.mapPanel.map.removePopup(this.target.selectControl.popup);
                        this.target.selectControl.popup = new OpenLayers.Popup.FramedCloud("popup", a.geometry.getBounds().getCenterLonLat(), new OpenLayers.Size(300, 300), "<a target='_blank' href=\"" + a.attributes.link + '">' + a.attributes.title + "</a><p>" + a.attributes.description + "</p>", null, !0);
                        this.target.selectControl.popup.closeOnMove = !0;
                        this.target.selectControl.popup.keepInMap = !0;
                        this.target.selectControl.popup.panMapIfOutOfView = !1;
                        this.target.selectControl.popup.autoSize = !0;
                        this.target.mapPanel.map.addPopup(this.target.selectControl.popup)
                    },
                    featureunselected: function() {
                        this.target.mapPanel.map.removePopup(this.target.selectControl.popup);
                        this.target.selectControl.popup = null
                    },
                    moveend: function() {
                        if (this.target.selectControl) this.target.selectControl.popup = null
                    },
                    removed: function() {
                        a.destroyFeatures()
                    },
                    scope: this
                })
            }
        }); Ext.preg(gxp.plugins.FeedSource.prototype.ptype, gxp.plugins.FeedSource); Ext.namespace("gxp.plugins"); OpenLayers.Format.Picasa = OpenLayers.Class(OpenLayers.Format.GeoRSS, {
            createFeatureFromItem: function(a) {
                var b = OpenLayers.Format.GeoRSS.prototype.createFeatureFromItem.apply(this, arguments),
                d = this.getElementsByTagNameNS(a, "http://search.yahoo.com/mrss/", "thumbnail");
                if (0 < d.length) b.attributes.thumbnail = d[0].getAttribute("url");
                b.attributes.content = OpenLayers.Util.getXmlNodeValue(this.getElementsByTagNameNS(a, "*", "summary")[0]);
                return b
            }
        }); gxp.plugins.PicasaFeedSource = Ext.extend(gxp.plugins.FeedSource, {
            ptype: "gx_picasasource",
            url: "/picasa",
            defaultFormat: "OpenLayers.Format.Picasa",
            title: "Picasa Source",
            createLayerRecord: function(a) {
                if (null == a.params) a.params = {
                    kind: "photo",
                    "max-results": 50,
                    q: ""
                };
                null == a.params.kind && (a.params.kind = "photo");
                "" == a.params["max-results"] && (a.params["max-results"] = 50);
                a.url = this.url;
                return gxp.plugins.PicasaFeedSource.superclass.createLayerRecord.apply(this, arguments)
            },
            configureInfoPopup: function(a) {
                a.events.on({
                    featureselected: function(a) {
                        var a = a.feature,
                        d = a.geometry;
                        null != this.target.selectControl.popup && this.target.mapPanel.map.removePopup(this.target.selectControl.popup);
                        var e = document.createElement("div");
                        e.innerHTML = a.attributes.content;
                        this.target.selectControl.popup = new OpenLayers.Popup("popup", new OpenLayers.LonLat(d.x, d.y), new OpenLayers.Size(160, 160), "<a target='_blank' href=" + e.getElementsByTagName("a")[0].getAttribute("href") + "><img title='" + a.attributes.title + "' src='" + a.attributes.thumbnail + "' /></a>", !1);
                        this.target.selectControl.popup.closeOnMove = !0;
                        this.target.selectControl.popup.keepInMap = !0;
                        this.target.mapPanel.map.addPopup(this.target.selectControl.popup)
                    },
                    featureunselected: function() {
                        this.target.mapPanel.map.removePopup(this.target.selectControl.popup);
                        this.target.selectControl.popup = null
                    },
                    scope: this
                })
            },
            getStyleMap: function() {
                return new OpenLayers.StyleMap({
                    "default": new OpenLayers.Style({
                        externalGraphic: "${thumbnail}",
                        pointRadius: 14
                    }),
                    select: new OpenLayers.Style({
                        pointRadius: 20
                    })
                })
            }
        }); Ext.preg(gxp.plugins.PicasaFeedSource.prototype.ptype, gxp.plugins.PicasaFeedSource); Ext.namespace("gxp.plugins"); OpenLayers.Format.Flickr = OpenLayers.Class(OpenLayers.Format.JSON, {
            defaultFormat: "OpenLayers.Format.JSON",
            defaultThumbnail: "url_q",
            defaultContent: "title",
            read: function(a, b) {
                return this.parseResponse(OpenLayers.Format.JSON.prototype.read.apply(this, arguments).photos.photo)
            },
            parseResponse: function(a) {
                for (var b = [a.length], d = 0; d < a.length; d++) {
                    var e = a[d],
                    g = new OpenLayers.Geometry.Point(e.longitude, e.latitude),
                    j = {},
                    k;
                    for (k in e) j[k] = e[k];
                    j.thumbnail = e[this.defaultThumbnail];
                    j.content = e[this.defaultContent];
                    j.link = "http://www.flickr.com/photos/" + j.owner + "/" + j.id;
                    b[d] = new OpenLayers.Feature.Vector(g, j)
                }
                return b
            }
        }); gxp.plugins.FlickrFeedSource = Ext.extend(gxp.plugins.FeedSource, {
            ptype: "gx_flickrsource",
            url: "/flickr",
            defaultFormat: "OpenLayers.Format.Flickr",
            title: "Flickr Source",
            createLayerRecord: function(a) {
                if (null == a.params) a.params = {
                    "max-results": 500,
                    q: ""
                };
                "" == a.params["max-results"] && (a.params["max-results"] = 500);
                a.url = this.url;
                return gxp.plugins.FlickrFeedSource.superclass.createLayerRecord.apply(this, arguments)
            },
            configureInfoPopup: function(a) {
                a.events.on({
                    featureselected: function(a) {
                        var a = a.feature,
                        d = a.geometry;
                        null != this.target.selectControl.popup && this.target.mapPanel.map.removePopup(this.target.selectControl.popup);
                        document.createElement("div").innerHTML = a.attributes.description;
                        this.target.selectControl.popup = new OpenLayers.Popup("popup", new OpenLayers.LonLat(d.x, d.y), new OpenLayers.Size(150, 150), "<a target='_blank' href=" + a.attributes.link + "><img title='" + a.attributes.title + "' src='" + a.attributes.thumbnail + "' /></a>", !1);
                        this.target.selectControl.popup.closeOnMove = !0;
                        this.target.selectControl.popup.keepInMap = !0;
                        this.target.mapPanel.map.addPopup(this.target.selectControl.popup)
                    },
                    featureunselected: function() {
                        this.target.mapPanel.map.removePopup(this.target.selectControl.popup);
                        this.target.selectControl.popup = null
                    },
                    scope: this
                })
            },
            getStyleMap: function() {
                return new OpenLayers.StyleMap({
                    "default": new OpenLayers.Style({
                        externalGraphic: "${thumbnail}",
                        pointRadius: 14
                    }),
                    select: new OpenLayers.Style({
                        pointRadius: 20
                    })
                })
            }
        }); Ext.preg(gxp.plugins.FlickrFeedSource.prototype.ptype, gxp.plugins.FlickrFeedSource); Ext.namespace("gxp.plugins"); OpenLayers.Format.YouTube = OpenLayers.Class(OpenLayers.Format.GeoRSS, {
            createFeatureFromItem: function(a) {
                var b = OpenLayers.Format.GeoRSS.prototype.createFeatureFromItem.apply(this, arguments);
                b.attributes.thumbnail = this.getElementsByTagNameNS(a, "http://search.yahoo.com/mrss/", "thumbnail")[4].getAttribute("url");
                b.attributes.content = OpenLayers.Util.getXmlNodeValue(this.getElementsByTagNameNS(a, "*", "summary")[0]);
                return b
            }
        }); gxp.plugins.YouTubeFeedSource = Ext.extend(gxp.plugins.FeedSource, {
            ptype: "gx_youtubesource",
            url: "/youtube",
            defaultFormat: "OpenLayers.Format.YouTube",
            title: "YouTube Source",
            createLayerRecord: function(a) {
                if (!a.params) a.params = {
                    "max-results": 50,
                    q: ""
                };
                "" === a.params["max-results"] && (a.params["max-results"] = 50);
                "" === a.params.q && (a.params.q = "");
                a.url = this.url;
                a.params["max-results"] = Math.min(a.params["max-results"], 50);
                return gxp.plugins.YouTubeFeedSource.superclass.createLayerRecord.apply(this, arguments)
            },
            configureInfoPopup: function(a) {
                a.events.on({
                    featureselected: function(a) {
                        var a = a.feature,
                        d = a.geometry;
                        null != this.target.selectControl.popup && this.target.mapPanel.map.removePopup(this.target.selectControl.popup);
                        document.createElement("div").innerHTML = a.attributes.content;
                        this.target.selectControl.popup = new OpenLayers.Popup("popup", new OpenLayers.LonLat(d.x, d.y), new OpenLayers.Size(240, 180), "<a target='_blank' href=" + a.attributes.link + "><img height='180', width='240' title='" + a.attributes.title + "' src='" + a.attributes.thumbnail + "' /></a>", !1);
                        this.target.selectControl.popup.closeOnMove = !0;
                        this.target.selectControl.popup.keepInMap = !0;
                        this.target.mapPanel.map.addPopup(this.target.selectControl.popup)
                    },
                    featureunselected: function() {
                        this.target.mapPanel.map.removePopup(this.target.selectControl.popup);
                        this.target.selectControl.popup = null
                    },
                    scope: this
                })
            },
            getStyleMap: function() {
                return new OpenLayers.StyleMap({
                    "default": new OpenLayers.Style({
                        externalGraphic: "${thumbnail}",
                        pointRadius: 24
                    }),
                    select: new OpenLayers.Style({
                        pointRadius: 30
                    })
                })
            }
        }); Ext.preg(gxp.plugins.YouTubeFeedSource.prototype.ptype, gxp.plugins.YouTubeFeedSource); Ext.namespace("gxp.plugins"); gxp.plugins.HGLFeedSource = Ext.extend(gxp.plugins.FeedSource, {
            ptype: "gx_hglfeedsource",
            url: "/hglpoint",
            defaultFormat: "OpenLayers.Format.GeoRSS",
            title: "HGL Feed Source",
            createLayerRecord: function(a) {
                "" == a.params["max-results"] && (a.params["max-results"] = 50);
                a.url = this.url;
                return gxp.plugins.HGLFeedSource.superclass.createLayerRecord.apply(this, arguments)
            },
            configureInfoPopup: function(a) {
                a.events.on({
                    featureselected: function(a) {
                        var a = a.feature,
                        d = a.geometry;
                        this.target.selectControl.popup && this.target.mapPanel.map.removePopup(this.target.selectControl.popup);
                        document.createElement("div").innerHTML = a.attributes.content;
                        this.target.selectControl.popup = new OpenLayers.Popup.FramedCloud("popup", new OpenLayers.LonLat(d.x, d.y), new OpenLayers.Size(300, 300), "<a target='_blank' href=\"" + a.attributes.link + '">' + a.attributes.title + "</a><p>" + a.attributes.description + "</p>", null, !0);
                        this.target.selectControl.popup.closeOnMove = !0;
                        this.target.selectControl.popup.panMapIfOutOfView = !1;
                        this.target.selectControl.popup.autoSize = !0;
                        this.target.mapPanel.map.addPopup(this.target.selectControl.popup)
                    },
                    featureunselected: function() {
                        this.target.mapPanel.map.removePopup(this.target.selectControl.popup);
                        this.target.selectControl.popup = null
                    },
                    moveend: function() {
                        if (this.target.selectControl) this.target.selectControl.popup = null
                    },
                    scope: this
                })
            },
            getStyleMap: function() {
                return new OpenLayers.StyleMap({})
            }
        }); Ext.preg(gxp.plugins.HGLFeedSource.prototype.ptype, gxp.plugins.HGLFeedSource); Ext.namespace("gxp.plugins"); gxp.plugins.HGLSource = Ext.extend(gxp.plugins.WMSSource, {
            ptype: "gxp_hglsource",
            baseParams: null,
            title: "Harvard Geospatial Library Source",
            noCompatibleSRSTitle: "Warning",
            noCompatibleSRSText: "This layer cannot be added to the map since it is not available in any projection that is compatible with the map projection",
            format: null,
            url: null,
            createLayerRecord: function(a) {
                a.bbox = [ - 2.003750834E7, -2.003750834E7, 2.003750834E7, 2.003750834E7];
                return gxp.plugins.HGLSource.superclass.createLayerRecord.apply(this, arguments)
            },
            initDescribeLayerStore: function() {
                this.describeLayerStore = new GeoExt.data.WMSDescribeLayerStore({
                    url: this.url,
                    baseParams: {
                        VERSION: "1.1.1",
                        REQUEST: "DescribeLayer"
                    }
                })
            },
            createStore: function() {
                this.store = {
                    reader: {
                        raw: null
                    },
                    findExact: function() {
                        return - 1
                    },
                    getCount: function() {
                        return 1
                    }
                };
                this.fireEvent("ready", this)
            }
        }); Ext.preg(gxp.plugins.HGLSource.prototype.ptype, gxp.plugins.HGLSource); Ext.namespace("gxp"); gxp.FeedSourceDialog = Ext.extend(Ext.Window, {
            addPicasaText: "Picasa Photos",
            addFlickrText: "Add Flickr Photos",
            addYouTubeText: "YouTube Videos",
            addHGLText: "Harvard Geospatial Library",
            addRSSText: "Other GeoRSS Feed",
            addFeedText: "Add to Map",
            titleText: "Feed Title",
            keywordText: "Keyword",
            target: null,
            width: 600,
            autoHeight: !0,
            initComponent: function() {
                this.addEvents("feed-added");
                this.sourceTypeRadioList = new Ext.form.RadioGroup({
                    fieldLabel: "Type",
                    columns: [500],
                    labelWidth: 100,
                    items: [{
                        name: "source_type",
                        inputValue: "gx_flickrsource",
                        boxLabel: this.addFlickrText
                    },
                    {
                        name: "source_type",
                        inputValue: "gx_picasasource",
                        boxLabel: this.addPicasaText
                    },
                    {
                        name: "source_type",
                        inputValue: "gx_youtubesource",
                        boxLabel: this.addYouTubeText
                    },
                    {
                        name: "source_type",
                        inputValue: "gx_hglfeedsource",
                        boxLabel: this.addHGLText
                    },
                    {
                        name: "source_type",
                        inputValue: "gx_feedsource",
                        boxLabel: this.addRSSText,
                        checked: !0
                    }],
                    listeners: {
                        change: function(a, b) {
                            b && "gx_feedsource" == b.inputValue ? (this.urlTextField.show(), this.keywordTextField.hide(), this.maxResultsField.hide(), this.symbolizerField.show()) : (this.urlTextField.hide(), this.keywordTextField.show(), this.maxResultsField.show(), this.symbolizerField.hide())
                        },
                        scope: this
                    }
                });
                this.urlTextField = new Ext.form.TextField({
                    fieldLabel: "URL",
                    allowBlank: !1,
                    width: 240,
                    msgTarget: "right",
                    validator: this.urlValidator.createDelegate(this)
                });
                this.keywordTextField = new Ext.form.TextField({
                    fieldLabel: this.keywordText,
                    allowBlank: !0,
                    hidden: !0,
                    width: 150,
                    msgTarget: "right"
                });
                this.titleTextField = new Ext.form.TextField({
                    fieldLabel: this.titleText,
                    allowBlank: !0,
                    width: 150,
                    msgTarget: "right"
                });
                this.maxResultsField = new Ext.form.ComboBox({
                    fieldLabel: "Maximum # Results",
                    hidden: !0,
                    hiddenName: "max-results",
                    store: new Ext.data.ArrayStore({
                        fields: ["max-results"],
                        data: [[10], [25], [50], [100]]
                    }),
                    displayField: "max-results",
                    mode: "local",
                    triggerAction: "all",
                    emptyText: "Choose number...",
                    labelWidth: 100,
                    defaults: {
                        labelWidth: 100,
                        width: 100
                    }
                });
                this.symbolizerField = new gxp.PointSymbolizer({
                    bodyStyle: {
                        padding: "10px"
                    },
                    border: !1,
                    hidden: !1,
                    labelWidth: 70,
                    defaults: {
                        labelWidth: 70
                    },
                    symbolizer: {
                        pointGraphics: "circle",
                        pointRadius: "5"
                    }
                });
                this.symbolizerField.find("name", "rotation")[0].hidden = !0;
                if ("Point" === this.symbolType && this.pointGraphics) cfg.pointGraphics = this.pointGraphics;
                this.submitButton = new Ext.Button({
                    text: this.addFeedText,
                    iconCls: "gxp-icon-addlayers",
                    handler: function() {
                        var a = this.sourceTypeRadioList.getValue().inputValue,
                        b = {
                            title: this.titleTextField.getValue(),
                            group: "GeoRSS Feeds"
                        };
                        if ("gx_feedsource" != a) b.params = {
                            q: this.keywordTextField.getValue(),
                            "max-results": this.maxResultsField.getValue()
                        };
                        else {
                            b.url = this.urlTextField.getValue();
                            var d = this.symbolizerField.symbolizer;
                            b.defaultStyle = {};
                            b.selectStyle = {};
                            Ext.apply(b.defaultStyle, d);
                            Ext.apply(b.selectStyle, d);
                            Ext.apply(b.selectStyle, {
                                fillColor: "Yellow",
                                pointRadius: parseInt(d.pointRadius) + 2
                            })
                        }
                        this.fireEvent("feed-added", a, b);
                        this.hide()
                    },
                    scope: this
                });
                this.items = this.panel = new Ext.Panel({
                    items: [this.sourceTypeRadioList, this.titleTextField, this.urlTextField, this.keywordTextField, this.maxResultsField, this.symbolizerField, {
                        xtype: "panel",
                        frame: !1,
                        border: !1,
                        region: "south",
                        layout: new Ext.layout.HBoxLayout({
                            pack: "center",
                            defaultMargins: {
                                top: 10,
                                bottom: 10,
                                left: 10,
                                right: 0
                            }
                        }),
                        items: [this.submitButton]
                    }],
                    layout: "form",
                    border: !1,
                    labelWidth: 100,
                    bodyStyle: "padding: 5px",
                    autoWidth: !0,
                    autoHeight: !0
                });
                gxp.FeedSourceDialog.superclass.initComponent.call(this)
            },
            urlRegExp: /^(http(s)?:)?\/\/([\w%]+:[\w%]+@)?([^@\/:]+)(:\d+)?\//i,
            urlValidator: function(a) {
                a = this.urlRegExp.test(a) ? !this.error || this.error: this.invalidURLText;
                this.error = null;
                return a
            }
        }); Ext.reg("gxp_feedsourcedialog", gxp.FeedSourceDialog); Ext.namespace("gxp.plugins"); gxp.plugins.LayerShare = Ext.extend(gxp.plugins.Tool, {
            ptype: "gxp_layershare",
            menuText: "Share Layer",
            toolTip: "Layer info and download links",
            linkPrefix: "/data/",
            constructor: function(a) {
                gxp.plugins.LayerProperties.superclass.constructor.apply(this, arguments);
                if (!this.outputConfig) this.outputConfig = {
                    width: 325,
                    autoHeight: !0
                }
            },
            addActions: function() {
                var a = gxp.plugins.LayerShare.superclass.addActions.apply(this, [{
                    menuText: this.menuText,
                    iconCls: "gxp-icon-link",
                    disabled: !0,
                    tooltip: this.toolTip,
                    handler: function() {
                        this.removeOutput();
                        this.addOutput()
                    },
                    scope: this
                }]),
                b = a[0];
                this.target.on("layerselectionchange",
                function(a) {
                    b.setDisabled(!a || !a.get("properties") || 0 !== a.getLayer().url.replace(this.target.urlPortRegEx, "$1/").indexOf(this.target.localGeoServerBaseUrl.replace(this.urlPortRegEx, "$1/")));
                    if (!b.isDisabled()) this.link = this.linkPrefix + a.getLayer().params.LAYERS
                },
                this);
                return a
            },
            addOutput: function() {
                window.open(this.link)
            }
        }); Ext.preg(gxp.plugins.LayerShare.prototype.ptype, gxp.plugins.LayerShare); Ext.namespace("gxp.plugins"); gxp.plugins.MapShare = Ext.extend(gxp.plugins.Tool, {
            ptype: "gxp_mapshare",
            text: "Share My Map",
            toolTip: "Map info and download links",
            linkPrefix: "/maps/",
            linkSuffix: "/info/",
            iconCls: "gxp-icon-link",
            addActions: function() {
                var a = this.linkPrefix + this.target.mapID + this.linkSuffix;
                return gxp.plugins.MapShare.superclass.addActions.call(this, [{
                    iconCls: this.iconCls,
                    text: this.text,
                    tooltip: this.toolTip,
                    disabled: null == this.target.mapID,
                    handler: function() {
                        window.open(a)
                    },
                    scope: this
                }])
            }
        }); Ext.preg(gxp.plugins.MapShare.prototype.ptype, gxp.plugins.MapShare); Ext.namespace("gxp.plugins"); gxp.plugins.GeoNodeSource = Ext.extend(gxp.plugins.WMSSource, {
            ptype: "gxp_gnsource",
            baseParams: null,
            title: "GeoNode Source",
            noCompatibleSRSTitle: "Warning",
            noCompatibleSRSText: "This layer cannot be added to the map since it is not available in any projection that is compatible with the map projection",
            format: null,
            describedLayers: null,
            schemaCache: null,
            url: null,
            createLayerRecord: function(a) {
                if (a.llbbox) {
                    this.url = a.url.replace(/https?:/, window.location.protocol);
                    var b = this.getMapProjection(),
                    d = OpenLayers.Bounds.fromArray(a.llbbox).transform(new OpenLayers.Projection("EPSG:4326"), b);
                    if (! (0 < 1 / d.getHeight()) || !(0 < 1 / d.getWidth())) d = void 0;
                    var e = {
                        STYLES: a.styles,
                        FORMAT: a.format,
                        TRANSPARENT: "transparent" in a ? a.transparent: !0,
                        LAYERS: a.name,
                        EXCEPTIONS: "application/vnd.ogc.se_inimage",
                        VERSION: "1.1.1",
                        SERVICE: "WMS",
                        REQUEST: "GetMap",
                        LLBBOX: a.llbbox,
                        URL: this.url
                    };
                    "cql_filter" in a && (e.CQL_FILTER = a.cql_filter);
                    b = new OpenLayers.Layer.WMS(a.title, this.url, e, {
                        maxExtent: d,
                        restrictedExtent: d,
                        singleTile: "tiled" in a ? !a.tiled: !1,
                        ratio: a.ratio || 1,
                        visibility: "visibility" in a ? a.visibility: !0,
                        opacity: "opacity" in a ? a.opacity: 1,
                        buffer: "buffer" in a ? a.buffer: 1,
                        projection: b
                    }); ! ("tiled" in a) || !0 === a.tiled ? (d = a.tileOriginLon || -2.003750834E7, e = a.tileOriginLat || -2.003750834E7, b.addOptions({
                        resolutions: a.tileResolutions || [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169, 0.037322767712175846, 0.018661383856087923, 0.009330691928043961, 0.004665345964021981],
                        tileSize: new OpenLayers.Size(a.tileWidth || 256, a.tileHeight || 256),
                        tileOrigin: new OpenLayers.LonLat(e, d)
                    }), b.params.TILED = !0) : b.params.TILED = !1;
                    if (a.attributes) b.attributes = a.attributes;
                    a = {
                        title: a.title,
                        name: a.name,
                        source: a.source,
                        group: a.group,
                        attributes: a.attributes,
                        properties: "gxp_wmslayerpanel",
                        fixed: a.fixed,
                        selected: "selected" in a ? a.selected: !1,
                        layer: b,
                        queryable: a.queryable,
                        disabled: a.disabled,
                        "abstract": a["abstract"],
                        styles: [a.styles],
                        restUrl: this.restUrl,
                        cql_filter: "cql_filter" in a ? a.cql_filter: "",
                        getFeatureInfo: a.getFeatureInfo
                    };
                    return a = new(GeoExt.data.LayerRecord.create([{
                        name: "title",
                        type: "string"
                    },
                    {
                        name: "name",
                        type: "string"
                    },
                    {
                        name: "source",
                        type: "string"
                    },
                    {
                        name: "group",
                        type: "string"
                    },
                    {
                        name: "attributes"
                    },
                    {
                        name: "properties",
                        type: "string"
                    },
                    {
                        name: "fixed",
                        type: "boolean"
                    },
                    {
                        name: "selected",
                        type: "boolean"
                    },
                    {
                        name: "queryable",
                        type: "boolean"
                    },
                    {
                        name: "disabled",
                        type: "boolean"
                    },
                    {
                        name: "abstract",
                        type: "string"
                    },
                    {
                        name: "styles"
                    },
                    {
                        name: "restUrl",
                        type: "string"
                    },
                    {
                        name: "cql_filter",
                        type: "string"
                    },
                    {
                        name: "getFeatureInfo"
                    }]))(a, b.id)
                }
            },
            initDescribeLayerStore: function() {
                this.describeLayerStore = new GeoExt.data.WMSDescribeLayerStore({
                    url: this.url,
                    baseParams: {
                        VERSION: "1.1.1",
                        REQUEST: "DescribeLayer"
                    }
                })
            },
            createStore: function() {
                this.fireEvent("ready", this)
            },
            getConfigForRecord: function(a) {
                var b = gxp.plugins.WMSSource.superclass.getConfigForRecord.apply(this, arguments),
                d = a.getLayer().params,
                b = Ext.apply(b, {
                    format: d.FORMAT,
                    styles: d.STYLES,
                    transparent: d.TRANSPARENT,
                    url: d.URL,
                    llbbox: d.LLBBOX
                });
                "CQL_FILTER" in d && Ext.apply(b, {
                    cql_filter: d.CQL_FILTER
                });
                return b = Ext.apply(b, {
                    styles: d.STYLES,
                    tiled: d.TILED
                })
            }
        }); Ext.preg(gxp.plugins.GeoNodeSource.prototype.ptype, gxp.plugins.GeoNodeSource); Ext.namespace("gxp"); gxp.plugins.GeoNodeQueryTool = Ext.extend(gxp.plugins.Tool, {
            ptype: "gxp_geonodequerytool",
            outputTarget: "map",
            popupCache: null,
            infoActionTip: "Get Feature Info",
            popupTitle: "Feature Info",
            resetTitle: "Reset",
            resetToolTipText: " Clear all features",
            toolText: null,
            iconCls: "gxp-icon-getfeatureinfo",
            proj_merc: new OpenLayers.Projection("EPSG:900913"),
            featurePanel: "",
            attributePanel: "",
            gridResultsPanel: "gridResultsPanel",
            geopsUrl: "128.30.77.77:8083",
            addActions: function() {
                var a;
                this.popupCache = {};
                var b = this,
                d = gxp.plugins.GeoNodeQueryTool.superclass.addActions.call(this, [{
                    tooltip: this.infoActionTip,
                    iconCls: this.iconCls,
                    text: this.toolText,
                    id: this.id,
                    pressed: !0,
                    toggleGroup: this.toggleGroup,
                    enableToggle: !0,
                    allowDepress: !0,
                    toggleHandler: function(d, e) {
                        for (var g = a.length; g--;) e ? a[g].activate() : (a[g].deactivate(), b.reset(!0))
                    }
                }]),
                e = this.actions[0].items[0];
                a = [];
                var g = function(b) {
                    if ((!b.property || "visibility" == b.property) && b.layer.getVisibility() && !0 === b.layer.displayInLayerSwitcher && b.layer instanceof OpenLayers.Layer.WMS) {
                        for (var b = this.target.mapPanel.layers.queryBy(function(a) {
                            return a.get("queryable") && a.getLayer().getVisibility() && !0 === a.getLayer().displayInLayerSwitcher && a.getLayer() instanceof OpenLayers.Layer.WMS
                        }), d = this.target.localGeoServerBaseUrl, g = this.target.mapPanel.map, n, o = 0, q = a.length; o < q; o++) {
                            n = a[o];
                            try {
                                n.deactivate()
                            } catch(s) {} finally {
                                n.destroy()
                            }
                        }
                        var v = b.length,
                        u = 0,
                        r = 0,
                        t = [],
                        w = [];
                        a = [];
                        b.each(function(b) {
                            var j = b.getLayer();
                            if (j.url) {
                                var n = Ext.apply({},
                                this.vendorParams),
                                o;
                                if (this.layerParams) for (var q = this.layerParams.length - 1; 0 <= q; --q) o = this.layerParams[q].toUpperCase(),
                                n[o] = j.params[o];
                                n.buffer = 25;
                                if ( - 1 < j.url.indexOf(d)) {
                                    var s = new OpenLayers.Control.GetFeature({
                                        protocol: OpenLayers.Protocol.WFS.fromWMSLayer(j),
                                        clickTolerance: 10,
                                        layer: j,
                                        box: !1,
                                        hover: !1,
                                        single: !0,
                                        eventListeners: {
                                            clickout: function() {
                                                0 === u && (t = []);
                                                u++;
                                                u == v && (u = 0, 0 != t.length && this.displayXYResults(t, w), OpenLayers.Element.removeClass(s.map.viewPortDiv, "olCursorWait"))
                                            },
                                            featuresselected: function(a) {
                                                0 === u && (t = []);
                                                u++;
                                                if (a.features) try {
                                                    var d = a.features;
                                                    if (d) {
                                                        d.constructor != Array && (d = [d]);
                                                        d.title = b.get("title");
                                                        if (j.attributes) d.queryfields = j.attributes,
                                                        d.nameField = d.queryfields[0].id;
                                                        else if (0 < d.length) {
                                                            var e = [],
                                                            g;
                                                            for (g in a.features[0].attributes) e.push(g.toString());
                                                            d.queryfields = e;
                                                            if (0 < d.queryfields.length) d.nameField = d.queryfields[0]
                                                        }
                                                        for (var k = a.features.length; k--;) feature = d[k],
                                                        feature.wm_layer_id = r,
                                                        feature.wm_layer_title = d.title,
                                                        feature.wm_layer_name = feature.attributes[d.nameField],
                                                        feature.wm_layer_type = j.params.LAYERS,
                                                        r++,
                                                        t = t.concat(feature);
                                                        w[j.params.LAYERS] = d.queryfields
                                                    }
                                                } catch(m) {}
                                                u == v && (u = 0, 0 != t.length && this.displayXYResults(t, w), OpenLayers.Element.removeClass(s.map.viewPortDiv, "olCursorWait"))
                                            },
                                            scope: this
                                        }
                                    });
                                    OpenLayers.Util.extend(s, {
                                        request: function(a, b) {
                                            b = b || {};
                                            new OpenLayers.Filter.Spatial({
                                                type: this.filterType,
                                                value: a
                                            });
                                            OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait");
                                            var d = this,
                                            e = this.layer,
                                            g = e.url; - 1 < g.indexOf("?") && (g = g.substring(0, g.indexOf("?")));
                                            g += "?service=WFS&request=GetFeature&version=1.0.0&srsName=EPSG:900913&outputFormat=GML2&typeName=" + e.params.LAYERS + "&BBOX=" + a.toBBOX() + ",EPSG:900913";
                                            Ext.Ajax.request({
                                                url: g,
                                                success: function(e) { (e = (new OpenLayers.Format.GML).read(e.responseText)) && 0 < e.length ? !0 == b.single ? d.selectBestFeature(e, a.getCenterLonLat(), b) : d.select(e) : (d.events.triggerEvent("clickout"), d.clickout && d.unselectAll())
                                                },
                                                failure: function() {
                                                    d.events.triggerEvent("clickout")
                                                }
                                            })
                                        },
                                        selectBestFeature: function(a, b, d) {
                                            d = d || {};
                                            if (a.length) {
                                                for (var b = new OpenLayers.Geometry.Point(b.lon, b.lat), e, g, j = [], k = Number.MAX_VALUE, m = 0, n = a.length; m < n; ++m) if (e = a[m], e.geometry) if ( - 1 < e.geometry.CLASS_NAME.indexOf("Point")) {
                                                    j = a;
                                                    break
                                                } else if (g = b.distanceTo(e.geometry, {
                                                    edge: !1
                                                }), g < k && (k = g, j = e, 0 == k)) break; ! 0 == d.hover ? this.hoverSelect(j) : this.select(j || a)
                                            }
                                        }
                                    })
                                } else s = -1 < j.url.indexOf(this.geopsUrl) ? new GeoExplorer.GeopsGetFeatureInfo({
                                    format: new OpenLayers.Format.JSON,
                                    url: j.url,
                                    radius: 100,
                                    queryVisible: !0,
                                    layers: [j],
                                    eventListeners: {
                                        getfeatureinfo: function(a) {
                                            0 === u && (t = []);
                                            u++;
                                            if ("" != a.text) {
                                                var d = {};
                                                if ((results = a.features) && "results" in results) results = a.features.results;
                                                if (results) {
                                                    var a = [],
                                                    e;
                                                    for (e in results[0]) a.push(e),
                                                    0 < e.indexOf("name") && (d.nameField = e);
                                                    d.queryfields = a;
                                                    d.nameField = d.nameField || d.queryfields[0];
                                                    for (a = 0; a < results.length; a++) {
                                                        var g = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(results[a].goog_x, results[a].goog_y));
                                                        for (e in results[a]) g.attributes[e] = "time" === e ? (new Date(1E3 * results[a][e])).toLocaleString() : results[a][e];
                                                        g.wm_layer_id = r;
                                                        g.wm_layer_title = b.get("title");
                                                        g.wm_layer_name = g.attributes[d.nameField];
                                                        g.wm_layer_type = j.params.LAYERS;
                                                        r++;
                                                        t = t.concat(g)
                                                    }
                                                    w[j.params.LAYERS] = d.queryfields
                                                }
                                            }
                                            u == v && (u = 0, 0 != t.length && this.displayXYResults(t, w), OpenLayers.Element.removeClass(s.map.viewPortDiv, "olCursorWait"))
                                        },
                                        scope: this
                                    }
                                }) : new OpenLayers.Control.WMSGetFeatureInfo({
                                    url: j.url,
                                    queryVisible: !0,
                                    infoFormat: "application/vnd.ogc.gml",
                                    layers: [j],
                                    vendorParams: n,
                                    eventListeners: {
                                        getfeatureinfo: function(a) {
                                            0 === u && (t = []);
                                            u++;
                                            if ("" != a.text) if ( - 1 < a.text.indexOf("<FeatureInfoResponse")) {
                                                var d = g.getLonLatFromPixel(a.xy),
                                                d = new OpenLayers.Geometry.Point(d.lon, d.lat),
                                                e = Ext.DomQuery,
                                                a = (new OpenLayers.Format.XML).read(a.text),
                                                k = {},
                                                a = e.select("FIELDS", a);
                                                if (0 < a.length) {
                                                    for (var e = [], n = 0, o = a[0].attributes.length; n < o; n++) e.push(a[0].attributes[n].name);
                                                    k.queryfields = e;
                                                    0 < e.length && (k.nameField = k.queryfields[0]);
                                                    for (n = a.length; n--;) {
                                                        node = a[n];
                                                        e = new OpenLayers.Feature.Vector(d);
                                                        for (o = node.attributes.length; o--;) e.attributes[node.attributes[o].name] = node.attributes[o].value;
                                                        e.wm_layer_id = r;
                                                        e.wm_layer_title = b.get("title");
                                                        e.wm_layer_name = e.attributes[k.nameField];
                                                        e.wm_layer_type = j.params.LAYERS;
                                                        r++;
                                                        t = t.concat(e)
                                                    }
                                                    w[j.params.LAYERS] = k.queryfields
                                                }
                                            } else if ((k = a.features) && 0 < k.length) {
                                                k.constructor != Array && (k = [k]);
                                                k.title = b.get("title");
                                                if (0 < k.length) {
                                                    e = [];
                                                    for (d in k[0].attributes) e.push(d.toString());
                                                    k.queryfields = e;
                                                    if (0 < k.queryfields.length) k.nameField = k.queryfields[0]
                                                }
                                                for (n = k.length; n--;) e = k[n],
                                                d = e.geometry ? e.geometry.getBounds() : e.bounds,
                                                (new OpenLayers.Bounds( - 180, -90, 180, 90)).containsBounds(d, !0) ? (o = new OpenLayers.Format.GeoJSON({
                                                    internalProjection: new OpenLayers.Projection("EPSG:4326"),
                                                    externalProjection: new OpenLayers.Projection("EPSG:900913")
                                                }), d = new OpenLayers.Format.GeoJSON({
                                                    projection: new OpenLayers.Projection("EPSG:900913")
                                                }), e = o.write(e), e = d.read(e)[0]) : (d = g.getLonLatFromPixel(a.xy), d = new OpenLayers.Geometry.Point(d.lon, d.lat), d = new OpenLayers.Feature.Vector(d), d.attributes = e.attributes, e = d),
                                                e.wm_layer_id = r,
                                                e.wm_layer_title = k.title,
                                                e.wm_layer_name = e.attributes[k.nameField],
                                                e.wm_layer_type = j.params.LAYERS,
                                                r++,
                                                t = t.concat(e);
                                                w[j.params.LAYERS] = k.queryfields
                                            }
                                            u == v && (u = 0, 0 != t.length && this.displayXYResults(t, w), OpenLayers.Element.removeClass(s.map.viewPortDiv, "olCursorWait"))
                                        },
                                        scope: this
                                    }
                                });
                                g.addControl(s);
                                a.push(s);
                                e && e.pressed && s.activate()
                            }
                        },
                        this)
                    }
                };
                this.target.mapPanel.map.events.register("addlayer", this, g);
                this.target.mapPanel.map.events.register("changelayer", this, g);
                this.target.mapPanel.map.events.register("removelayer", this, g);
                return d
            },
            reset: function(a) { ! 0 === a && (Ext.getCmp(this.attributePanel).removeAll(!0), Ext.getCmp(this.gridResultsPanel).removeAll(!0), Ext.getCmp(this.featurePanel).hide());
                a = this.target.mapPanel.map.layers;
                for (l = a.length; l--;) if ("hilites" == a[l].name) {
                    this.target.mapPanel.map.removeLayer(a[l], !0);
                    break
                }
            },
            displayXYResults: function(a, b) {
                if (!this.target.selectControl || !this.target.selectControl.popup) {
                    var d = Ext.getCmp(this.featurePanel),
                    e = Ext.getCmp(this.attributePanel);
                    d.hidden && (d.show(), d.alignTo(document, "tr-tr"));
                    e.removeAll(!0);
                    var d = new Ext.data.JsonReader({},
                    [{
                        name: "wm_layer_title"
                    },
                    {
                        name: "wm_layer_name"
                    },
                    {
                        name: "wm_layer_id"
                    },
                    {
                        name: "wm_layer_type"
                    }]),
                    g = this,
                    d = new Ext.grid.GridPanel({
                        tbar: [{
                            xtype: "button",
                            text: '<span class="x-btn-text">' + this.resetTitle + "</span>",
                            qtip: this.resetToolTipText,
                            handler: function() {
                                g.reset(!0)
                            },
                            text: "Reset"
                        }],
                        id: "getFeatureInfoGrid",
                        header: !1,
                        store: new Ext.data.GroupingStore({
                            reader: d,
                            data: a,
                            groupField: "wm_layer_title",
                            sortInfo: {
                                field: "wm_layer_id",
                                direction: "ASC"
                            }
                        }),
                        columns: [{
                            id: "wm_layer_id",
                            sortable: !1,
                            header: "FID",
                            dataIndex: "wm_layer_id",
                            hidden: !0
                        },
                        {
                            header: "Name",
                            sortable: !0,
                            dataIndex: "wm_layer_name",
                            width: 190
                        },
                        {
                            header: "Feature Type",
                            dataIndex: "wm_layer_type",
                            width: 0,
                            hidden: !0
                        },
                        {
                            header: "Layer",
                            sortable: !1,
                            dataIndex: "wm_layer_title",
                            width: 0,
                            hidden: !0
                        }],
                        view: new Ext.grid.GroupingView({
                            groupTextTpl: "{group}",
                            style: "width: 425px"
                        }),
                        sm: new Ext.grid.RowSelectionModel({
                            singleSelect: !0,
                            listeners: {
                                rowselect: {
                                    fn: function(d, e, m) {
                                        g.displaySingleResult(a, e, m.data, b[m.data.wm_layer_type])
                                    }
                                }
                            }
                        }),
                        layout: "fit",
                        frame: !1,
                        collapsible: !0,
                        iconCls: "icon-grid",
                        autoHeight: !0,
                        style: "width: 425px",
                        width: "400"
                    });
                    e.add(d);
                    e.doLayout();
                    d.getSelectionModel().selectFirstRow()
                }
            },
            displaySingleResult: function(a, b, d, e) {
                b = Ext.getCmp(this.gridResultsPanel);
                b.removeAll();
                for (var g = null,
                j = a.length; j--;) a[j].wm_layer_id == d.wm_layer_id && (g = a[j]);
                g && (this.addVectorQueryLayer(g), a = this.createHTML(g, e), b.update(a), b.doLayout())
            },
            createHTML: function(a, b) {
                html = '<ul class="featureDetailList" id="featureDetailList">';
                for (c = 0, max = b.length; c < max; c++) {
                    column = b[c];
                    featureValue = "" + (column.header ? a.attributes[column.id] : a.attributes[column]);
                    if ("undefined" == featureValue || "null" == featureValue) featureValue = "";
                    0 == featureValue.indexOf("http") && (featureValue = '<a target="_blank" href="' + featureValue + '">' + featureValue + "</a>");
                    html += "<li><label>" + (column.header ? column.header: column) + "</label><span>" + featureValue + "</span></li>"
                }
                return html += "</ul>"
            },
            addVectorQueryLayer: function(a) {
                var b = new OpenLayers.Layer.Vector("hilites", {
                    isBaseLayer: !1,
                    projection: new OpenLayers.Projection("EPSG:900913"),
                    visibility: !0,
                    style: {
                        strokeColor: "Red",
                        strokeWidth: 4,
                        strokeOpacity: 1,
                        fillOpacity: 0,
                        pointRadius: 10
                    },
                    displayInLayerSwitcher: !1
                });
                b.addFeatures(a);
                b.setVisibility(!0);
                this.target.mapPanel.layers.suspendEvents();
                try {
                    this.reset(!1),
                    this.target.mapPanel.map.addLayer(b)
                } finally {
                    this.target.mapPanel.layers.resumeEvents()
                }
                return b
            }
        }); Ext.preg(gxp.plugins.GeoNodeQueryTool.prototype.ptype, gxp.plugins.GeoNodeQueryTool); Ext.namespace("gxp.plugins"); gxp.plugins.AnnotationTool = Ext.extend(gxp.plugins.Tool, {
            ptype: "gxp_annotation",
            iconCls: "gxp-icon-note",
            currentFeature: null,
            errorTitle: "Error creating annotation",
            noteText: "Note",
            notesText: "Notes",
            showNotesText: "Show notes",
            editNotesText: "Edit notes",
            addNoteText: "Add note",
            newNoteText: "New note",
            projection: "EPSG:4326",
            pointText: "Point",
            lineText: "Line",
            polygonText: "Shape",
            saveFailTitle: "Could not save note",
            saveFailText: "Edit failed.  You might not have permission to save this note.",
            saveText: "Save",
            editText: "Edit",
            deleteText: "Delete",
            cancelText: "Cancel",
            titleText: "Title",
            addActions: function() {
                function a(a) {
                    s.deactivate();
                    u.deactivate();
                    v.deactivate();
                    Ext.getCmp("check_view_annotations").setChecked(!0);
                    Ext.getCmp("check_add_annotations").setChecked(!0);
                    switch (a.text) {
                    case this.pointText:
                        s.activate();
                        break;
                    case this.lineText:
                        u.activate();
                        break;
                    case this.polygonText:
                        v.activate()
                    }
                }
                function b(a) {
                    for (var b = [], e = null, g = 0; g < a.features.length; g++) {
                        var j = a.features[g];
                        b.push({
                            xtype: "button",
                            text: "" + g + " " + j.attributes.title,
                            feature: j,
                            cls: "x-btn-text",
                            handler: function(a) {
                                d(a);
                                e.close();
                                return ! 1
                            },
                            scope: this
                        })
                    }
                    e = new GeoExt.Popup({
                        title: "Select Note",
                        closeAction: "close",
                        autoScroll: !0,
                        location: a.features[0],
                        items: [b]
                    });
                    e.show()
                }
                function d(a) {
                    this.currentFeature && this.currentFeature != a.feature && t.unhighlight(this.currentFeature);
                    if (t) {
                        t.popup && t.popup.close();
                        var b = new Ext.Panel({
                            autoLoad: {
                                url: "/annotations/" + a.feature.fid + "/details",
                                scripts: !0
                            }
                        });
                        this.currentFeature = a.feature;
                        t.highlight(this.currentFeature);
                        t.popup = new GeoExt.Popup({
                            title: a.feature.attributes.title,
                            closeAction: "close",
                            autoScroll: !0,
                            height: 300,
                            width: 400,
                            listeners: {
                                beforeclose: function() {
                                    t.unhighlight(a.feature);
                                    this.currentFeature = a.feature = null
                                }
                            },
                            location: a.feature,
                            items: [b],
                            bbar: [{
                                xtype: "button",
                                id: "anno_editButton",
                                text: this.editText,
                                disabled: n != this.currentFeature.attributes.owner_id && !o,
                                cls: "x-btn-text",
                                style: "display:inline-block;",
                                handler: function() {
                                    j.call(this, a);
                                    t.popup.close();
                                    return ! 1
                                },
                                scope: this
                            },
                            "->", {
                                xtype: "button",
                                id: "anno_deleteButton",
                                disabled: n != this.currentFeature.attributes.owner_id && !o,
                                text: this.deleteText,
                                cls: "x-btn-text",
                                style: "display:inline-block;",
                                handler: function() {
                                    this.currentFeature.state = OpenLayers.State.DELETE;
                                    k.call(this);
                                    t.popup.close();
                                    return ! 1
                                },
                                scope: this
                            }]
                        });
                        t.popup.show()
                    }
                }
                function e(a) {
                    a.feature.fid || j.call(this, a)
                }
                function g() {
                    r.unselectFeature(this.currentFeature);
                    this.currentFeature.saved || q.refresh({
                        force: !0
                    });
                    r.deactivate();
                    t.activate();
                    t.unhighlight(this.currentFeature)
                }
                function j(a) {
                    t.deactivate();
                    this.currentFeature = a.feature;
                    this.currentFeature.saved = !1;
                    if (r) {
                        r.activate();
                        r.selectFeature(this.currentFeature);
                        if (!this.currentFeature.state) this.currentFeature.state = OpenLayers.State.UPDATE;
                        r.popup && r.popup.close();
                        r.popup = new GeoExt.Popup({
                            title: this.newNoteText,
                            width: 450,
                            closeAction: "close",
                            listeners: {
                                beforeclose: g,
                                scope: this
                            },
                            scope: this,
                            location: a.feature,
                            items: [{
                                xtype: "form",
                                bodyStyle: {
                                    padding: "5px"
                                },
                                labelAlign: "top",
                                items: [{
                                    xtype: "textfield",
                                    fieldLabel: this.titleText,
                                    id: "popup_form_title",
                                    value: this.currentFeature && this.currentFeature.attributes.title ? this.currentFeature.attributes.title: ""
                                },
                                {
                                    xtype: "textarea",
                                    width: 400,
                                    height: 100,
                                    fieldLabel: this.noteText,
                                    id: "popup_form_content",
                                    value: this.currentFeature && this.currentFeature.attributes.content ? this.currentFeature.attributes.content: ""
                                }]
                            }],
                            bbar: [{
                                xtype: "button",
                                id: "anno_saveButton",
                                text: this.saveText,
                                cls: "x-btn-text",
                                style: "display:inline-block;",
                                handler: function() {
                                    k.call(this);
                                    return ! 1
                                },
                                scope: this
                            },
                            "->", {
                                xtype: "button",
                                id: "anno_cancelButton",
                                text: this.cancelText,
                                cls: "x-btn-text",
                                style: "display:inline-block;",
                                handler: function() {
                                    r.popup.close();
                                    return ! 1
                                },
                                scope: this
                            }]
                        });
                        r.popup.show()
                    }
                }
                function k() {
                    if (this.currentFeature.state != OpenLayers.State.DELETE) this.currentFeature.attributes.title = Ext.getCmp("popup_form_title").getValue(),
                    this.currentFeature.attributes.content = Ext.getCmp("popup_form_content").getValue();
                    q.strategies[1].save([this.currentFeature]);
                    this.currentFeature.saved = !0;
                    r.unselectFeature(this.currentFeature);
                    this.currentFeature.attributes.owner_id || (this.currentFeature.attributes.owner_id = n);
                    r.popup && r.popup.close()
                }
                var m = new OpenLayers.Strategy.Save;
                m.events.register("fail", this,
                function() {
                    Ext.Msg.alert(this.saveFailTitle, this.saveFailText)
                });
                var n = this.user,
                o = this.target.config.edit_map,
                q = new OpenLayers.Layer.Vector("geo_annotation_layer", {
                    displayInLayerSwitcher: !1,
                    projection: this.projection,
                    strategies: [new OpenLayers.Strategy.BBOX, m],
                    protocol: new OpenLayers.Protocol.HTTP({
                        url: "/annotations/" + this.target.mapID,
                        format: new OpenLayers.Format.GeoJSON
                    })
                }),
                s = new OpenLayers.Control.DrawFeature(q, OpenLayers.Handler.Point, {
                    displayClass: "olControlDrawFeaturePoint",
                    title: "Create Point Annotation"
                }),
                v = new OpenLayers.Control.DrawFeature(q, OpenLayers.Handler.Polygon, {
                    displayClass: "olControlDrawFeaturePolygon",
                    title: "Create Polygon Annotation"
                }),
                u = new OpenLayers.Control.DrawFeature(q, OpenLayers.Handler.Path, {
                    displayClass: "olControlDrawFeaturePath",
                    title: "Create Line Annotation"
                }),
                r = new OpenLayers.Control.ModifyFeature(q, {
                    vertexRenderIntent: "temporary"
                }),
                t = new OpenLayers.LayerFeatureAgent(q, {
                    renderIntent: "select"
                });
                return gxp.plugins.AnnotationTool.superclass.addActions.apply(this, [{
                    text: this.notesText,
                    disabled: !this.target.mapID,
                    iconCls: this.iconCls,
                    toggleGroup: this.toggleGroup,
                    enableToggle: !0,
                    allowDepress: !1,
                    toggleHandler: function(a, b) {
                        b || Ext.getCmp("check_view_annotations").setChecked(!1)
                    },
                    menu: new Ext.menu.Menu({
                        items: [new Ext.menu.CheckItem({
                            id: "check_view_annotations",
                            checked: !1,
                            text: this.showNotesText,
                            listeners: {
                                checkchange: function(a, g) {
                                    if (!0 === g) this.target.selectControl && this.target.selectControl.deactivate(),
                                    this.target.mapPanel.map.addControls([r, s, u, v]),
                                    this.target.mapPanel.map.addLayer(q),
                                    t.activate(),
                                    q.events.register("featureadded", this, e),
                                    q.events.register("beforefeaturemodified", this, e),
                                    q.events.register("featureselected", this, d),
                                    q.events.register("multipleselected", this, b);
                                    else {
                                        t.deactivate();
                                        this.target.selectControl && this.target.selectControl.activate();
                                        this.target.mapPanel.map.removeLayer(q);
                                        Ext.getCmp("check_add_annotations").setChecked(!1);
                                        q.events.unregister("multipleselected", this, b);
                                        q.events.unregister("featureselected", this, d);
                                        q.events.unregister("featureadded", this, e);
                                        q.events.unregister("beforefeaturemodified", this, e);
                                        for (var j = [r, s, u, v], k = 0; k < j.length; k++) j[k].deactivate(),
                                        this.target.mapPanel.map.removeControl(j[k])
                                    }
                                },
                                scope: this
                            }
                        }), new Ext.menu.CheckItem({
                            id: "check_add_annotations",
                            checked: !1,
                            disabled: "None" == n,
                            listeners: {
                                checkchange: function(a) {
                                    a.checked ? Ext.getCmp("check_view_annotations").setChecked(!0) : (s.deactivate(), u.deactivate(), v.deactivate())
                                },
                                scope: this
                            },
                            text: this.addNoteText,
                            menu: [new Ext.menu.CheckItem({
                                groupClass: null,
                                text: this.pointText,
                                group: "featureeditorgroup",
                                iconCls: "gxp-icon-point",
                                listeners: {
                                    click: a,
                                    scope: this
                                }
                            }), new Ext.menu.CheckItem({
                                groupClass: null,
                                text: this.lineText,
                                group: "featureeditorgroup",
                                iconCls: "gxp-icon-line",
                                listeners: {
                                    click: a,
                                    scope: this
                                }
                            }), new Ext.menu.CheckItem({
                                groupClass: null,
                                text: this.polygonText,
                                group: "featureeditorgroup",
                                iconCls: "gxp-icon-polygon",
                                listeners: {
                                    click: a,
                                    scope: this
                                }
                            })]
                        })]
                    })
                }])
            }
        }); Ext.preg(gxp.plugins.AnnotationTool.prototype.ptype, gxp.plugins.AnnotationTool); Ext.namespace("gxp"); gxp.SearchBar = Ext.extend(Ext.Toolbar, {
            emptyText: "Enter search...",
            searchText: "Search",
            noSearchableLayersTitle: "No Searchable Layers",
            noSearchableLayersMsg: "There are currently no searchable layers on the map.  You must have at least one visible layer with searchable fields on the map.",
            searchTermTitle: "Search Term Required",
            searchTermText: "Please enter a search term",
            resetText: "Reset",
            initComponent: function() {
                var a = this.target,
                b = function() {
                    return a.mapPanel.layers.queryBy(function(a) {
                        return a.get("queryable")
                    })
                },
                d = new Ext.form.TextField({
                    id: "search-tb",
                    width: 150,
                    emptyText: this.emptyText,
                    handleMouseEvents: !0,
                    enableKeyEvents: !0,
                    listeners: {
                        render: function(a) {
                            a.getEl().on("keypress",
                            function(a) {
                                13 == a.keyCode && e()
                            })
                        }
                    }
                }),
                e = function(e, g) {
                    var n = b();
                    n.each(function(a) {
                        dl = a.getLayer(); (!dl.getVisibility() || !dl.attributes) && n.remove(a, !0)
                    });
                    if (0 == n.length) Ext.MessageBox.alert(e, g);
                    else try {
                        j();
                        var o = d.getValue(),
                        q = [];
                        null == o || 0 == o.length ? Ext.Msg.alert(this.searchTermTitle, this.searchTermText) : (n.each(function(a) {
                            dl = a.getLayer();
                            if (dl.getVisibility() && dl.attributes) {
                                var a = dl.url,
                                b = [];
                                for (f = 0; f < dl.attributes.length; f++) field = dl.attributes[f],
                                field.searchable && b.push(field.id);
                                var d = "",
                                e;
                                e = '<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">' + ("<sld:NamedLayer><sld:Name>" + dl.params.LAYERS + "</sld:Name><sld:UserStyle><sld:Name>query</sld:Name><sld:FeatureTypeStyle><sld:Rule><ogc:Filter>");
                                for (i = 0; i < b.length; i++)"" != b[i] && (d = d + '<ogc:PropertyIsLike wildCard="*" singleChar="." escapeChar="!"><ogc:PropertyName>' + b[i] + "</ogc:PropertyName><ogc:Literal>*" + o + "*</ogc:Literal></ogc:PropertyIsLike>");
                                1 < b.length && (d = "<ogc:Or>" + d + "</ogc:Or>");
                                0 < d.length && (e = e + d + '</ogc:Filter><PointSymbolizer><Graphic><Mark><WellKnownName>circle</WellKnownName><Fill><CssParameter name="fill">#FFFF00</CssParameter></Fill></Mark><Size>8</Size></Graphic></PointSymbolizer><LineSymbolizer><sld:Stroke><sld:CssParameter name="stroke">#FFFF00</sld:CssParameter><sld:CssParameter name="stroke-opacity">1.0</sld:CssParameter><sld:CssParameter name="stroke-width">2</sld:CssParameter></sld:Stroke></LineSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>', a = new OpenLayers.Layer.WMS("HighlightWMS_" + dl.params.LAYERS.substr(8), a, {
                                    layers: dl.params.LAYERS,
                                    format: "image/png",
                                    SLD_BODY: e,
                                    TILED: !1,
                                    TRANSPARENT: !0
                                },
                                {
                                    isBaseLayer: !1,
                                    displayInLayerSwitcher: !1,
                                    singleTile: !0
                                }), q.push(a))
                            }
                        }), a.mapPanel.map.addLayers(q))
                    } catch(s) {
                        throw s;
                    } finally {}
                },
                g = new Ext.Button({
                    text: '<span class="x-btn-text">' + this.searchText + "</span>",
                    handler: function() {
                        e(this.noSearchableLayersTitle, this.noSearchableLayersMsg)
                    },
                    scope: this
                }),
                j = function() {
                    var b = a.mapPanel.map.layers,
                    d = [];
                    for (l = 0; l < b.length; l++) b[l].name && ( - 1 < b[l].name.toString().indexOf("HighlightWMS") || "hilites" == b[l].name) && d.push(b[l]);
                    for (h = 0; h < d.length; h++) a.mapPanel.map.removeLayer(d[h], !0)
                };
                this.id = "tlbr";
                this.items = [d, " ", g, " ", {
                    xtype: "button",
                    text: '<span class="x-btn-text">' + this.resetText + "</span>",
                    handler: function() {
                        d.setValue("");
                        j();
                        a.busyMask && a.busyMask.hide()
                    }
                }];
                gxp.SearchBar.superclass.initComponent.call(this)
            }
        }); Ext.reg("gxp_searchbar", gxp.SearchBar); Ext.namespace("gxp"); gxp.plugins.MapRevisionTool = Ext.extend(gxp.plugins.Tool, {
            ptype: "gxp_maprevisiontool",
            outputTarget: "map",
            infoActionTip: "View a list of map revisions",
            iconCls: null,
            toolText: "Revisions",
            windowTitle: "Map Revision History",
            hidden: !1,
            disabled: !1,
            addActions: function() {
                var a = new Ext.data.JsonStore({
                    url: "/maps/history/" + this.target.id,
                    fields: [{
                        name: "created",
                        type: "date"
                    },
                    "user", "url", "map"],
                    idProperty: "url",
                    root: "",
                    sortInfo: {
                        field: "created",
                        direction: "DESC"
                    }
                }),
                b = new Ext.grid.GridPanel({
                    width: 400,
                    height: 300,
                    store: a,
                    trackMouseOver: !1,
                    columns: [{
                        header: "Revision Date",
                        dataIndex: "created",
                        width: 200,
                        renderer: function(a, b, d) {
                            return String.format('<b><a href="/maps/{0}/{1}">{2}</a>', d.data.map, d.id, a)
                        },
                        sortable: !0
                    },
                    {
                        header: "URL",
                        dataIndex: "url",
                        width: 10,
                        hidden: !0,
                        sortable: !1
                    },
                    {
                        header: "User",
                        dataIndex: "user",
                        width: 200,
                        align: "right",
                        renderer: function(a) {
                            return String.format('<b><a href="/profiles/{0}">{1}</a>', a, a)
                        },
                        sortable: !0
                    },
                    {
                        header: "Map",
                        dataIndex: "map",
                        width: 10,
                        align: "right",
                        hidden: !0,
                        sortable: !1
                    }],
                    viewConfig: {
                        forceFit: !0
                    }
                }),
                d = new Ext.Window({
                    title: this.windowTitle,
                    closeAction: "hide",
                    items: b,
                    modal: !0,
                    autoScroll: !0
                });
                return gxp.plugins.MapRevisionTool.superclass.addActions.call(this, [{
                    tooltip: this.infoActionTip,
                    iconCls: this.iconCls,
                    id: this.id,
                    text: this.toolText,
                    hidden: this.hidden,
                    disabled: this.disabled,
                    handler: function() {
                        a.load();
                        d.show()
                    }
                }])
            }
        }); Ext.preg(gxp.plugins.MapRevisionTool.prototype.ptype, gxp.plugins.MapRevisionTool); Ext.namespace("gxp"); gxp.plugins.GazetteerTool = Ext.extend(gxp.plugins.Tool, {
            ptype: "gxp_gazetteertool",
            outputTarget: "map",
            infoActionTip: "Enter a place name to search for",
            iconCls: null,
            toolText: "Gazetteer",
            popup: null,
            markers: new OpenLayers.Layer.Markers("Gazetteer Results", {
                displayInLayerSwitcher: !1
            }),
            services: "worldmap,google",
            searchingText: "Searching...",
            firstLoad: !0,
            addActions: function() {
                this.searchTB = new Ext.form.TextField({
                    id: "search-tb",
                    width: 150,
                    emptyText: "Place name:",
                    handleMouseEvents: !0,
                    enableKeyEvents: !0,
                    listeners: {
                        render: function(a) {
                            a.getEl().on("keypress",
                            function(a) {
                                13 == a.keyCode && this.performSearch()
                            })
                        }
                    },
                    scope: this
                });
                this.searchBtn = new Ext.Button({
                    text: '<span class="x-btn-text">Search</span>',
                    handler: function() {
                        this.performSearch()
                    },
                    scope: this
                });
                var a = this,
                b = function(b) {
                    switch (b.checked) {
                    case ! 0 : a.services += "," + b.id;
                        break;
                    default:
                        a.services = a.services.replace("," + b.id, "")
                    }
                },
                d = {
                    text: "WorldMap",
                    id: "worldmap",
                    checked: !0,
                    disabled: !0,
                    hideOnClick: !1,
                    checkHandler: b
                },
                e = {
                    text: "Google",
                    id: "google",
                    checked: !0,
                    hideOnClick: !1,
                    checkHandler: b
                },
                g = {
                    text: "Nominatim",
                    id: "nominatim",
                    checked: !1,
                    hideOnClick: !1,
                    checkHandler: b
                },
                b = {
                    text: "GeoNames",
                    id: "geonames",
                    checked: !1,
                    hideOnClick: !1,
                    checkHandler: b
                };
                this.startDateField = new Ext.form.TextField({
                    emptyText: "From: YYYY-MM-DD"
                });
                this.endDateField = new Ext.form.TextField({
                    emptyText: "To: YYYY-MM-DD"
                });
                this.dateOptions = {
                    text: "Dates",
                    menu: {
                        xtype: "menu",
                        hideOnClick: !1,
                        items: [this.startDateField, this.endDateField]
                    }
                };
                this.geocoderOptions = {
                    text: "Geocoders",
                    menu: {
                        xtype: "menu",
                        hideOnClick: !1,
                        items: [d, e, g, b]
                    }
                };
                this.advancedOptions = new Ext.Button({
                    text: "Advanced",
                    menu: {
                        items: [this.geocoderOptions, this.dateOptions]
                    }
                });
                this.gazetteerReader = new Ext.data.JsonReader({},
                [{
                    name: "placename"
                },
                {
                    name: "coordinates"
                },
                {
                    name: "source"
                },
                {
                    name: "start_date"
                },
                {
                    name: "end_date"
                },
                {
                    name: "gazetteer_id"
                }]);
                this.gazetteerProxy = new Ext.data.HttpProxy({
                    url: "/gazetteer/"
                });
                this.gazetteerDataStore = new Ext.data.Store({
                    proxy: this.gazetteerProxy,
                    reader: this.gazetteerReader
                });
                this.searchMask = new Ext.LoadMask(Ext.getBody(), {
                    msg: this.searchingText,
                    store: this.gazetteerDataStore
                });
                var j = this.markers,
                k = this.target.mapPanel.map,
                m = function() {
                    this.destroy()
                },
                n = function(a) {
                    var b = a.get("coordinates"),
                    b = (new OpenLayers.LonLat(b[1], b[0])).transform("EPSG:4326", k.projection),
                    d = a.get("start_date") || "N/A",
                    e = a.get("end_date") || "N/A";
                    this.popup = new OpenLayers.Popup.FramedCloud("featurePopup", b, new OpenLayers.Size(100, 100), "<h2>" + a.get("placename") + "</h2>Source: " + a.get("source") + "<br/>" + ("N/A" != d ? "Start Date: " + d + "<br/>": "") + ("N/A" != e ? "End Date: " + e + "<br/>": ""), null, !0, m);
                    k.addPopup(this.popup, !0)
                },
                o = function(a, b) {
                    var d = a.getStore().getAt(b),
                    e = d.get("coordinates"),
                    e = (new OpenLayers.LonLat(e[1], e[0])).transform("EPSG:4326", k.projection);
                    j.clearMarkers();
                    var g = new OpenLayers.Marker(e);
                    g.events.register("mousedown", g,
                    function(a) {
                        n(d);
                        OpenLayers.Event.stop(a)
                    });
                    j.addMarker(g);
                    n(d);
                    return e
                };
                this.gazetteerGrid = new Ext.grid.GridPanel({
                    store: this.gazetteerDataStore,
                    width: 700,
                    columns: [{
                        header: "Place Name",
                        width: 200,
                        dataIndex: "placename",
                        sortable: !0
                    },
                    {
                        header: "Coordinates",
                        width: 100,
                        dataIndex: "coordinates",
                        sortable: !1,
                        renderer: function(a) {
                            return a.lat ? a.lat.toFixed(2) + ", " + a.lon.toFixed(2) : a[0].toFixed(2) + ", " + a[1].toFixed(2)
                        }
                    },
                    {
                        header: "Source",
                        width: 200,
                        dataIndex: "source",
                        sortable: !0
                    },
                    {
                        header: "Start Date",
                        width: 100,
                        dataIndex: "start_date",
                        sortable: !0
                    },
                    {
                        header: "End Date",
                        width: 100,
                        dataIndex: "end_date",
                        sortable: !0
                    }],
                    listeners: {
                        rowclick: function(a, b) {
                            o(a, b)
                        },
                        rowdblclick: function(a, b) {
                            var d = o(a, b);
                            k.setCenter(d)
                        }
                    }
                });
                this.gazetteerToolbar = new Ext.Toolbar({
                    items: [this.searchTB, this.searchBtn, this.advancedOptions]
                });
                this.gazetteerPanel = new Ext.Panel({
                    height: 300,
                    width: 700,
                    layout: "fit",
                    items: [this.gazetteerGrid],
                    tbar: this.gazetteerToolbar
                });
                var q = new Ext.Window({
                    title: this.title,
                    layout: "fit",
                    width: 700,
                    autoHeight: !0,
                    closeAction: "hide",
                    listeners: {
                        hide: function() {
                            k.removeLayer(j)
                        }
                    },
                    items: [this.gazetteerPanel]
                });
                return gxp.plugins.GazetteerTool.superclass.addActions.call(this, [{
                    tooltip: this.infoActionTip,
                    iconCls: this.iconCls,
                    id: this.id,
                    text: this.toolText,
                    handler: function() {
                        q.show();
                        k.addLayer(j)
                    }
                }])
            },
            performSearch: function() {
                this.gazetteerDataStore.proxy.conn.url = "/gazetteer/" + this.searchTB.getValue() + "/Service/" + this.services + (this.startDateField.getValue() && "" !== this.startDateField.getValue() ? "/StartDate/" + this.startDateField.getValue() : "") + (this.endDateField.getValue() && "" !== this.endDateField.getValue() ? "/EndDate/" + this.endDateField.getValue() : ""); ! 0 === this.firstLoad ? (this.gazetteerDataStore.load(), this.firstLoad = !1) : this.gazetteerDataStore.reload()
            }
        }); Ext.preg(gxp.plugins.GazetteerTool.prototype.ptype, gxp.plugins.GazetteerTool); Ext.namespace("gxp"); StreetViewPopup = OpenLayers.Class(OpenLayers.Control, {
            popup: null,
            mapPanel: null,
            titleHeader: "Street View",
            popupHeight: 300,
            popupWidth: 300,
            defaults: {
                pixelTolerance: 1,
                stopSingle: !0
            },
            initialize: function(a) {
                this.handlerOptions = OpenLayers.Util.extend({},
                this.defaults);
                OpenLayers.Control.prototype.initialize.apply(this, arguments);
                this.handler = new OpenLayers.Handler.Click(this, {
                    click: this.trigger
                },
                this.handlerOptions)
            },
            trigger: function(a) {
                this.openPopup(this.map.getLonLatFromViewPortPx(a.xy))
            },
            openPopup: function(a) {
                a || (a = this.mapPanel.map.getCenter());
                this.popup && this.popup.anc && this.popup.close();
                this.popup = new GeoExt.Popup({
                    title: this.titleHeader,
                    location: a,
                    width: this.popupWidth,
                    height: this.popupHeight,
                    collapsible: !0,
                    map: this.mapPanel,
                    items: [new gxp.GoogleStreetViewPanel]
                });
                this.popup.show()
            }
        }); gxp.plugins.StreetViewTool = Ext.extend(gxp.plugins.Tool, {
            ptype: "gxp_streetviewtool",
            toolText: "Street View",
            streetViewTitle: "Google Street View",
            infoActionTip: "Click on the map to see Google Street View",
            popupHeight: 300,
            popupWidth: 600,
            addActions: function() {
                var a = new StreetViewPopup({
                    mapPanel: this.target.mapPanel,
                    titleHeader: this.streetViewTitle,
                    popupHeight: this.popupHeight,
                    popupWidth: this.popupWidth
                });
                this.target.mapPanel.map.addControl(a);
                gxp.plugins.StreetViewTool.superclass.addActions.call(this, [{
                    tooltip: this.infoActionTip,
                    iconCls: this.iconCls,
                    text: this.toolText,
                    id: this.id,
                    pressed: !1,
                    toggleGroup: this.toggleGroup,
                    enableToggle: !0,
                    allowDepress: !0,
                    toggleHandler: function(b, d) {
                        d ? a.activate() : a.deactivate()
                    }
                }])
            }
        }); Ext.preg(gxp.plugins.StreetViewTool.prototype.ptype, gxp.plugins.StreetViewTool); Ext.namespace("gxp"); gxp.ClassificationPanel = Ext.extend(Ext.Panel, {
            hidden: !1,
            rulePanel: null,
            classifyText: "Classify",
            rampBlueText: "Blue",
            rampRedText: "Red",
            rampOrangeText: "Orange",
            rampJetText: "Blue-Red",
            rampGrayText: "Gray",
            rampRandomText: "Random",
            rampCustomText: "Custom",
            selectColorText: "Select colors",
            colorStartText: "Start Color",
            colorEndText: "End Color",
            methodUniqueText: "Unique Values",
            methodQuantileText: "Quantile",
            methodEqualText: "Equal Intervals",
            methodJenksText: "Jenks Natural Breaks",
            standardDeviationText: "Standard Deviations",
            attributeText: "Attribute",
            selectAttributeText: "Select attribute",
            startColor: "#FEE5D9",
            endColor: "#A50F15",
            generateRulesText: "Apply",
            reverseColorsText: "Reverse colors",
            initComponent: function() {
                var a;
                this.rulePanel.colorManager && (a = [new this.rulePanel.colorManager]);
                var b = new Ext.Panel({
                    hidden: !0,
                    layout: "form",
                    bodyStyle: {
                        padding: "10px"
                    },
                    border: !1,
                    labelWidth: 70,
                    defaults: {
                        labelWidth: 70
                    },
                    items: [{
                        xtype: "gxp_colorfield",
                        id: "choropleth_color_start",
                        name: "color_start",
                        fieldLabel: this.colorStartText,
                        emptyText: OpenLayers.Renderer.defaultSymbolizer.strokeColor,
                        value: this.startColor,
                        defaultBackground: this.startColor,
                        plugins: a,
                        listeners: {
                            valid: function(a) {
                                this.rulePanel.rule[a.name] = a.getValue()
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: "gxp_colorfield",
                        id: "choropleth_color_end",
                        name: "color_end",
                        fieldLabel: this.colorEndText,
                        emptyText: OpenLayers.Renderer.defaultSymbolizer.strokeColor,
                        value: this.endColor,
                        defaultBackground: this.endColor,
                        plugins: a,
                        listeners: {
                            valid: function(a) {
                                this.rulePanel.rule[a.name] = a.getValue()
                            },
                            scope: this
                        },
                        scope: this
                    }]
                }),
                d = new Ext.ux.form.SpinnerField({
                    fieldLabel: "Classes",
                    id: "choropleth_classes",
                    minValue: 2,
                    name: "intervals",
                    defaultValue: 5,
                    width: 110,
                    listeners: {
                        change: function(a, b) {
                            this.rulePanel.rule.intervals = b
                        },
                        scope: this
                    }
                });
                this.rulePanel.rule.intervals = d.defaultValue;
                a = new Ext.form.ComboBox({
                    id: "choropleth_colorramp",
                    name: "ramp",
                    fieldLabel: "Color Ramp",
                    store: new Ext.data.ArrayStore({
                        id: 0,
                        fields: ["colorramp", "label"],
                        data: [["Blue", this.rampBlueText], ["Red", this.rampRedText], ["Orange", this.rampOrangeText], ["Jet", this.rampJetText], ["Gray", this.rampGrayText], ["Random", this.rampRandomText], ["Custom", this.rampCustomText]]
                    }),
                    mode: "local",
                    width: 110,
                    displayField: "label",
                    valueField: "colorramp",
                    editable: !1,
                    emptyText: this.selectColorText,
                    triggerAction: "all",
                    disabled: !1,
                    listeners: {
                        select: function(a) {
                            b.setVisible("Custom" == a.value);
                            switch (a.value) {
                            case "Blue":
                                this.rulePanel.rule.color_start = "#f7fbff";
                                this.rulePanel.rule.color_end = "#08306b";
                                this.rulePanel.rule[a.name] = "Custom";
                                break;
                            case "Red":
                                this.rulePanel.rule.color_start = "#fff5f0";
                                this.rulePanel.rule.color_end = "#67000d";
                                this.rulePanel.rule[a.name] = "Custom";
                                break;
                            case "Orange":
                                this.rulePanel.rule.color_start = "#fff5eb";
                                this.rulePanel.rule.color_end = "#f16913";
                                this.rulePanel.rule[a.name] = "Custom";
                                break;
                            case "Jet":
                                this.rulePanel.rule[a.name] = "Jet";
                                break;
                            default:
                                this.rulePanel.rule.color_mid = "",
                                this.rulePanel.rule[a.name] = a.value
                            }
                        },
                        scope: this
                    }
                });
                var e = new Ext.form.ComboBox({
                    id: "choropleth_method",
                    name: "method",
                    fieldLabel: "Method",
                    store: new Ext.data.ArrayStore({
                        id: 0,
                        mode: "local",
                        autoDestroy: !0,
                        storeId: "method_array_store",
                        fields: ["value", "label"],
                        data: [["uniqueInterval", this.methodUniqueText], ["quantile", this.methodQuantileText], ["equalInterval", this.methodEqualText], ["jenks", this.methodJenksText]]
                    }),
                    displayField: "label",
                    valueField: "value",
                    mode: "local",
                    width: 110,
                    editable: !1,
                    emptyText: "Select method",
                    triggerAction: "all",
                    disabled: !1,
                    listeners: {
                        select: function(a) {
                            d.setDisabled("uniqueInterval" == a.value);
                            this.rulePanel.rule[a.name] = a.value
                        },
                        scope: this
                    }
                });
                this.items = [{
                    xtype: "fieldset",
                    title: this.classifyText,
                    labelWidth: 85,
                    style: "margin-bottom: 0;",
                    items: [new Ext.form.ComboBox({
                        id: "choropleth_attribute",
                        name: "attribute",
                        fieldLabel: this.attributeText,
                        store: this.rulePanel.attributes,
                        displayField: "name",
                        valueField: "name",
                        triggerAction: "all",
                        mode: "local",
                        width: 110,
                        editable: !1,
                        emptyText: this.selectAttributeText,
                        disabled: !1,
                        listeners: {
                            select: function(a, b, d) {
                                this.rulePanel.rule[a.name] = a.value;
                                e.clearValue();
                                for (var b = e.getStore(), m = 0; m < b.data.length; m++) b.getAt(m).disabled = "xsd:string" == a.getStore().getAt(d).get("type") ? "uniqueInterval" != b.getAt(m).get("value") : !1;
                                b.loadData("xsd:string" == a.getStore().getAt(d).get("type") ? [["uniqueInterval", this.methodUniqueText]] : [["uniqueInterval", this.methodUniqueText], ["quantile", this.methodQuantileText], ["equalInterval", this.methodEqualText], ["jenks", this.methodJenksText]])
                            },
                            scope: this
                        }
                    }), e, d, a, {
                        xtype: "checkbox",
                        name: "reverse",
                        checked: !1,
                        labelSeparator: "",
                        hideLabel: !0,
                        boxLabel: this.reverseColorsText,
                        handler: function(a) {
                            this.rulePanel.rule.reverse = a.checked
                        },
                        scope: this
                    },
                    b, {
                        xtype: "button",
                        name: "apply",
                        text: this.generateRulesText,
                        fieldLabel: "&nbsp;",
                        labelSeparator: "",
                        handler: function() {
                            this.rulePanel.fireEvent("change", this.rulePanel, this.rulePanel.rule)
                        },
                        scope: this
                    }]
                }];
                gxp.ClassificationPanel.superclass.initComponent.call(this)
            }
        }); Ext.reg("gxp_classificationpanel", gxp.ClassificationPanel); Ext.namespace("gxp.plugins"); gxp.plugins.StamenSource = Ext.extend(gxp.plugins.LayerSource, {
            ptype: "gxp_stamensource",
            title: "Stamen Design Layers",
            attribution: "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>.",
            tonerTitle: "Toner",
            tonerHybridTitle: "Toner Hybrid",
            tonerLabelsTitle: "Toner Labels",
            tonerLinesTitle: "Toner Lines",
            tonerBackgroundTitle: "Toner Background",
            tonerLiteTitle: "Toner Lite",
            terrainTitle: "Terrain",
            terrainLabelsTitle: "Terrain Labels",
            terrainLinesTitle: "Terrain Lines",
            terrainBackgroundTitle: "Terrain Background",
            watercolorTitle: "Watercolor",
            createStore: function() {
                for (var a = {
                    projection: "EPSG:900913",
                    numZoomLevels: 20,
                    attribution: this.attribution,
                    buffer: 0,
                    transitionEffect: "resize",
                    tileOptions: {
                        crossOriginKeyword: null
                    }
                },
                b = [{
                    name: "toner",
                    type: "png"
                },
                {
                    name: "toner-hybrid",
                    type: "png"
                },
                {
                    name: "toner-labels",
                    type: "png"
                },
                {
                    name: "toner-lines",
                    type: "png"
                },
                {
                    name: "toner-background",
                    type: "png"
                },
                {
                    name: "toner-lite",
                    type: "png"
                },
                {
                    name: "terrain",
                    type: "png",
                    numZoomLevels: 15,
                    maxResolution: 9783.939619140625
                },
                {
                    name: "terrain-labels",
                    type: "png",
                    numZoomLevels: 15,
                    maxResolution: 9783.939619140625
                },
                {
                    name: "terrain-lines",
                    type: "png",
                    numZoomLevels: 15,
                    maxResolution: 9783.939619140625
                },
                {
                    name: "terrain-background",
                    type: "png",
                    numZoomLevels: 15,
                    maxResolution: 9783.939619140625
                },
                {
                    name: "watercolor",
                    type: "jpg"
                }], d = b.length, e = Array(d), g, j = 0; j < d; ++j) g = b[j],
                e[j] = new OpenLayers.Layer.OSM(this[OpenLayers.String.camelize(g.name) + "Title"], [["http://tile.stamen.com/", g.name, "/${z}/${x}/${y}.", g.type].join(""), ["http://a.tile.stamen.com/", g.name, "/${z}/${x}/${y}.", g.type].join(""), ["http://b.tile.stamen.com/", g.name, "/${z}/${x}/${y}.", g.type].join(""), ["http://c.tile.stamen.com/", g.name, "/${z}/${x}/${y}.", g.type].join(""), ["http://d.tile.stamen.com/", g.name, "/${z}/${x}/${y}.", g.type].join("")], OpenLayers.Util.applyDefaults({
                    layername: g.name,
                    numZoomLevels: g.numZoomLevels,
                    maxResolution: g.maxResolution
                },
                a));
                this.store = new GeoExt.data.LayerStore({
                    layers: e,
                    fields: [{
                        name: "source",
                        type: "string"
                    },
                    {
                        name: "name",
                        type: "string",
                        mapping: "layername"
                    },
                    {
                        name: "abstract",
                        type: "string",
                        mapping: "attribution"
                    },
                    {
                        name: "group",
                        type: "string",
                        defaultValue: "background"
                    },
                    {
                        name: "fixed",
                        type: "boolean",
                        defaultValue: !0
                    },
                    {
                        name: "selected",
                        type: "boolean"
                    }]
                });
                this.store.each(function(a) { - 1 != a.get("name").search(/labels|lines/i) && a.set("group", "")
                });
                this.fireEvent("ready", this)
            },
            createLayerRecord: function(a) {
                var b, d = this.store.findExact("name", a.name);
                if ( - 1 < d) {
                    b = this.store.getAt(d).copy(Ext.data.Record.id({}));
                    d = b.getLayer().clone();
                    a.title && (d.setName(a.title), b.set("title", a.title));
                    if ("visibility" in a) d.visibility = a.visibility;
                    b.set("selected", a.selected || !1);
                    b.set("source", a.source);
                    b.set("name", a.name);
                    "group" in a && b.set("group", a.group);
                    b.data.layer = d;
                    b.commit()
                }
                return b
            }
        }); Ext.preg(gxp.plugins.StamenSource.prototype.ptype, gxp.plugins.StamenSource);