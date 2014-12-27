Ext.namespace("GeoExt.data");
GeoExt.data.WMSCapabilitiesReader = function(a, b) {
    a = a || {};
    if (!a.format) a.format = new OpenLayers.Format.WMSCapabilities;
    "function" !== typeof b && (b = GeoExt.data.LayerRecord.create(b || a.fields || [{
        name: "name",
        type: "string"
    },
    {
        name: "title",
        type: "string"
    },
    {
        name: "abstract",
        type: "string"
    },
    {
        name: "queryable",
        type: "boolean"
    },
    {
        name: "opaque",
        type: "boolean"
    },
    {
        name: "noSubsets",
        type: "boolean"
    },
    {
        name: "cascaded",
        type: "int"
    },
    {
        name: "fixedWidth",
        type: "int"
    },
    {
        name: "fixedHeight",
        type: "int"
    },
    {
        name: "minScale",
        type: "float"
    },
    {
        name: "maxScale",
        type: "float"
    },
    {
        name: "prefix",
        type: "string"
    },
    {
        name: "formats"
    },
    {
        name: "styles"
    },
    {
        name: "srs"
    },
    {
        name: "dimensions"
    },
    {
        name: "bbox"
    },
    {
        name: "llbbox"
    },
    {
        name: "attribution"
    },
    {
        name: "keywords"
    },
    {
        name: "identifiers"
    },
    {
        name: "authorityURLs"
    },
    {
        name: "metadataURLs"
    },
    {
        name: "infoFormats"
    }]));
    GeoExt.data.WMSCapabilitiesReader.superclass.constructor.call(this, a, b)
};
Ext.extend(GeoExt.data.WMSCapabilitiesReader, Ext.data.DataReader, {
    attributionCls: "gx-attribution",
    read: function(a) {
        var b = a.responseXML;
        if (!b || !b.documentElement) b = a.responseText;
        return this.readRecords(b)
    },
    serviceExceptionFormat: function(a) {
        return - 1 < OpenLayers.Util.indexOf(a, "application/vnd.ogc.se_inimage") ? "application/vnd.ogc.se_inimage": -1 < OpenLayers.Util.indexOf(a, "application/vnd.ogc.se_xml") ? "application/vnd.ogc.se_xml": a[0]
    },
    imageFormat: function(a) {
        var b = a.formats;
        return a.opaque && -1 < OpenLayers.Util.indexOf(b, "image/jpeg") ? "image/jpeg": -1 < OpenLayers.Util.indexOf(b, "image/png") ? "image/png": -1 < OpenLayers.Util.indexOf(b, "image/png; mode=24bit") ? "image/png; mode=24bit": -1 < OpenLayers.Util.indexOf(b, "image/gif") ? "image/gif": b[0]
    },
    imageTransparent: function(a) {
        return void 0 == a.opaque || !a.opaque
    },
    readRecords: function(a) {
        if ("string" === typeof a || a.nodeType) a = this.meta.format.read(a);
        if (a.error) throw new Ext.data.DataReader.Error("invalid-response", a.error);
        var b = a.version,
        c = a.capability || {},
        a = c.request && c.request.getmap && c.request.getmap.href,
        d = c.layers,
        c = this.serviceExceptionFormat(c.exception ? c.exception.formats: []),
        e = [];
        if (a && d) for (var f = this.recordType.prototype.fields,
        g, h, i, j, k = 0,
        l = d.length; k < l; k++) if (g = d[k], g.name) {
            h = {};
            for (var m = 0,
            n = f.length; m < n; m++) i = f.items[m],
            j = g[i.mapping || i.name] || i.defaultValue,
            j = i.convert(j),
            h[i.name] = j;
            i = {
                attribution: g.attribution ? this.attributionMarkup(g.attribution) : void 0,
                minScale: g.minScale,
                maxScale: g.maxScale
            };
            this.meta.layerOptions && Ext.apply(i, this.meta.layerOptions);
            j = {
                layers: g.name,
                exceptions: c,
                format: this.imageFormat(g),
                transparent: this.imageTransparent(g),
                version: b
            };
            this.meta.layerParams && Ext.apply(j, this.meta.layerParams);
            h.layer = new OpenLayers.Layer.WMS(g.title || g.name, a, j, i);
            e.push(new this.recordType(h, h.layer.id))
        }
        return {
            totalRecords: e.length,
            success: !0,
            records: e
        }
    },
    attributionMarkup: function(a) {
        var b = [];
        a.logo && b.push("<img class='" + this.attributionCls + "-image' src='" + a.logo.href + "' />");
        a.title && b.push("<span class='" + this.attributionCls + "-title'>" + a.title + "</span>");
        if (a.href) for (var c = 0; c < b.length; c++) b[c] = "<a class='" + this.attributionCls + "-link' href=" + a.href + ">" + b[c] + "</a>";
        return b.join(" ")
    }
});
Ext.namespace("GeoExt.data");
GeoExt.data.WMSCapabilitiesStore = function(a) {
    a = a || {};
    GeoExt.data.WMSCapabilitiesStore.superclass.constructor.call(this, Ext.apply(a, {
        proxy: a.proxy || (!a.data ? new Ext.data.HttpProxy({
            url: a.url,
            disableCaching: !1,
            method: "GET"
        }) : void 0),
        reader: new GeoExt.data.WMSCapabilitiesReader(a, a.fields)
    }))
};
Ext.extend(GeoExt.data.WMSCapabilitiesStore, Ext.data.Store);
Ext.namespace("GeoExt.data");
GeoExt.data.WMSDescribeLayerStore = function(a) {
    a = a || {};
    GeoExt.data.WMSDescribeLayerStore.superclass.constructor.call(this, Ext.apply(a, {
        proxy: a.proxy || (!a.data ? new Ext.data.HttpProxy({
            url: a.url,
            disableCaching: !1,
            method: "GET"
        }) : void 0),
        reader: new GeoExt.data.WMSDescribeLayerReader(a, a.fields)
    }))
};
Ext.extend(GeoExt.data.WMSDescribeLayerStore, Ext.data.Store);
Ext.namespace("GeoExt.data");
GeoExt.data.LayerRecord = Ext.data.Record.create([{
    name: "layer"
},
{
    name: "title",
    type: "string",
    mapping: "name"
}]);
GeoExt.data.LayerRecord.prototype.getLayer = function() {
    return this.get("layer")
};
GeoExt.data.LayerRecord.prototype.setLayer = function(a) {
    if (a !== this.data.layer) {
        this.dirty = !0;
        if (!this.modified) this.modified = {};
        if (void 0 === this.modified.layer) this.modified.layer = this.data.layer;
        this.data.layer = a;
        this.editing || this.afterEdit()
    }
};
GeoExt.data.LayerRecord.prototype.clone = function(a) {
    var b = this.getLayer() && this.getLayer().clone();
    return new this.constructor(Ext.applyIf({
        layer: b
    },
    this.data), a || b.id)
};
GeoExt.data.LayerRecord.create = function(a) {
    var b = Ext.extend(GeoExt.data.LayerRecord, {}),
    c = b.prototype;
    c.fields = new Ext.util.MixedCollection(!1,
    function(a) {
        return a.name
    });
    GeoExt.data.LayerRecord.prototype.fields.each(function(a) {
        c.fields.add(a)
    });
    if (a) for (var d = 0,
    e = a.length; d < e; d++) c.fields.add(new Ext.data.Field(a[d]));
    b.getField = function(a) {
        return c.fields.get(a)
    };
    return b
};
Ext.namespace("GeoExt.data");
GeoExt.data.FeatureStoreMixin = function() {
    return {
        layer: null,
        reader: null,
        featureFilter: null,
        constructor: function(a) {
            a = a || {};
            a.reader = a.reader || new GeoExt.data.FeatureReader({},
            a.fields);
            var b = a.layer;
            delete a.layer;
            if (a.features) a.data = a.features;
            delete a.features;
            var c = {
                initDir: a.initDir
            };
            delete a.initDir;
            arguments.callee.superclass.constructor.call(this, a);
            b && this.bind(b, c)
        },
        bind: function(a, b) {
            if (!this.layer) {
                this.layer = a;
                var b = b || {},
                c = b.initDir;
                void 0 == b.initDir && (c = GeoExt.data.FeatureStore.LAYER_TO_STORE | GeoExt.data.FeatureStore.STORE_TO_LAYER);
                var d = a.features.slice(0);
                if (c & GeoExt.data.FeatureStore.STORE_TO_LAYER) for (var e = this.getRange(), f = e.length - 1; 0 <= f; f--) this.layer.addFeatures([e[f].getFeature()]);
                c & GeoExt.data.FeatureStore.LAYER_TO_STORE && this.loadData(d, !0);
                a.events.on({
                    featuresadded: this.onFeaturesAdded,
                    featuresremoved: this.onFeaturesRemoved,
                    featuremodified: this.onFeatureModified,
                    scope: this
                });
                this.on({
                    load: this.onLoad,
                    clear: this.onClear,
                    add: this.onAdd,
                    remove: this.onRemove,
                    update: this.onUpdate,
                    scope: this
                })
            }
        },
        unbind: function() {
            if (this.layer) this.layer.events.un({
                featuresadded: this.onFeaturesAdded,
                featuresremoved: this.onFeaturesRemoved,
                featuremodified: this.onFeatureModified,
                scope: this
            }),
            this.un("load", this.onLoad, this),
            this.un("clear", this.onClear, this),
            this.un("add", this.onAdd, this),
            this.un("remove", this.onRemove, this),
            this.un("update", this.onUpdate, this),
            this.layer = null
        },
        getRecordFromFeature: function(a) {
            return this.getByFeature(a) || null
        },
        getByFeature: function(a) {
            var b;
            if (a.state !== OpenLayers.State.INSERT) b = this.getById(a.id);
            else {
                var c = this.findBy(function(b) {
                    return b.getFeature() === a
                }); - 1 < c && (b = this.getAt(c))
            }
            return b
        },
        onFeaturesAdded: function(a) {
            if (!this._adding) {
                var b = a = a.features;
                if (this.featureFilter) {
                    var b = [],
                    c,
                    d,
                    e;
                    c = 0;
                    for (d = a.length; c < d; c++) e = a[c],
                    !1 !== this.featureFilter.evaluate(e) && b.push(e)
                }
                this._adding = !0;
                this.loadData(b, !0);
                delete this._adding
            }
        },
        onFeaturesRemoved: function(a) {
            if (!this._removing) {
                var a = a.features,
                b, c;
                for (c = a.length - 1; 0 <= c; c--) if (b = a[c], b = this.getByFeature(b), void 0 !== b) this._removing = !0,
                this.remove(b),
                delete this._removing
            }
        },
        onFeatureModified: function(a) {
            if (!this._updating) {
                var a = a.feature,
                b = this.getByFeature(a);
                if (void 0 !== b) {
                    b.beginEdit();
                    var c = a.attributes;
                    if (c) for (var d = this.recordType.prototype.fields,
                    e = 0,
                    f = d.length; e < f; e++) {
                        var g = d.items[e],
                        h = g.mapping || g.name;
                        h in c && b.set(g.name, g.convert(c[h]))
                    }
                    b.set("state", a.state);
                    b.set("fid", a.fid);
                    b.setFeature(a);
                    this._updating = !0;
                    b.endEdit();
                    delete this._updating
                }
            }
        },
        addFeaturesToLayer: function(a) {
            var b, c, d;
            d = Array(c = a.length);
            for (b = 0; b < c; b++) d[b] = a[b].getFeature();
            if (0 < d.length) this._adding = !0,
            this.layer.addFeatures(d),
            delete this._adding
        },
        onLoad: function(a, b, c) {
            if (!c || !0 !== c.add) this._removing = !0,
            this.layer.removeFeatures(this.layer.features),
            delete this._removing,
            this.addFeaturesToLayer(b)
        },
        onClear: function() {
            this._removing = !0;
            this.layer.removeFeatures(this.layer.features);
            delete this._removing
        },
        onAdd: function(a, b) {
            this._adding || this.addFeaturesToLayer(b)
        },
        onRemove: function(a, b) {
            if (!this._removing && null != this.layer.getFeatureById(b.getFeature().id)) this._removing = !0,
            this.layer.removeFeatures([b.getFeature()]),
            delete this._removing
        },
        onUpdate: function(a, b) {
            if (!this._updating) {
                var c = (new GeoExt.data.FeatureRecord).fields,
                d = b.getFeature();
                if (d.state !== OpenLayers.State.INSERT) d.state = OpenLayers.State.UPDATE;
                if (b.fields && !1 !== this.layer.events.triggerEvent("beforefeaturemodified", {
                    feature: d
                })) {
                    var e = d.attributes;
                    b.fields.each(function(a) {
                        var d = a.mapping || a.name;
                        c.containsKey(d) || (e[d] = b.get(a.name))
                    });
                    this._updating = !0;
                    this.layer.events.triggerEvent("featuremodified", {
                        feature: d
                    });
                    delete this._updating;
                    null != this.layer.getFeatureById(d.id) && this.layer.drawFeature(d)
                }
            }
        },
        destroy: function() {
            this.unbind();
            GeoExt.data.FeatureStore.superclass.destroy.call(this)
        }
    }
};
GeoExt.data.FeatureStore = Ext.extend(Ext.data.Store, new GeoExt.data.FeatureStoreMixin);
GeoExt.data.FeatureStore.LAYER_TO_STORE = 1;
GeoExt.data.FeatureStore.STORE_TO_LAYER = 2;
Ext.namespace("GeoExt", "GeoExt.data");
GeoExt.data.FeatureReader = function(a, b) {
    a = a || {};
    b instanceof Function || (b = GeoExt.data.FeatureRecord.create(b || a.fields || {}));
    GeoExt.data.FeatureReader.superclass.constructor.call(this, a, b)
};
Ext.extend(GeoExt.data.FeatureReader, Ext.data.DataReader, {
    totalRecords: null,
    read: function(a) {
        return this.readRecords(a.features)
    },
    readRecords: function(a) {
        var b = [];
        if (a) {
            var c = this.recordType,
            d = c.prototype.fields,
            e, f, g, h, i, j, k, l;
            for (e = 0, f = a.length; e < f; e++) {
                i = a[e];
                j = {};
                if (i.attributes) for (g = 0, h = d.length; g < h; g++) {
                    k = d.items[g];
                    if (/[\[\.]/.test(k.mapping)) try {
                        l = (new Function("obj", "return obj." + k.mapping))(i.attributes)
                    } catch(m) {
                        l = k.defaultValue
                    } else l = i.attributes[k.mapping || k.name] || k.defaultValue;
                    k.convert && (l = k.convert(l, i));
                    j[k.name] = l
                }
                j.feature = i;
                j.state = i.state;
                j.fid = i.fid;
                b[b.length] = new c(j, i.state === OpenLayers.State.INSERT ? void 0 : i.id)
            }
        }
        return {
            records: b,
            totalRecords: null != this.totalRecords ? this.totalRecords: b.length
        }
    }
});
Ext.namespace("GeoExt.data");
GeoExt.data.FeatureRecord = Ext.data.Record.create([{
    name: "feature"
},
{
    name: "state"
},
{
    name: "fid"
}]);
GeoExt.data.FeatureRecord.prototype.getFeature = function() {
    return this.get("feature")
};
GeoExt.data.FeatureRecord.prototype.setFeature = function(a) {
    if (a !== this.data.feature) {
        this.dirty = !0;
        if (!this.modified) this.modified = {};
        if (void 0 === this.modified.feature) this.modified.feature = this.data.feature;
        this.data.feature = a;
        this.editing || this.afterEdit()
    }
};
GeoExt.data.FeatureRecord.create = function(a) {
    var b = Ext.extend(GeoExt.data.FeatureRecord, {}),
    c = b.prototype;
    c.fields = new Ext.util.MixedCollection(!1,
    function(a) {
        return a.name
    });
    GeoExt.data.FeatureRecord.prototype.fields.each(function(a) {
        c.fields.add(a)
    });
    if (a) for (var d = 0,
    e = a.length; d < e; d++) c.fields.add(new Ext.data.Field(a[d]));
    b.getField = function(a) {
        return c.fields.get(a)
    };
    return b
};
Ext.namespace("GeoExt.data");
GeoExt.data.WMSDescribeLayerReader = function(a, b) {
    a = a || {};
    if (!a.format) a.format = new OpenLayers.Format.WMSDescribeLayer;
    "function" !== typeof b && (b = Ext.data.Record.create(b || a.fields || [{
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
    }]));
    GeoExt.data.WMSDescribeLayerReader.superclass.constructor.call(this, a, b)
};
Ext.extend(GeoExt.data.WMSDescribeLayerReader, Ext.data.DataReader, {
    read: function(a) {
        var b = a.responseXML;
        if (!b || !b.documentElement) b = a.responseText;
        return this.readRecords(b)
    },
    readRecords: function(a) {
        if ("string" === typeof a || a.nodeType) a = this.meta.format.read(a);
        if (a.error) throw new Ext.data.DataReader.Error("invalid-response", a.error);
        for (var b = [], c, d = 0, e = a.length; d < e; d++)(c = a[d]) && b.push(new this.recordType(c));
        return {
            totalRecords: b.length,
            success: !0,
            records: b
        }
    }
});
Ext.namespace("GeoExt");
GeoExt.Lang = new(Ext.extend(Ext.util.Observable, {
    locale: navigator.language || navigator.userLanguage,
    dict: null,
    constructor: function() {
        this.addEvents("localize");
        this.dict = {};
        Ext.util.Observable.constructor.apply(this, arguments)
    },
    add: function(a, b) {
        var c = this.dict[a];
        if (c) for (var d in b) c[d] = Ext.apply(c[d] || {},
        b[d]);
        else this.dict[a] = Ext.apply({},
        b); ! a || a === this.locale ? this.set(a) : 0 === this.locale.indexOf(a + "-") && this.set(this.locale)
    },
    set: function(a) {
        for (var b = a ? a.split("-") : [], c = "", d = {},
        e, f = 0, g = b.length; f < g; ++f) if (c += (c && "-" || "") + b[f], c in this.dict) {
            e = this.dict[c];
            for (var h in e) h in d ? Ext.apply(d[h], e[h]) : d[h] = Ext.apply({},
            e[h])
        }
        for (h in d) {
            b = window;
            c = h.split(".");
            e = !1;
            f = 0;
            for (g = c.length; f < g; ++f) {
                var i = c[f];
                if (i in b) b = b[i];
                else {
                    e = !0;
                    break
                }
            }
            e || Ext.apply(b, d[h])
        }
        this.locale = a;
        this.fireEvent("localize", a)
    }
}));
Ext.namespace("GeoExt");
GeoExt.Action = Ext.extend(Ext.Action, {
    control: null,
    activateOnEnable: !1,
    deactivateOnDisable: !1,
    map: null,
    uScope: null,
    uHandler: null,
    uToggleHandler: null,
    uCheckHandler: null,
    constructor: function(a) {
        this.uScope = a.scope;
        this.uHandler = a.handler;
        this.uToggleHandler = a.toggleHandler;
        this.uCheckHandler = a.checkHandler;
        a.scope = this;
        a.handler = this.pHandler;
        a.toggleHandler = this.pToggleHandler;
        a.checkHandler = this.pCheckHandler;
        var b = this.control = a.control;
        delete a.control;
        this.activateOnEnable = !!a.activateOnEnable;
        delete a.activateOnEnable;
        this.deactivateOnDisable = !!a.deactivateOnDisable;
        delete a.deactivateOnDisable;
        if (b) {
            a.map && (a.map.addControl(b), delete a.map); (a.pressed || a.checked) && b.map && b.activate();
            if (b.active) a.pressed = !0,
            a.checked = !0;
            b.events.on({
                activate: this.onCtrlActivate,
                deactivate: this.onCtrlDeactivate,
                scope: this
            })
        }
        arguments.callee.superclass.constructor.call(this, a)
    },
    pHandler: function(a) {
        var b = this.control;
        b && b.type == OpenLayers.Control.TYPE_BUTTON && b.trigger();
        this.uHandler && this.uHandler.apply(this.uScope, arguments)
    },
    pToggleHandler: function(a, b) {
        this.changeControlState(b);
        this.uToggleHandler && this.uToggleHandler.apply(this.uScope, arguments)
    },
    pCheckHandler: function(a, b) {
        this.changeControlState(b);
        this.uCheckHandler && this.uCheckHandler.apply(this.uScope, arguments)
    },
    changeControlState: function(a) {
        if (a) {
            if (!this._activating) this._activating = !0,
            this.control.activate(),
            this.initialConfig.pressed = !0,
            this.initialConfig.checked = !0,
            this._activating = !1
        } else if (!this._deactivating) this._deactivating = !0,
        this.control.deactivate(),
        this.initialConfig.pressed = !1,
        this._deactivating = this.initialConfig.checked = !1
    },
    onCtrlActivate: function() {
        this.control.type == OpenLayers.Control.TYPE_BUTTON ? this.enable() : (this.safeCallEach("toggle", [!0]), this.safeCallEach("setChecked", [!0]))
    },
    onCtrlDeactivate: function() {
        this.control.type == OpenLayers.Control.TYPE_BUTTON ? this.disable() : (this.safeCallEach("toggle", [!1]), this.safeCallEach("setChecked", [!1]))
    },
    safeCallEach: function(a, b) {
        for (var c = this.items,
        d = 0,
        e = c.length; d < e; d++) c[d][a] && (c[d].rendered ? c[d][a].apply(c[d], b) : c[d].on({
            render: c[d][a].createDelegate(c[d], b),
            single: !0
        }))
    },
    setDisabled: function(a) { ! a && this.activateOnEnable && this.control && !this.control.active && this.control.activate();
        a && this.deactivateOnDisable && this.control && this.control.active && this.control.deactivate();
        return GeoExt.Action.superclass.setDisabled.apply(this, arguments)
    }
});
Ext.namespace("GeoExt");
GeoExt.LayerOpacitySlider = Ext.extend(Ext.slider.SingleSlider, {
    layer: null,
    complementaryLayer: null,
    delay: 5,
    changeVisibilityDelay: 5,
    aggressive: !1,
    changeVisibility: !1,
    value: null,
    inverse: !1,
    constructor: function(a) {
        if (a.layer) {
            this.layer = this.getLayer(a.layer);
            this.bind();
            this.complementaryLayer = this.getLayer(a.complementaryLayer);
            if (void 0 !== a.inverse) this.inverse = a.inverse;
            a.value = void 0 !== a.value ? a.value: this.getOpacityValue(this.layer);
            delete a.layer;
            delete a.complementaryLayer
        }
        GeoExt.LayerOpacitySlider.superclass.constructor.call(this, a)
    },
    bind: function() {
        if (this.layer && this.layer.map) this.layer.map.events.on({
            changelayer: this.update,
            scope: this
        })
    },
    unbind: function() {
        this.layer && this.layer.map && this.layer.map.events && this.layer.map.events.un({
            changelayer: this.update,
            scope: this
        })
    },
    update: function(a) {
        "opacity" === a.property && a.layer == this.layer && !this._settingOpacity && this.setValue(this.getOpacityValue(this.layer))
    },
    setLayer: function(a) {
        this.unbind();
        this.layer = this.getLayer(a);
        this.setValue(this.getOpacityValue(a));
        this.bind()
    },
    getOpacityValue: function(a) {
        a = a && null !== a.opacity ? parseInt(a.opacity * (this.maxValue - this.minValue)) : this.maxValue; ! 0 === this.inverse && (a = this.maxValue - this.minValue - a);
        return a
    },
    getLayer: function(a) {
        if (a instanceof OpenLayers.Layer) return a;
        if (a instanceof GeoExt.data.LayerRecord) return a.getLayer()
    },
    initComponent: function() {
        GeoExt.LayerOpacitySlider.superclass.initComponent.call(this);
        this.changeVisibility && this.layer && (0 == this.layer.opacity || !1 === this.inverse && this.value == this.minValue || !0 === this.inverse && this.value == this.maxValue) && this.layer.setVisibility(!1);
        this.complementaryLayer && (this.layer && 1 == this.layer.opacity || !1 === this.inverse && this.value == this.maxValue || !0 === this.inverse && this.value == this.minValue) && this.complementaryLayer.setVisibility(!1);
        if (!0 === this.aggressive) this.on("change", this.changeLayerOpacity, this, {
            buffer: this.delay
        });
        else this.on("changecomplete", this.changeLayerOpacity, this);
        if (!0 === this.changeVisibility) this.on("change", this.changeLayerVisibility, this, {
            buffer: this.changeVisibilityDelay
        });
        if (this.complementaryLayer) this.on("change", this.changeComplementaryLayerVisibility, this, {
            buffer: this.changeVisibilityDelay
        });
        this.on("beforedestroy", this.unbind, this)
    },
    changeLayerOpacity: function(a, b) {
        if (this.layer) b /= this.maxValue - this.minValue,
        !0 === this.inverse && (b = 1 - b),
        this._settingOpacity = !0,
        this.layer.setOpacity(b),
        delete this._settingOpacity
    },
    changeLayerVisibility: function(a, b) {
        var c = this.layer.getVisibility(); ! 1 === this.inverse && b == this.minValue || !0 === this.inverse && b == this.maxValue && !0 === c ? this.layer.setVisibility(!1) : (!1 === this.inverse && b > this.minValue || !0 === this.inverse && b < this.maxValue && !1 == c) && this.layer.setVisibility(!0)
    },
    changeComplementaryLayerVisibility: function(a, b) {
        var c = this.complementaryLayer.getVisibility(); ! 1 === this.inverse && b == this.maxValue || !0 === this.inverse && b == this.minValue && !0 === c ? this.complementaryLayer.setVisibility(!1) : (!1 === this.inverse && b < this.maxValue || !0 === this.inverse && b > this.minValue && !1 == c) && this.complementaryLayer.setVisibility(!0)
    },
    addToMapPanel: function(a) {
        this.on({
            render: function() {
                var b = this.getEl();
                b.setStyle({
                    position: "absolute",
                    zIndex: a.map.Z_INDEX_BASE.Control
                });
                b.on({
                    mousedown: this.stopMouseEvents,
                    click: this.stopMouseEvents
                })
            },
            scope: this
        })
    },
    removeFromMapPanel: function() {
        this.getEl().un({
            mousedown: this.stopMouseEvents,
            click: this.stopMouseEvents,
            scope: this
        });
        this.unbind()
    },
    stopMouseEvents: function(a) {
        a.stopEvent()
    }
});
Ext.reg("gx_opacityslider", GeoExt.LayerOpacitySlider);
Ext.namespace("GeoExt");
GeoExt.SliderTip = Ext.extend(Ext.slider.Tip, {
    hover: !0,
    minWidth: 10,
    offsets: [0, -10],
    dragging: !1,
    init: function(a) {
        GeoExt.SliderTip.superclass.init.apply(this, arguments);
        if (this.hover) a.on("render", this.registerThumbListeners, this);
        this.slider = a
    },
    registerThumbListeners: function() {
        for (var a, b, c = 0,
        d = this.slider.thumbs.length; c < d; ++c) a = this.slider.thumbs[c],
        b = a.tracker.el,
        function(a, b) {
            b.on({
                mouseover: function(b) {
                    this.onSlide(this.slider, b, a);
                    this.dragging = !1
                },
                mouseout: function() {
                    this.dragging || this.hide.apply(this, arguments)
                },
                scope: this
            })
        }.apply(this, [a, b])
    },
    onSlide: function(a, b, c) {
        this.dragging = !0;
        return GeoExt.SliderTip.superclass.onSlide.apply(this, arguments)
    }
});
Ext.namespace("GeoExt");
GeoExt.LayerOpacitySliderTip = Ext.extend(GeoExt.SliderTip, {
    template: "<div>{opacity}%</div>",
    compiledTemplate: null,
    init: function(a) {
        this.compiledTemplate = new Ext.Template(this.template);
        GeoExt.LayerOpacitySliderTip.superclass.init.call(this, a)
    },
    getText: function(a) {
        return this.compiledTemplate.apply({
            opacity: a.value
        })
    }
});
Ext.namespace("GeoExt");
GeoExt.MapPanel = Ext.extend(Ext.Panel, {
    map: null,
    layers: null,
    center: null,
    zoom: null,
    extent: null,
    prettyStateKeys: !1,
    stateEvents: "aftermapmove,afterlayervisibilitychange,afterlayeropacitychange,afterlayerorderchange,afterlayernamechange,afterlayeradd,afterlayerremove".split(","),
    initComponent: function() {
        if (! (this.map instanceof OpenLayers.Map)) this.map = new OpenLayers.Map(Ext.applyIf(this.map || {},
        {
            allOverlays: !0
        }));
        var a = this.layers;
        if (!a || a instanceof Array) this.layers = new GeoExt.data.LayerStore({
            layers: a,
            map: 0 < this.map.layers.length ? this.map: null
        });
        if ("string" == typeof this.center) this.center = OpenLayers.LonLat.fromString(this.center);
        else if (this.center instanceof Array) this.center = new OpenLayers.LonLat(this.center[0], this.center[1]);
        if ("string" == typeof this.extent) this.extent = OpenLayers.Bounds.fromString(this.extent);
        else if (this.extent instanceof Array) this.extent = OpenLayers.Bounds.fromArray(this.extent);
        GeoExt.MapPanel.superclass.initComponent.call(this);
        this.addEvents("aftermapmove", "afterlayervisibilitychange", "afterlayeropacitychange", "afterlayerorderchange", "afterlayernamechange", "afterlayeradd", "afterlayerremove");
        this.map.events.on({
            moveend: this.onMoveend,
            changelayer: this.onChangelayer,
            addlayer: this.onAddlayer,
            removelayer: this.onRemovelayer,
            scope: this
        });
        this.on("afterlayout",
        function() {
            "function" === typeof this.map.getViewport && this.items.each(function(a) {
                "function" === typeof a.addToMapPanel && a.getEl().appendTo(this.map.getViewport())
            },
            this)
        },
        this)
    },
    onMoveend: function() {
        this.fireEvent("aftermapmove")
    },
    onChangelayer: function(a) {
        a.property && ("visibility" === a.property ? this.fireEvent("afterlayervisibilitychange") : "order" === a.property ? this.fireEvent("afterlayerorderchange") : "name" === a.property ? this.fireEvent("afterlayernamechange") : "opacity" === a.property && this.fireEvent("afterlayeropacitychange"))
    },
    onAddlayer: function() {
        this.fireEvent("afterlayeradd")
    },
    onRemovelayer: function() {
        this.fireEvent("afterlayerremove")
    },
    applyState: function(a) {
        this.center = new OpenLayers.LonLat(a.x, a.y);
        this.zoom = a.zoom;
        var b, c, d, e, f, g = this.map.layers;
        for (b = 0, c = g.length; b < c; b++) d = g[b],
        e = this.prettyStateKeys ? d.name: d.id,
        f = a["visibility_" + e],
        void 0 !== f && (f = /^true$/i.test(f), d.isBaseLayer ? f && this.map.setBaseLayer(d) : d.setVisibility(f)),
        e = a["opacity_" + e],
        void 0 !== e && d.setOpacity(e)
    },
    getState: function() {
        var a;
        if (this.map) {
            a = (a = this.map.getCenter()) ? {
                x: a.lon,
                y: a.lat,
                zoom: this.map.getZoom()
            }: {};
            var b, c, d, e, f = this.map.layers;
            for (b = 0, c = f.length; b < c; b++) d = f[b],
            e = this.prettyStateKeys ? d.name: d.id,
            a["visibility_" + e] = d.getVisibility(),
            a["opacity_" + e] = null == d.opacity ? 1 : d.opacity;
            return a
        }
    },
    updateMapSize: function() {
        this.map && this.map.updateSize()
    },
    renderMap: function() {
        var a = this.map;
        a.render(this.body.dom);
        this.layers.bind(a);
        if (0 < a.layers.length) this.setInitialExtent();
        else this.layers.on("add", this.setInitialExtent, this, {
            single: !0
        })
    },
    setInitialExtent: function() {
        var a = this.map;
        this.center || null != this.zoom ? a.setCenter(this.center, this.zoom) : this.extent ? a.zoomToExtent(this.extent) : a.zoomToMaxExtent()
    },
    afterRender: function() {
        GeoExt.MapPanel.superclass.afterRender.apply(this, arguments);
        this.ownerCt ? (this.ownerCt.on("move", this.updateMapSize, this), this.ownerCt.on({
            afterlayout: this.afterLayout,
            scope: this
        })) : this.renderMap()
    },
    afterLayout: function() {
        var a = this.getInnerWidth() - this.body.getBorderWidth("lr"),
        b = this.getInnerHeight() - this.body.getBorderWidth("tb");
        0 < a && 0 < b && (this.ownerCt.un("afterlayout", this.afterLayout, this), this.renderMap())
    },
    onResize: function() {
        GeoExt.MapPanel.superclass.onResize.apply(this, arguments);
        this.updateMapSize()
    },
    onBeforeAdd: function(a) {
        "function" === typeof a.addToMapPanel && a.addToMapPanel(this);
        GeoExt.MapPanel.superclass.onBeforeAdd.apply(this, arguments)
    },
    remove: function(a, b) {
        "function" === typeof a.removeFromMapPanel && a.removeFromMapPanel(this);
        GeoExt.MapPanel.superclass.remove.apply(this, arguments)
    },
    beforeDestroy: function() {
        this.ownerCt && this.ownerCt.un("move", this.updateMapSize, this);
        this.map && this.map.events && this.map.events.un({
            moveend: this.onMoveend,
            changelayer: this.onChangelayer,
            addlayer: this.onAddlayer,
            removelayer: this.onRemovelayer,
            scope: this
        }); (!this.initialConfig.map || !(this.initialConfig.map instanceof OpenLayers.Map)) && this.map && this.map.destroy && this.map.destroy();
        delete this.map;
        GeoExt.MapPanel.superclass.beforeDestroy.apply(this, arguments)
    }
});
GeoExt.MapPanel.guess = function() {
    return Ext.ComponentMgr.all.find(function(a) {
        return a instanceof GeoExt.MapPanel
    })
};
Ext.reg("gx_mappanel", GeoExt.MapPanel);
Ext.namespace("GeoExt.data");
GeoExt.data.LayerStoreMixin = function() {
    return {
        map: null,
        reader: null,
        constructor: function(a) {
            a = a || {};
            a.reader = a.reader || new GeoExt.data.LayerReader({},
            a.fields);
            delete a.fields;
            var b = a.map instanceof GeoExt.MapPanel ? a.map.map: a.map;
            delete a.map;
            if (a.layers) a.data = a.layers;
            delete a.layers;
            var c = {
                initDir: a.initDir
            };
            delete a.initDir;
            arguments.callee.superclass.constructor.call(this, a);
            this.addEvents("bind");
            b && this.bind(b, c)
        },
        bind: function(a, b) {
            if (!this.map) {
                this.map = a;
                var b = b || {},
                c = b.initDir;
                void 0 == b.initDir && (c = GeoExt.data.LayerStore.MAP_TO_STORE | GeoExt.data.LayerStore.STORE_TO_MAP);
                var d = a.layers.slice(0);
                c & GeoExt.data.LayerStore.STORE_TO_MAP && this.each(function(a) {
                    this.map.addLayer(a.getLayer())
                },
                this);
                c & GeoExt.data.LayerStore.MAP_TO_STORE && this.loadData(d, !0);
                a.events.on({
                    changelayer: this.onChangeLayer,
                    addlayer: this.onAddLayer,
                    removelayer: this.onRemoveLayer,
                    scope: this
                });
                this.on({
                    load: this.onLoad,
                    clear: this.onClear,
                    add: this.onAdd,
                    remove: this.onRemove,
                    update: this.onUpdate,
                    scope: this
                });
                this.data.on({
                    replace: this.onReplace,
                    scope: this
                });
                this.fireEvent("bind", this, a)
            }
        },
        unbind: function() {
            if (this.map) this.map.events.un({
                changelayer: this.onChangeLayer,
                addlayer: this.onAddLayer,
                removelayer: this.onRemoveLayer,
                scope: this
            }),
            this.un("load", this.onLoad, this),
            this.un("clear", this.onClear, this),
            this.un("add", this.onAdd, this),
            this.un("remove", this.onRemove, this),
            this.data.un("replace", this.onReplace, this),
            this.map = null
        },
        onChangeLayer: function(a) {
            var b = a.layer,
            c = this.findBy(function(a) {
                return a.getLayer() === b
            });
            if ( - 1 < c) {
                var d = this.getAt(c);
                if ("order" === a.property) {
                    if (!this._adding && !this._removing && (a = this.map.getLayerIndex(b), a !== c)) this._removing = !0,
                    this.remove(d),
                    delete this._removing,
                    this._adding = !0,
                    this.insert(a, [d]),
                    delete this._adding
                } else "name" === a.property ? d.set("title", b.name) : this.fireEvent("update", this, d, Ext.data.Record.EDIT)
            }
        },
        onAddLayer: function(a) {
            if (!this._adding) a = a.layer,
            this._adding = !0,
            this.loadData([a], !0),
            delete this._adding
        },
        onRemoveLayer: function(a) {
            if (this.map.unloadDestroy) {
                if (!this._removing) a = a.layer,
                this._removing = !0,
                this.remove(this.getById(a.id)),
                delete this._removing
            } else this.unbind()
        },
        onLoad: function(a, b, c) {
            Ext.isArray(b) || (b = [b]);
            if (c && !c.add) {
                this._removing = !0;
                for (a = this.map.layers.length - 1; 0 <= a; a--) this.map.removeLayer(this.map.layers[a]);
                delete this._removing;
                a = b.length;
                if (0 < a) {
                    for (var c = Array(a), d = 0; d < a; d++) c[d] = b[d].getLayer();
                    this._adding = !0;
                    this.map.addLayers(c);
                    delete this._adding
                }
            }
        },
        onClear: function() {
            this._removing = !0;
            for (var a = this.map.layers.length - 1; 0 <= a; a--) this.map.removeLayer(this.map.layers[a]);
            delete this._removing
        },
        onAdd: function(a, b, c) {
            if (!this._adding) {
                this._adding = !0;
                for (var d = b.length - 1; 0 <= d; --d) a = b[d].getLayer(),
                this.map.addLayer(a),
                c !== this.map.layers.length - 1 && this.map.setLayerIndex(a, c);
                delete this._adding
            }
        },
        onRemove: function(a, b) {
            if (!this._removing && null != this.map.getLayer(b.getLayer().id)) this._removing = !0,
            this.removeMapLayer(b),
            delete this._removing
        },
        onUpdate: function(a, b, c) {
            c === Ext.data.Record.EDIT && b.modified && b.modified.title && (a = b.getLayer(), b = b.get("title"), b !== a.name && a.setName(b))
        },
        removeMapLayer: function(a) {
            this.map.removeLayer(a.getLayer())
        },
        onReplace: function(a, b) {
            this.removeMapLayer(b)
        },
        getByLayer: function(a) {
            var b = this.findBy(function(b) {
                return b.getLayer() === a
            });
            if ( - 1 < b) return this.getAt(b)
        },
        destroy: function() {
            this.unbind();
            GeoExt.data.LayerStore.superclass.destroy.call(this)
        }
    }
};
GeoExt.data.LayerStore = Ext.extend(Ext.data.Store, new GeoExt.data.LayerStoreMixin);
GeoExt.data.LayerStore.MAP_TO_STORE = 1;
GeoExt.data.LayerStore.STORE_TO_MAP = 2;
Ext.namespace("GeoExt", "GeoExt.data");
GeoExt.data.LayerReader = function(a, b) {
    a = a || {};
    b instanceof Function || (b = GeoExt.data.LayerRecord.create(b || a.fields || {}));
    GeoExt.data.LayerReader.superclass.constructor.call(this, a, b)
};
Ext.extend(GeoExt.data.LayerReader, Ext.data.DataReader, {
    totalRecords: null,
    readRecords: function(a) {
        var b = [];
        if (a) {
            var c = this.recordType,
            d = c.prototype.fields,
            e, f, g, h, i, j, k, l;
            for (e = 0, f = a.length; e < f; e++) {
                i = a[e];
                j = {};
                for (g = 0, h = d.length; g < h; g++) k = d.items[g],
                l = i[k.mapping || k.name] || k.defaultValue,
                l = k.convert(l),
                j[k.name] = l;
                j.layer = i;
                b[b.length] = new c(j, i.id)
            }
        }
        return {
            records: b,
            totalRecords: null != this.totalRecords ? this.totalRecords: b.length
        }
    }
});
Ext.namespace("GeoExt.data");
GeoExt.data.AttributeStoreMixin = function() {
    return {
        constructor: function(a) {
            a = a || {};
            arguments.callee.superclass.constructor.call(this, Ext.apply(a, {
                proxy: a.proxy || (!a.data ? new Ext.data.HttpProxy({
                    url: a.url,
                    disableCaching: !1,
                    method: "GET"
                }) : void 0),
                reader: new GeoExt.data.AttributeReader(a, a.fields || ["name", "type", "restriction", {
                    name: "nillable",
                    type: "boolean"
                }])
            }));
            this.feature && this.bind()
        },
        bind: function() {
            this.on({
                update: this.onUpdate,
                load: this.onLoad,
                add: this.onAdd,
                scope: this
            });
            var a = [];
            this.each(function(b) {
                a.push(b)
            });
            this.updateFeature(a)
        },
        onUpdate: function(a, b) {
            this.updateFeature([b])
        },
        onLoad: function(a, b, c) { (!c || !0 !== c.add) && this.updateFeature(b)
        },
        onAdd: function(a, b) {
            this.updateFeature(b)
        },
        updateFeature: function(a) {
            var b = this.feature,
            c = b.layer,
            d, e, f, g, h;
            for (d = 0, e = a.length; d < e; d++) f = a[d],
            g = f.get("name"),
            f = f.get("value"),
            g = b.attributes[g],
            g !== f && (h = !0);
            if (h && c && c.events && !1 !== c.events.triggerEvent("beforefeaturemodified", {
                feature: b
            })) {
                for (d = 0, e = a.length; d < e; d++) f = a[d],
                g = f.get("name"),
                f = f.get("value"),
                b.attributes[g] = f;
                c.events.triggerEvent("featuremodified", {
                    feature: b
                });
                c.drawFeature(b)
            }
        }
    }
};
GeoExt.data.AttributeStore = Ext.extend(Ext.data.Store, GeoExt.data.AttributeStoreMixin());
Ext.namespace("GeoExt.data");
GeoExt.data.AttributeReader = function(a, b) {
    a = a || {};
    if (!a.format) a.format = new OpenLayers.Format.WFSDescribeFeatureType;
    GeoExt.data.AttributeReader.superclass.constructor.call(this, a, b || a.fields);
    a.feature && this.recordType.prototype.fields.add(new Ext.data.Field("value"))
};
Ext.extend(GeoExt.data.AttributeReader, Ext.data.DataReader, {
    read: function(a) {
        var b = a.responseXML;
        if (!b || !b.documentElement) b = a.responseText;
        return this.readRecords(b)
    },
    readRecords: function(a) {
        for (var a = a instanceof Array ? a: this.meta.format.read(a).featureTypes[0].properties, b = this.meta.feature, c = this.recordType, d = c.prototype.fields, e = d.length, f, g, h, i, j, k = [], l = 0, m = a.length; l < m; ++l) {
            i = !1;
            f = a[l];
            g = {};
            for (var n = 0; n < e; ++n) {
                j = d.items[n];
                h = j.name;
                j = j.convert(f[h]);
                if (this.ignoreAttribute(h, j)) {
                    i = !0;
                    break
                }
                g[h] = j
            }
            if (b) j = b.attributes[g.name],
            void 0 !== j && (this.ignoreAttribute("value", j) ? i = !0 : g.value = j);
            i || (k[k.length] = new c(g))
        }
        return {
            success: !0,
            records: k,
            totalRecords: k.length
        }
    },
    ignoreAttribute: function(a, b) {
        var c = !1;
        if (this.meta.ignore && this.meta.ignore[a]) {
            var d = this.meta.ignore[a];
            "string" == typeof d ? c = d === b: d instanceof Array ? c = -1 < d.indexOf(b) : d instanceof RegExp && (c = d.test(b))
        }
        return c
    }
});
Ext.namespace("GeoExt.data");
GeoExt.data.PrintProvider = Ext.extend(Ext.util.Observable, {
    url: null,
    capabilities: null,
    method: "POST",
    encoding: document.charset || document.characterSet || "UTF-8",
    timeout: 3E4,
    customParams: null,
    scales: null,
    dpis: null,
    layouts: null,
    dpi: null,
    layout: null,
    constructor: function(a) {
        this.initialConfig = a;
        Ext.apply(this, a);
        if (!this.customParams) this.customParams = {};
        this.addEvents("loadcapabilities", "layoutchange", "dpichange", "beforeprint", "print", "printexception", "beforeencodelayer", "encodelayer", "beforedownload", "beforeencodelegend");
        GeoExt.data.PrintProvider.superclass.constructor.apply(this, arguments);
        this.scales = new Ext.data.JsonStore({
            root: "scales",
            sortInfo: {
                field: "value",
                direction: "DESC"
            },
            fields: ["name", {
                name: "value",
                type: "float"
            }]
        });
        this.dpis = new Ext.data.JsonStore({
            root: "dpis",
            fields: ["name", {
                name: "value",
                type: "float"
            }]
        });
        this.layouts = new Ext.data.JsonStore({
            root: "layouts",
            fields: ["name", {
                name: "size",
                mapping: "map"
            },
            {
                name: "rotation",
                type: "boolean"
            }]
        });
        a.capabilities ? this.loadStores() : (this.url.split("/").pop() && (this.url += "/"), this.initialConfig.autoLoad && this.loadCapabilities())
    },
    setLayout: function(a) {
        this.layout = a;
        this.fireEvent("layoutchange", this, a)
    },
    setDpi: function(a) {
        this.dpi = a;
        this.fireEvent("dpichange", this, a)
    },
    print: function(a, b, c) {
        if (a instanceof GeoExt.MapPanel) a = a.map;
        b = b instanceof Array ? b: [b];
        c = c || {};
        if (!1 !== this.fireEvent("beforeprint", this, a, b, c)) {
            var d = Ext.apply({
                units: a.getUnits(),
                srs: a.baseLayer.projection.getCode(),
                layout: this.layout.get("name"),
                dpi: this.dpi.get("value")
            },
            this.customParams),
            e = b[0].feature.layer,
            f = [],
            g = a.layers.concat();
            g.remove(a.baseLayer);
            g.unshift(a.baseLayer);
            Ext.each(g,
            function(a) {
                a !== e && !0 === a.getVisibility() && (a = this.encodeLayer(a)) && f.push(a)
            },
            this);
            d.layers = f;
            var h = [];
            Ext.each(b,
            function(a) {
                h.push(Ext.apply({
                    center: [a.center.lon, a.center.lat],
                    scale: a.scale.get("value"),
                    rotation: a.rotation
                },
                a.customParams))
            },
            this);
            d.pages = h;
            if (c.overview) {
                var i = [];
                Ext.each(c.overview.layers,
                function(a) { (a = this.encodeLayer(a)) && i.push(a)
                },
                this);
                d.overviewLayers = i
            }
            if (c.legend && !1 !== this.fireEvent("beforeencodelegend", this, d, c.legend)) {
                a = c.legend; (b = a.rendered) || (a = a.cloneConfig({
                    renderTo: document.body,
                    hidden: !0
                }));
                var j = [];
                a.items && a.items.each(function(a) {
                    if (!a.hidden) {
                        var b = this.encoders.legends[a.getXType()];
                        j = j.concat(b.call(this, a, d.pages[0].scale))
                    }
                },
                this);
                b || a.destroy();
                d.legends = j
            }
            "GET" === this.method ? this.download(Ext.urlAppend(this.capabilities.printURL, "spec=" + encodeURIComponent(Ext.encode(d)))) : Ext.Ajax.request({
                url: this.capabilities.createURL,
                timeout: this.timeout,
                jsonData: d,
                headers: {
                    "Content-Type": "application/json; charset=" + this.encoding
                },
                success: function(a) {
                    this.download(Ext.decode(a.responseText).getURL)
                },
                failure: function(a) {
                    this.fireEvent("printexception", this, a)
                },
                params: this.initialConfig.baseParams,
                scope: this
            })
        }
    },
    download: function(a) {
        if (!1 !== this.fireEvent("beforedownload", this, a)) Ext.isOpera ? window.open(a) : window.location.href = a;
        this.fireEvent("print", this, a)
    },
    loadCapabilities: function() {
        this.url && Ext.Ajax.request({
            url: this.url + "info.json",
            method: "GET",
            disableCaching: !1,
            success: function(a) {
                this.capabilities = Ext.decode(a.responseText);
                this.loadStores()
            },
            params: this.initialConfig.baseParams,
            scope: this
        })
    },
    loadStores: function() {
        this.scales.loadData(this.capabilities);
        this.dpis.loadData(this.capabilities);
        this.layouts.loadData(this.capabilities);
        this.setLayout(this.layouts.getAt(0));
        this.setDpi(this.dpis.getAt(0));
        this.fireEvent("loadcapabilities", this, this.capabilities)
    },
    encodeLayer: function(a) {
        var b, c;
        for (c in this.encoders.layers) if (OpenLayers.Layer[c] && a instanceof OpenLayers.Layer[c]) {
            if (!1 === this.fireEvent("beforeencodelayer", this, a)) return;
            b = this.encoders.layers[c].call(this, a);
            this.fireEvent("encodelayer", this, a, b);
            break
        }
        return b && b.type ? b: null
    },
    getAbsoluteUrl: function(a) {
        var b;
        Ext.isIE6 || Ext.isIE7 || Ext.isIE8 ? (b = document.createElement("<a href='" + a + "'/>"), b.style.display = "none", document.body.appendChild(b), b.href = b.href, document.body.removeChild(b)) : (b = document.createElement("a"), b.href = a);
        return b.href
    },
    encoders: {
        layers: {
            Layer: function(a) {
                var b = {};
                if (a.options && a.options.maxScale) b.minScaleDenominator = a.options.maxScale;
                if (a.options && a.options.minScale) b.maxScaleDenominator = a.options.minScale;
                return b
            },
            WMS: function(a) {
                var b = this.encoders.layers.HTTPRequest.call(this, a);
                Ext.apply(b, {
                    type: "WMS",
                    layers: ("" + a.params.LAYERS).split(","),
                    format: a.params.FORMAT,
                    styles: ("" + a.params.STYLES).split(",")
                });
                var c, d;
                for (d in a.params) if (c = d.toLowerCase(), !a.DEFAULT_PARAMS[c] && -1 == "layers,styles,width,height,srs".indexOf(c)) {
                    if (!b.customParams) b.customParams = {};
                    b.customParams[d] = a.params[d]
                }
                return b
            },
            OSM: function(a) {
                a = this.encoders.layers.TileCache.call(this, a);
                return Ext.apply(a, {
                    type: "OSM",
                    baseURL: a.baseURL.substr(0, a.baseURL.indexOf("$")),
                    extension: "png"
                })
            },
            TMS: function(a) {
                var b = this.encoders.layers.TileCache.call(this, a);
                return Ext.apply(b, {
                    type: "TMS",
                    format: a.type
                })
            },
            TileCache: function(a) {
                var b = this.encoders.layers.HTTPRequest.call(this, a);
                return Ext.apply(b, {
                    type: "TileCache",
                    layer: a.layername,
                    maxExtent: a.maxExtent.toArray(),
                    tileSize: [a.tileSize.w, a.tileSize.h],
                    extension: a.extension,
                    resolutions: a.serverResolutions || a.resolutions
                })
            },
            WMTS: function(a) {
                var b = this.encoders.layers.HTTPRequest.call(this, a);
                return Ext.apply(b, {
                    type: "WMTS",
                    layer: a.layer,
                    version: a.version,
                    requestEncoding: a.requestEncoding,
                    tileOrigin: [a.tileOrigin.lon, a.tileOrigin.lat],
                    tileSize: [a.tileSize.w, a.tileSize.h],
                    style: a.style,
                    formatSuffix: a.formatSuffix,
                    dimensions: a.dimensions,
                    params: a.params,
                    maxExtent: null != a.tileFullExtent ? a.tileFullExtent.toArray() : a.maxExtent.toArray(),
                    matrixSet: a.matrixSet,
                    zoomOffset: a.zoomOffset,
                    resolutions: a.serverResolutions || a.resolutions
                })
            },
            KaMapCache: function(a) {
                var b = this.encoders.layers.KaMap.call(this, a);
                return Ext.apply(b, {
                    type: "KaMapCache",
                    group: a.params.g,
                    metaTileWidth: a.params.metaTileSize.w,
                    metaTileHeight: a.params.metaTileSize.h
                })
            },
            KaMap: function(a) {
                var b = this.encoders.layers.HTTPRequest.call(this, a);
                return Ext.apply(b, {
                    type: "KaMap",
                    map: a.params.map,
                    extension: a.params.i,
                    group: a.params.g || "",
                    maxExtent: a.maxExtent.toArray(),
                    tileSize: [a.tileSize.w, a.tileSize.h],
                    resolutions: a.serverResolutions || a.resolutions
                })
            },
            HTTPRequest: function(a) {
                var b = this.encoders.layers.Layer.call(this, a);
                return Ext.apply(b, {
                    baseURL: this.getAbsoluteUrl(a.url instanceof Array ? a.url[0] : a.url),
                    opacity: null != a.opacity ? a.opacity: 1,
                    singleTile: a.singleTile
                })
            },
            Image: function(a) {
                var b = this.encoders.layers.Layer.call(this, a);
                return Ext.apply(b, {
                    type: "Image",
                    baseURL: this.getAbsoluteUrl(a.getURL(a.extent)),
                    opacity: null != a.opacity ? a.opacity: 1,
                    extent: a.extent.toArray(),
                    pixelSize: [a.size.w, a.size.h],
                    name: a.name
                })
            },
            Vector: function(a) {
                if (a.features.length) {
                    for (var b = [], c = {},
                    d = a.features, e = new OpenLayers.Format.GeoJSON, f = new OpenLayers.Format.JSON, g = 1, h = {},
                    i, j, k, l, m = 0, n = d.length; m < n; ++m) i = d[m],
                    j = i.style || a.style || a.styleMap.createSymbolizer(i, i.renderIntent),
                    k = f.write(j),
                    (l = h[k]) ? k = l: (h[k] = k = g++, c[k] = j.externalGraphic ? Ext.applyIf({
                        externalGraphic: this.getAbsoluteUrl(j.externalGraphic)
                    },
                    j) : j),
                    i = e.extract.feature.call(e, i),
                    i.properties = OpenLayers.Util.extend({
                        _gx_style: k
                    },
                    i.properties),
                    b.push(i);
                    d = this.encoders.layers.Layer.call(this, a);
                    return Ext.apply(d, {
                        type: "Vector",
                        styles: c,
                        styleProperty: "_gx_style",
                        geoJson: {
                            type: "FeatureCollection",
                            features: b
                        },
                        name: a.name,
                        opacity: null != a.opacity ? a.opacity: 1
                    })
                }
            },
            Markers: function(a) {
                for (var b = [], c = 0, d = a.markers.length; c < d; c++) {
                    var e = a.markers[c],
                    f = new OpenLayers.Geometry.Point(e.lonlat.lon, e.lonlat.lat),
                    e = new OpenLayers.Feature.Vector(f, {},
                    {
                        externalGraphic: e.icon.url,
                        graphicWidth: e.icon.size.w,
                        graphicHeight: e.icon.size.h,
                        graphicXOffset: e.icon.offset.x,
                        graphicYOffset: e.icon.offset.y
                    });
                    b.push(e)
                }
                a = new OpenLayers.Layer.Vector(a.name);
                a.addFeatures(b);
                b = this.encoders.layers.Vector.call(this, a);
                a.destroy();
                return b
            }
        },
        legends: {
            gx_wmslegend: function(a, b) {
                for (var c = this.encoders.legends.base.call(this, a), d = [], e = 1, f = a.items.getCount(); e < f; ++e) {
                    var g = a.items.get(e).url;
                    if (!0 === a.useScaleParameter && -1 != g.toLowerCase().indexOf("request=getlegendgraphic")) {
                        var g = g.split("?"),
                        h = Ext.urlDecode(g[1]);
                        h.SCALE = b;
                        g = g[0] + "?" + Ext.urlEncode(h)
                    }
                    d.push(this.getAbsoluteUrl(g))
                }
                c[0].classes[0] = {
                    name: "",
                    icons: d
                };
                return c
            },
            gx_urllegend: function(a) {
                var b = this.encoders.legends.base.call(this, a);
                b[0].classes.push({
                    name: "",
                    icon: this.getAbsoluteUrl(a.items.get(1).url)
                });
                return b
            },
            base: function(a) {
                return [{
                    name: a.getLabel(),
                    classes: []
                }]
            }
        }
    }
});
Ext.namespace("GeoExt", "GeoExt.data");
GeoExt.data.ProtocolProxy = function(a) {
    Ext.apply(this, a);
    GeoExt.data.ProtocolProxy.superclass.constructor.apply(this, arguments)
};
Ext.extend(GeoExt.data.ProtocolProxy, Ext.data.DataProxy, {
    protocol: null,
    abortPrevious: !0,
    setParamsAsOptions: !1,
    response: null,
    load: function(a, b, c, d, e) { ! 1 !== this.fireEvent("beforeload", this, a) ? (b = OpenLayers.Function.bind(this.loadResponse, this, {
            params: a || {},
            request: {
                callback: c,
                scope: d,
                arg: e
            },
            reader: b
        }), this.abortPrevious && this.abortRequest(), a = {
            params: a,
            callback: b,
            scope: this
        },
        Ext.applyIf(a, e), !0 === this.setParamsAsOptions && (Ext.applyIf(a, a.params), delete a.params), this.response = this.protocol.read(a)) : c.call(d || this, null, e, !1)
    },
    abortRequest: function() {
        if (this.response) this.protocol.abort(this.response),
        this.response = null
    },
    loadResponse: function(a, b) {
        if (b.success()) {
            var c = a.reader.read(b);
            this.fireEvent("load", this, a, a.request.arg);
            a.request.callback.call(a.request.scope, c, a.request.arg, !0)
        } else this.fireEvent("loadexception", this, a, b),
        a.request.callback.call(a.request.scope, null, a.request.arg, !1)
    }
});
Ext.namespace("GeoExt.data");
GeoExt.data.CSWRecordsReader = function(a, b) {
    a = a || {};
    if (!a.format) a.format = new OpenLayers.Format.CSWGetRecords;
    if (!a.root) a.root = "records";
    GeoExt.data.CSWRecordsReader.superclass.constructor.call(this, a, b)
};
Ext.extend(GeoExt.data.CSWRecordsReader, Ext.data.JsonReader, {
    read: function(a) {
        var b = a.data;
        if (!b && (b = a.responseXML, !b || !b.documentElement)) b = a.responseText;
        return this.readRecords(b)
    },
    readRecords: function(a) {
        if ("string" === typeof a || a.nodeType) a = this.meta.format.read(a);
        var b = GeoExt.data.CSWRecordsReader.superclass.readRecords.call(this, a);
        Ext.each(b.records,
        function(a) {
            for (var b in a.data) {
                var e = a.data[b];
                if (e instanceof Array) for (var f = 0,
                g = e.length; f < g; ++f) if (e[f] instanceof Object) e[f] = e[f].value
            }
        });
        if (a.SearchResults) b.totalRecords = a.SearchResults.numberOfRecordsMatched;
        return b
    }
});
Ext.namespace("GeoExt.plugins");
GeoExt.plugins.PrintProviderField = Ext.extend(Ext.util.Observable, {
    target: null,
    constructor: function(a) {
        this.initialConfig = a;
        Ext.apply(this, a);
        GeoExt.plugins.PrintProviderField.superclass.constructor.apply(this, arguments)
    },
    init: function(a) {
        this.target = a;
        var b = {
            scope: this,
            render: this.onRender,
            beforedestroy: this.onBeforeDestroy
        };
        b[a instanceof Ext.form.ComboBox ? "select": "valid"] = this.onFieldChange;
        a.on(b)
    },
    onRender: function(a) {
        var b = this.printProvider || a.ownerCt.printProvider;
        a.store === b.layouts ? (a.setValue(b.layout.get(a.displayField)), b.on({
            layoutchange: this.onProviderChange,
            scope: this
        })) : a.store === b.dpis ? (a.setValue(b.dpi.get(a.displayField)), b.on({
            dpichange: this.onProviderChange,
            scope: this
        })) : void 0 === a.initialConfig.value && a.setValue(b.customParams[a.name])
    },
    onFieldChange: function(a, b) {
        var c = this.printProvider || a.ownerCt.printProvider,
        d = a.getValue();
        this._updating = !0;
        if (b) switch (a.store) {
        case c.layouts:
            c.setLayout(b);
            break;
        case c.dpis:
            c.setDpi(b)
        } else c.customParams[a.name] = d;
        delete this._updating
    },
    onProviderChange: function(a, b) {
        this._updating || this.target.setValue(b.get(this.target.displayField))
    },
    onBeforeDestroy: function() {
        var a = this.target;
        a.un("beforedestroy", this.onBeforeDestroy, this);
        a.un("render", this.onRender, this);
        a.un("select", this.onFieldChange, this);
        a.un("valid", this.onFieldChange, this);
        a = this.printProvider || a.ownerCt.printProvider;
        a.un("layoutchange", this.onProviderChange, this);
        a.un("dpichange", this.onProviderChange, this)
    }
});
Ext.preg("gx_printproviderfield", GeoExt.plugins.PrintProviderField);
Ext.namespace("GeoExt.plugins");
GeoExt.plugins.PrintPageField = Ext.extend(Ext.util.Observable, {
    printPage: null,
    target: null,
    constructor: function(a) {
        this.initialConfig = a;
        Ext.apply(this, a);
        GeoExt.plugins.PrintPageField.superclass.constructor.apply(this, arguments)
    },
    init: function(a) {
        this.target = a;
        var b = {
            beforedestroy: this.onBeforeDestroy,
            scope: this
        };
        b[a instanceof Ext.form.ComboBox ? "select": a instanceof Ext.form.Checkbox ? "check": "valid"] = this.onFieldChange;
        a.on(b);
        this.printPage.on({
            change: this.onPageChange,
            scope: this
        });
        this.printPage.printProvider.on({
            layoutchange: this.onLayoutChange,
            scope: this
        });
        this.setValue(this.printPage)
    },
    onFieldChange: function(a, b) {
        var c = this.printPage.printProvider,
        d = a.getValue();
        this._updating = !0;
        a.store === c.scales || "scale" === a.name ? this.printPage.setScale(b) : "rotation" == a.name ? !isNaN(d) && this.printPage.setRotation(d) : this.printPage.customParams[a.name] = d;
        delete this._updating
    },
    onPageChange: function(a) {
        this._updating || this.setValue(a)
    },
    onLayoutChange: function(a, b) {
        var c = this.target;
        "rotation" == c.name && c.setDisabled(!b.get("rotation"))
    },
    setValue: function(a) {
        var b = this.target;
        b.suspendEvents();
        b.store === a.printProvider.scales || "scale" === b.name ? a.scale && b.setValue(a.scale.get(b.displayField)) : "rotation" == b.name && b.setValue(a.rotation);
        b.resumeEvents()
    },
    onBeforeDestroy: function() {
        this.target.un("beforedestroy", this.onBeforeDestroy, this);
        this.target.un("select", this.onFieldChange, this);
        this.target.un("valid", this.onFieldChange, this);
        this.printPage.un("change", this.onPageChange, this);
        this.printPage.printProvider.un("layoutchange", this.onLayoutChange, this)
    }
});
Ext.preg("gx_printpagefield", GeoExt.plugins.PrintPageField);
Ext.namespace("GeoExt.plugins");
GeoExt.plugins.TreeNodeComponent = Ext.extend(Ext.util.Observable, {
    constructor: function(a) {
        Ext.apply(this.initialConfig, Ext.apply({},
        a));
        Ext.apply(this, a);
        GeoExt.plugins.TreeNodeComponent.superclass.constructor.apply(this, arguments)
    },
    init: function(a) {
        a.on({
            rendernode: this.onRenderNode,
            beforedestroy: this.onBeforeDestroy,
            scope: this
        })
    },
    onRenderNode: function(a) {
        var b = a.attributes.component || this.component;
        if (!a.rendered && b) {
            var c = Ext.DomHelper.append(a.ui.elNode, [{
                tag: "div"
            }]);
            "function" == typeof b ? b = b(a, c) : "object" == typeof b && "function" == typeof b.fn && (b = b.fn.apply(b.scope, [a, c]));
            "object" == typeof b && "string" == typeof b.xtype && (b = Ext.ComponentMgr.create(b));
            if (b instanceof Ext.Component) b.render(c),
            a.component = b
        }
    },
    onBeforeDestroy: function(a) {
        a.un("rendernode", this.onRenderNode, this);
        a.un("beforedestroy", this.onBeforeDestroy, this)
    }
});
Ext.preg("gx_treenodecomponent", GeoExt.plugins.TreeNodeComponent);
Ext.namespace("GeoExt");
GeoExt.PrintMapPanel = Ext.extend(GeoExt.MapPanel, {
    sourceMap: null,
    printProvider: null,
    printPage: null,
    previewScales: null,
    center: null,
    zoom: null,
    extent: null,
    currentZoom: null,
    initComponent: function() {
        if (this.sourceMap instanceof GeoExt.MapPanel) this.sourceMap = this.sourceMap.map;
        if (!this.map) this.map = {};
        Ext.applyIf(this.map, {
            projection: this.sourceMap.getProjection(),
            maxExtent: this.sourceMap.getMaxExtent(),
            maxResolution: this.sourceMap.getMaxResolution(),
            units: this.sourceMap.getUnits()
        });
        if (! (this.printProvider instanceof GeoExt.data.PrintProvider)) this.printProvider = new GeoExt.data.PrintProvider(this.printProvider);
        this.printPage = new GeoExt.data.PrintPage({
            printProvider: this.printProvider
        });
        this.previewScales = new Ext.data.Store;
        this.previewScales.add(this.printProvider.scales.getRange());
        this.layers = [];
        Ext.each(this.sourceMap.layers,
        function(a) {
            if (!0 === a.getVisibility()) if (a instanceof OpenLayers.Layer.Vector) {
                for (var b = a.features,
                c = Array(b.length), a = new OpenLayers.Layer.Vector(a.name), d = 0, e = b.length; d < e; ++d) c[d] = b[d].clone();
                a.addFeatures(c, {
                    silent: !0
                });
                this.layers.push(a)
            } else this.layers.push(a.clone())
        },
        this);
        this.extent = this.sourceMap.getExtent();
        GeoExt.PrintMapPanel.superclass.initComponent.call(this)
    },
    bind: function() {
        this.printPage.on("change", this.fitZoom, this);
        this.printProvider.on("layoutchange", this.syncSize, this);
        this.map.events.register("moveend", this, this.updatePage);
        this.printPage.fit(this.sourceMap); ! 0 === this.initialConfig.limitScales && (this.on("resize", this.calculatePreviewScales, this), this.calculatePreviewScales())
    },
    afterRender: function() {
        GeoExt.PrintMapPanel.superclass.afterRender.apply(this, arguments);
        this.syncSize();
        if (this.ownerCt) this.ownerCt.on({
            afterlayout: {
                fn: this.bind,
                scope: this,
                single: !0
            }
        });
        else this.bind()
    },
    adjustSize: function(a, b) {
        var c = this.printProvider.layout.get("size"),
        c = c.width / c.height,
        d = this.ownerCt,
        e = d && d.autoWidth ? 0 : a || this.initialConfig.width,
        d = d && d.autoHeight ? 0 : b || this.initialConfig.height;
        e ? (b = e / c, d && b > d ? (b = d, a = b * c) : a = e) : d && (a = d * c, b = d);
        return {
            width: a,
            height: b
        }
    },
    fitZoom: function() {
        if (!this._updating && this.printPage.scale) {
            this._updating = !0;
            var a = this.printPage.getPrintExtent(this.map);
            this.currentZoom = this.map.getZoomForExtent(a);
            this.map.zoomToExtent(a);
            delete this._updating
        }
    },
    updatePage: function() {
        if (!this._updating) {
            var a = this.map.getZoom();
            this._updating = !0;
            a === this.currentZoom ? this.printPage.setCenter(this.map.getCenter()) : this.printPage.fit(this.map);
            delete this._updating;
            this.currentZoom = a
        }
    },
    calculatePreviewScales: function() {
        this.previewScales.removeAll();
        this.printPage.suspendEvents();
        var a = this.printPage.scale,
        b = this.map.getSize(),
        c = {},
        d = [];
        this.printProvider.scales.each(function(a) {
            this.printPage.setScale(a);
            var e = this.printPage.getPrintExtent(this.map),
            f = this.map.getZoomForExtent(e),
            e = Math.max(e.getWidth() / b.w, e.getHeight() / b.h),
            j = this.map.getResolutionForZoom(f),
            e = Math.abs(e - j);
            if (! (f in c) || c[f].diff > e) c[f] = {
                rec: a,
                diff: e
            },
            -1 == d.indexOf(f) && d.push(f)
        },
        this);
        for (var e = 0,
        f = d.length; e < f; ++e) this.previewScales.add(c[d[e]].rec);
        a && this.printPage.setScale(a);
        this.printPage.resumeEvents();
        a && 0 < this.previewScales.getCount() && (e = this.previewScales.getAt(0), f = this.previewScales.getAt(this.previewScales.getCount() - 1), a.get("value") < f.get("value") ? this.printPage.setScale(f) : a.get("value") > e.get("value") && this.printPage.setScale(e));
        this.fitZoom()
    },
    print: function(a) {
        this.printProvider.print(this.map, [this.printPage], a)
    },
    beforeDestroy: function() {
        this.map.events.unregister("moveend", this, this.updatePage);
        this.printPage.un("change", this.fitZoom, this);
        this.printProvider.un("layoutchange", this.syncSize, this);
        GeoExt.PrintMapPanel.superclass.beforeDestroy.apply(this, arguments)
    }
});
Ext.reg("gx_printmappanel", GeoExt.PrintMapPanel);
Ext.namespace("GeoExt.data");
GeoExt.data.PrintPage = Ext.extend(Ext.util.Observable, {
    printProvider: null,
    feature: null,
    center: null,
    scale: null,
    rotation: 0,
    customParams: null,
    constructor: function(a) {
        this.initialConfig = a;
        Ext.apply(this, a);
        if (!this.customParams) this.customParams = {};
        this.addEvents("change");
        GeoExt.data.PrintPage.superclass.constructor.apply(this, arguments);
        this.feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point( - 1, -1), new OpenLayers.Geometry.Point(1, -1), new OpenLayers.Geometry.Point(1, 1), new OpenLayers.Geometry.Point( - 1, 1)])]));
        if (this.printProvider.capabilities) this.setScale(this.printProvider.scales.getAt(0));
        else this.printProvider.on({
            loadcapabilities: function() {
                this.setScale(this.printProvider.scales.getAt(0))
            },
            scope: this,
            single: !0
        });
        this.printProvider.on({
            layoutchange: this.onLayoutChange,
            scope: this
        })
    },
    getPrintExtent: function(a) {
        a = a instanceof GeoExt.MapPanel ? a.map: a;
        return this.calculatePageBounds(this.scale, a.getUnits())
    },
    setScale: function(a, b) {
        var c = this.calculatePageBounds(a, b).toGeometry(),
        d = this.rotation;
        0 != d && c.rotate( - d, c.getCentroid());
        this.updateFeature(c, {
            scale: a
        })
    },
    setCenter: function(a) {
        var b = this.feature.geometry,
        c = b.getBounds().getCenterLonLat();
        b.move(a.lon - c.lon, a.lat - c.lat);
        this.updateFeature(b, {
            center: a
        })
    },
    setRotation: function(a, b) {
        if (b || !0 === this.printProvider.layout.get("rotation")) {
            var c = this.feature.geometry;
            c.rotate(this.rotation - a, c.getCentroid());
            this.updateFeature(c, {
                rotation: a
            })
        }
    },
    fit: function(a, b) {
        var b = b || {},
        c = a,
        d;
        if (a instanceof GeoExt.MapPanel) c = a.map;
        else if (a instanceof OpenLayers.Feature.Vector) c = a.layer.map,
        d = a.geometry.getBounds();
        if (!d && (d = c.getExtent(), !d)) return;
        this._updating = !0;
        var e = d.getCenterLonLat();
        this.setCenter(e);
        var f = c.getUnits(),
        g = this.printProvider.scales.getAt(0),
        h = Number.POSITIVE_INFINITY,
        i = d.getWidth(),
        j = d.getHeight();
        this.printProvider.scales.each(function(a) {
            var c = this.calculatePageBounds(a, f);
            if ("closest" == b.mode) c = Math.abs(c.getWidth() - i) + Math.abs(c.getHeight() - j),
            c < h && (h = c, g = a);
            else {
                if ((c = "screen" == b.mode ? !d.containsBounds(c) : c.containsBounds(d)) || "screen" == b.mode && !c) g = a;
                return c
            }
        },
        this);
        this.setScale(g, f);
        delete this._updating;
        this.updateFeature(this.feature.geometry, {
            center: e,
            scale: g
        })
    },
    updateFeature: function(a, b) {
        var c = this.feature,
        d = c.geometry !== a;
        a.id = c.geometry.id;
        c.geometry = a;
        if (!this._updating) {
            for (var e in b) b[e] === this[e] ? delete b[e] : (this[e] = b[e], d = !0);
            Ext.apply(this, b);
            c.layer && c.layer.drawFeature(c);
            d && this.fireEvent("change", this, b)
        }
    },
    calculatePageBounds: function(a, b) {
        var c = a.get("value"),
        d = this.feature,
        e = this.feature.geometry.getBounds().getCenterLonLat(),
        f = this.printProvider.layout.get("size"),
        b = b || d.layer && d.layer.map && d.layer.map.getUnits() || "dd",
        g = OpenLayers.INCHES_PER_UNIT[b],
        d = f.width / 72 / g * c / 2,
        c = f.height / 72 / g * c / 2;
        return new OpenLayers.Bounds(e.lon - d, e.lat - c, e.lon + d, e.lat + c)
    },
    onLayoutChange: function() { ! 1 === this.printProvider.layout.get("rotation") && this.setRotation(0, !0);
        this.scale && this.setScale(this.scale)
    },
    destroy: function() {
        this.printProvider.un("layoutchange", this.onLayoutChange, this)
    }
});
Ext.namespace("GeoExt");
GeoExt.ZoomSlider = Ext.extend(Ext.slider.SingleSlider, {
    map: null,
    baseCls: "gx-zoomslider",
    aggressive: !1,
    updating: !1,
    initComponent: function() {
        GeoExt.ZoomSlider.superclass.initComponent.call(this);
        if (this.map) {
            if (this.map instanceof GeoExt.MapPanel) this.map = this.map.map;
            this.bind(this.map)
        }
        if (!0 === this.aggressive) this.on("change", this.changeHandler, this);
        else this.on("changecomplete", this.changeHandler, this);
        this.on("beforedestroy", this.unbind, this)
    },
    onRender: function() {
        GeoExt.ZoomSlider.superclass.onRender.apply(this, arguments);
        this.el.addClass(this.baseCls)
    },
    afterRender: function() {
        Ext.slider.SingleSlider.superclass.afterRender.apply(this, arguments);
        this.update()
    },
    addToMapPanel: function(a) {
        this.on({
            render: function() {
                var b = this.getEl();
                b.setStyle({
                    position: "absolute",
                    zIndex: a.map.Z_INDEX_BASE.Control
                });
                b.on({
                    mousedown: this.stopMouseEvents,
                    click: this.stopMouseEvents
                })
            },
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
    bind: function(a) {
        this.map = a;
        this.map.events.on({
            zoomend: this.update,
            changebaselayer: this.initZoomValues,
            scope: this
        });
        this.map.baseLayer && (this.initZoomValues(), this.update())
    },
    unbind: function() {
        this.map && this.map.events && this.map.events.un({
            zoomend: this.update,
            changebaselayer: this.initZoomValues,
            scope: this
        })
    },
    initZoomValues: function() {
        var a = this.map.baseLayer;
        if (void 0 === this.initialConfig.minValue) this.minValue = a.minZoomLevel || 0;
        if (void 0 === this.initialConfig.maxValue) this.maxValue = null == a.minZoomLevel ? a.numZoomLevels - 1 : a.maxZoomLevel
    },
    getZoom: function() {
        return this.getValue()
    },
    getScale: function() {
        return OpenLayers.Util.getScaleFromResolution(this.map.getResolutionForZoom(this.getValue()), this.map.getUnits())
    },
    getResolution: function() {
        return this.map.getResolutionForZoom(this.getValue())
    },
    changeHandler: function() {
        this.map && !this.updating && this.map.zoomTo(this.getValue())
    },
    update: function() {
        if (this.rendered && this.map) this.updating = !0,
        this.setValue(this.map.getZoom()),
        this.updating = !1
    }
});
Ext.reg("gx_zoomslider", GeoExt.ZoomSlider);
Ext.namespace("GeoExt");
GeoExt.ZoomSliderTip = Ext.extend(GeoExt.SliderTip, {
    template: "<div>Zoom Level: {zoom}</div><div>Resolution: {resolution}</div><div>Scale: 1 : {scale}</div>",
    compiledTemplate: null,
    init: function(a) {
        this.compiledTemplate = new Ext.Template(this.template);
        GeoExt.ZoomSliderTip.superclass.init.call(this, a)
    },
    getText: function(a) {
        return this.compiledTemplate.apply({
            zoom: a.value,
            resolution: this.slider.getResolution(),
            scale: Math.round(this.slider.getScale())
        })
    }
});
Ext.namespace("GeoExt.tree");
GeoExt.tree.LayerContainer = Ext.extend(Ext.tree.AsyncTreeNode, {
    text: "Layers",
    constructor: function(a) {
        a = Ext.applyIf(a || {},
        {
            text: this.text
        });
        this.loader = a.loader instanceof GeoExt.tree.LayerLoader ? a.loader: new GeoExt.tree.LayerLoader(Ext.applyIf(a.loader || {},
        {
            store: a.layerStore
        }));
        GeoExt.tree.LayerContainer.superclass.constructor.call(this, a)
    },
    recordIndexToNodeIndex: function(a) {
        for (var b = this.loader.store,
        c = this.childNodes.length,
        d = -1,
        e = b.getCount() - 1; 0 <= e && !(!0 === this.loader.filter(b.getAt(e)) && (++d, a === e || d > c - 1)); --e);
        return d
    },
    destroy: function() {
        delete this.layerStore;
        GeoExt.tree.LayerContainer.superclass.destroy.apply(this, arguments)
    }
});
Ext.tree.TreePanel.nodeTypes.gx_layercontainer = GeoExt.tree.LayerContainer;
Ext.namespace("GeoExt.tree");
GeoExt.tree.LayerParamLoader = function(a) {
    Ext.apply(this, a);
    this.addEvents("beforeload", "load");
    GeoExt.tree.LayerParamLoader.superclass.constructor.call(this)
};
Ext.extend(GeoExt.tree.LayerParamLoader, Ext.util.Observable, {
    param: null,
    delimiter: ",",
    load: function(a, b) {
        if (this.fireEvent("beforeload", this, a)) {
            for (; a.firstChild;) a.removeChild(a.firstChild);
            var c = a.layer instanceof OpenLayers.Layer.HTTPRequest && a.layer.params[this.param];
            c && (c = c instanceof Array ? c.slice() : c.split(this.delimiter), Ext.each(c,
            function(b, c, f) {
                this.addParamNode(b, f, a)
            },
            this));
            "function" == typeof b && b();
            this.fireEvent("load", this, a)
        }
    },
    addParamNode: function(a, b, c) {
        a = this.createNode({
            layer: c.layer,
            param: this.param,
            item: a,
            allItems: b,
            delimiter: this.delimiter
        }); (b = c.item(0)) ? c.insertBefore(a, b) : c.appendChild(a)
    },
    createNode: function(a) {
        this.baseAttrs && Ext.apply(a, this.baseAttrs);
        if ("string" == typeof a.uiProvider) a.uiProvider = this.uiProviders[a.uiProvider] || eval(a.uiProvider);
        a.nodeType = a.nodeType || "gx_layerparam";
        return new Ext.tree.TreePanel.nodeTypes[a.nodeType](a)
    }
});
Ext.namespace("GeoExt.tree");
GeoExt.tree.BaseLayerContainer = Ext.extend(GeoExt.tree.LayerContainer, {
    text: "Base Layer",
    constructor: function(a) {
        a = Ext.applyIf(a || {},
        {
            text: this.text,
            loader: {}
        });
        a.loader = Ext.applyIf(a.loader, {
            baseAttrs: Ext.applyIf(a.loader.baseAttrs || {},
            {
                iconCls: "gx-tree-baselayer-icon",
                checkedGroup: "baselayer"
            }),
            filter: function(a) {
                a = a.getLayer();
                return ! 0 === a.displayInLayerSwitcher && !0 === a.isBaseLayer
            }
        });
        GeoExt.tree.BaseLayerContainer.superclass.constructor.call(this, a)
    }
});
Ext.tree.TreePanel.nodeTypes.gx_baselayercontainer = GeoExt.tree.BaseLayerContainer;
Ext.namespace("GeoExt.tree");
GeoExt.tree.OverlayLayerContainer = Ext.extend(GeoExt.tree.LayerContainer, {
    text: "Overlays",
    constructor: function(a) {
        a = Ext.applyIf(a || {},
        {
            text: this.text
        });
        a.loader = Ext.applyIf(a.loader || {},
        {
            filter: function(a) {
                a = a.getLayer();
                return ! 0 === a.displayInLayerSwitcher && !1 === a.isBaseLayer
            }
        });
        GeoExt.tree.OverlayLayerContainer.superclass.constructor.call(this, a)
    }
});
Ext.tree.TreePanel.nodeTypes.gx_overlaylayercontainer = GeoExt.tree.OverlayLayerContainer;
Ext.namespace("GeoExt.tree");
GeoExt.tree.LayerParamNode = Ext.extend(Ext.tree.TreeNode, {
    layer: null,
    param: null,
    item: null,
    delimiter: null,
    allItems: null,
    constructor: function(a) {
        var b = a || {};
        b.iconCls = b.iconCls || "gx-tree-layerparam-icon";
        b.text = b.text || b.item;
        this.param = b.param;
        this.item = b.item;
        this.delimiter = b.delimiter || ",";
        this.allItems = b.allItems;
        GeoExt.tree.LayerParamNode.superclass.constructor.apply(this, arguments);
        this.getLayer();
        if (this.layer) {
            if (!this.allItems) this.allItems = this.getItemsFromLayer();
            if (null == this.attributes.checked) this.attributes.checked = this.layer.getVisibility() && 0 <= this.getItemsFromLayer().indexOf(this.item);
            else this.onCheckChange(this, this.attributes.checked);
            this.layer.events.on({
                visibilitychanged: this.onLayerVisibilityChanged,
                scope: this
            });
            this.on({
                checkchange: this.onCheckChange,
                scope: this
            })
        }
    },
    getLayer: function() {
        if (!this.layer) {
            var a = this.attributes.layer;
            if ("string" == typeof a) var b = this.attributes.layerStore || GeoExt.MapPanel.guess().layers,
            c = b.findBy(function(b) {
                return b.get("title") == a
            }),
            a = -1 != c ? b.getAt(c).getLayer() : null;
            this.layer = a
        }
        return this.layer
    },
    getItemsFromLayer: function() {
        var a = this.layer.params[this.param];
        return a instanceof Array ? a: a ? a.split(this.delimiter) : []
    },
    createParams: function(a) {
        var b = {};
        b[this.param] = this.layer.params[this.param] instanceof Array ? a: a.join(this.delimiter);
        return b
    },
    onLayerVisibilityChanged: function() {
        0 === this.getItemsFromLayer().length && this.layer.mergeNewParams(this.createParams(this.allItems));
        var a = this.layer.getVisibility();
        a && -1 !== this.getItemsFromLayer().indexOf(this.item) && this.getUI().toggleCheck(!0);
        a || (this.layer.mergeNewParams(this.createParams([])), this.getUI().toggleCheck(!1))
    },
    onCheckChange: function(a, b) {
        var c = this.layer,
        d = [],
        e = this.getItemsFromLayer(); ! 0 === b && !1 === c.getVisibility() && e.length === this.allItems.length && (e = []);
        Ext.each(this.allItems,
        function(a) { (a !== this.item && -1 !== e.indexOf(a) || !0 === b && a === this.item) && d.push(a)
        },
        this);
        var f = 0 < d.length;
        f && c.mergeNewParams(this.createParams(d));
        f !== c.getVisibility() && c.setVisibility(f); ! f && c.mergeNewParams(this.createParams([]))
    },
    destroy: function() {
        var a = this.layer;
        a instanceof OpenLayers.Layer && a.events.un({
            visibilitychanged: this.onLayerVisibilityChanged,
            scope: this
        });
        delete this.layer;
        this.un("checkchange", this.onCheckChange, this);
        GeoExt.tree.LayerParamNode.superclass.destroy.apply(this, arguments)
    }
});
Ext.tree.TreePanel.nodeTypes.gx_layerparam = GeoExt.tree.LayerParamNode;
Ext.namespace("GeoExt.tree");
GeoExt.tree.LayerNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    constructor: function(a) {
        GeoExt.tree.LayerNodeUI.superclass.constructor.apply(this, arguments)
    },
    render: function(a) {
        var b = this.node.attributes;
        if (void 0 === b.checked) b.checked = this.node.layer.getVisibility();
        if (void 0 === b.disabled && this.node.autoDisable) this.node.disabled = !1 === this.node.layer.inRange || !this.node.layer.calculateInRange();
        GeoExt.tree.LayerNodeUI.superclass.render.apply(this, arguments);
        var c = this.checkbox;
        if (b.checkedGroup) b = Ext.DomHelper.insertAfter(c, ['<input type="radio" name="', b.checkedGroup, '_checkbox" class="', c.className, c.checked ? '" checked="checked"': "", '"></input>'].join("")),
        b.defaultChecked = c.defaultChecked,
        Ext.get(c).remove(),
        this.checkbox = b;
        this.enforceOneVisible()
    },
    onClick: function(a) {
        a.getTarget(".x-tree-node-cb", 1) ? this.toggleCheck(this.isChecked()) : GeoExt.tree.LayerNodeUI.superclass.onClick.apply(this, arguments)
    },
    toggleCheck: function(a) {
        a = void 0 === a ? !this.isChecked() : a;
        GeoExt.tree.LayerNodeUI.superclass.toggleCheck.call(this, a);
        this.enforceOneVisible()
    },
    enforceOneVisible: function() {
        var a = this.node.attributes,
        b = a.checkedGroup;
        if (b && "gx_baselayer" !== b) {
            var c = this.node.layer,
            d = this.node.getOwnerTree().getChecked(),
            e = 0;
            Ext.each(d,
            function(d) {
                var g = d.layer; ! d.hidden && d.attributes.checkedGroup === b && (e++, g != c && a.checked && g.setVisibility(!1))
            });
            0 === e && !1 == a.checked && c.setVisibility(!0)
        }
    },
    appendDDGhost: function(a) {
        var b = this.elNode.cloneNode(!0),
        c = Ext.DomQuery.select("input[type='radio']", b);
        Ext.each(c,
        function(a) {
            a.name += "_clone"
        });
        a.appendChild(b)
    }
});
GeoExt.tree.LayerNode = Ext.extend(Ext.tree.AsyncTreeNode, {
    layer: null,
    autoDisable: null,
    layerStore: null,
    constructor: function(a) {
        a.leaf = a.leaf || !(a.children || a.loader);
        if (!a.iconCls && !a.children) a.iconCls = "gx-tree-layer-icon";
        if (a.loader && !(a.loader instanceof Ext.tree.TreeLoader)) a.loader = new GeoExt.tree.LayerParamLoader(a.loader);
        this.defaultUI = this.defaultUI || GeoExt.tree.LayerNodeUI;
        Ext.apply(this, {
            layer: a.layer,
            layerStore: a.layerStore,
            autoDisable: a.autoDisable
        });
        if (a.text) this.fixedText = !0;
        GeoExt.tree.LayerNode.superclass.constructor.apply(this, arguments)
    },
    render: function(a) {
        var b = this.layer instanceof OpenLayers.Layer && this.layer;
        if (!b) {
            if (!this.layerStore || "auto" == this.layerStore) this.layerStore = GeoExt.MapPanel.guess().layers;
            var c = this.layerStore.findBy(function(a) {
                return a.get("title") == this.layer
            },
            this); - 1 != c && (b = this.layerStore.getAt(c).getLayer())
        }
        if (!this.rendered || !b) {
            c = this.getUI();
            if (b) {
                this.layer = b;
                if (b.isBaseLayer) this.draggable = !1,
                Ext.applyIf(this.attributes, {
                    checkedGroup: "gx_baselayer"
                });
                this.autoDisable = !(!1 === this.autoDisable || this.layer.isBaseLayer || this.layer.alwaysInRange);
                if (!this.text) this.text = b.name;
                c.show();
                this.addVisibilityEventHandlers()
            } else c.hide();
            this.layerStore instanceof GeoExt.data.LayerStore && this.addStoreEventHandlers(b)
        }
        GeoExt.tree.LayerNode.superclass.render.apply(this, arguments)
    },
    addVisibilityEventHandlers: function() {
        this.layer.events.on({
            visibilitychanged: this.onLayerVisibilityChanged,
            scope: this
        });
        this.on({
            checkchange: this.onCheckChange,
            scope: this
        });
        this.autoDisable && (this.layer.map ? this.layer.map.events.register("moveend", this, this.onMapMoveend) : this.layer.events.register("added", this,
        function b() {
            this.layer.events.unregister("added", this, b);
            this.layer.map.events.register("moveend", this, this.onMapMoveend)
        }))
    },
    onLayerVisibilityChanged: function() {
        this._visibilityChanging || this.getUI().toggleCheck(this.layer.getVisibility())
    },
    onCheckChange: function(a, b) {
        if (b != this.layer.getVisibility()) {
            this._visibilityChanging = !0;
            var c = this.layer;
            b && c.isBaseLayer && c.map ? c.map.setBaseLayer(c) : c.setVisibility(b);
            delete this._visibilityChanging
        }
    },
    onMapMoveend: function() {
        this.autoDisable && (!1 === this.layer.inRange ? this.disable() : this.enable())
    },
    addStoreEventHandlers: function() {
        this.layerStore.on({
            add: this.onStoreAdd,
            remove: this.onStoreRemove,
            update: this.onStoreUpdate,
            scope: this
        })
    },
    onStoreAdd: function(a, b) {
        for (var c, d = 0; d < b.length; ++d) if (c = b[d].getLayer(), this.layer == c) {
            this.getUI().show();
            break
        } else if (this.layer == c.name) {
            this.render();
            break
        }
    },
    onStoreRemove: function(a, b) {
        this.layer == b.getLayer() && this.getUI().hide()
    },
    onStoreUpdate: function(a, b) {
        var c = b.getLayer(); ! this.fixedText && this.layer == c && this.text !== c.name && this.setText(c.name)
    },
    destroy: function() {
        var a = this.layer;
        a instanceof OpenLayers.Layer && (a.map && a.map.events.unregister("moveend", this, this.onMapMoveend), a.events.un({
            visibilitychanged: this.onLayerVisibilityChanged,
            scope: this
        }));
        delete this.layer;
        if (a = this.layerStore) a.un("add", this.onStoreAdd, this),
        a.un("remove", this.onStoreRemove, this),
        a.un("update", this.onStoreUpdate, this);
        delete this.layerStore;
        this.un("checkchange", this.onCheckChange, this);
        GeoExt.tree.LayerNode.superclass.destroy.apply(this, arguments)
    }
});
Ext.tree.TreePanel.nodeTypes.gx_layer = GeoExt.tree.LayerNode;
Ext.namespace("GeoExt.tree");
GeoExt.tree.TreeNodeUIEventMixin = function() {
    return {
        constructor: function(a) {
            a.addEvents("rendernode", "rawclicknode");
            this.superclass = arguments.callee.superclass;
            this.superclass.constructor.apply(this, arguments)
        },
        render: function(a) {
            this.rendered || (this.superclass.render.apply(this, arguments), this.fireEvent("rendernode", this.node))
        },
        onClick: function(a) { ! 1 !== this.fireEvent("rawclicknode", this.node, a) && this.superclass.onClick.apply(this, arguments)
        }
    }
};
Ext.namespace("GeoExt.tree");
GeoExt.tree.LayerLoader = function(a) {
    Ext.apply(this, a);
    this.addEvents("beforeload", "load");
    GeoExt.tree.LayerLoader.superclass.constructor.call(this)
};
Ext.extend(GeoExt.tree.LayerLoader, Ext.util.Observable, {
    store: null,
    filter: function(a) {
        return ! 0 == a.getLayer().displayInLayerSwitcher
    },
    baseAttrs: null,
    uiProviders: null,
    load: function(a, b) {
        if (this.fireEvent("beforeload", this, a)) {
            for (this.removeStoreHandlers(); a.firstChild;) a.removeChild(a.firstChild);
            if (!this.uiProviders) this.uiProviders = a.getOwnerTree().getLoader().uiProviders;
            if (!this.store) this.store = GeoExt.MapPanel.guess().layers;
            this.store.each(function(b) {
                this.addLayerNode(a, b)
            },
            this);
            this.addStoreHandlers(a);
            "function" == typeof b && b();
            this.fireEvent("load", this, a)
        }
    },
    onStoreAdd: function(a, b, c, d) {
        if (!this._reordering) {
            a = d.recordIndexToNodeIndex(c + b.length - 1);
            for (c = 0; c < b.length; ++c) this.addLayerNode(d, b[c], a)
        }
    },
    onStoreRemove: function(a, b, c, d) {
        this._reordering || this.removeLayerNode(d, b)
    },
    addLayerNode: function(a, b, c) {
        c = c || 0; ! 0 === this.filter(b) && (b = this.createNode({
            nodeType: "gx_layer",
            layer: b.getLayer(),
            layerStore: this.store
        }), (c = a.item(c)) ? a.insertBefore(b, c) : a.appendChild(b), b.on("move", this.onChildMove, this))
    },
    removeLayerNode: function(a, b) {
        if (!0 === this.filter(b)) {
            var c = a.findChildBy(function(a) {
                return a.layer == b.getLayer()
            });
            c && (c.un("move", this.onChildMove, this), c.remove(), a.reload())
        }
    },
    onChildMove: function(a, b, c, d, e) {
        this._reordering = !0;
        a = this.store.getByLayer(b.layer);
        if (d instanceof GeoExt.tree.LayerContainer && this.store === d.loader.store) {
            d.loader._reordering = !0;
            this.store.remove(a);
            var f;
            if (1 < d.childNodes.length) {
                var g = 0 === e ? e + 1 : e - 1;
                f = this.store.findBy(function(a) {
                    return d.childNodes[g].layer === a.getLayer()
                });
                0 === e && f++
            } else if (c.parentNode === d.parentNode) {
                var h = d;
                do h = h.previousSibling;
                while (h && !(h instanceof GeoExt.tree.LayerContainer && h.lastChild));
                if (h) f = this.store.findBy(function(a) {
                    return h.lastChild.layer === a.getLayer()
                });
                else {
                    var i = d;
                    do i = i.nextSibling;
                    while (i && !(i instanceof GeoExt.tree.LayerContainer && i.firstChild));
                    i && (f = this.store.findBy(function(a) {
                        return i.firstChild.layer === a.getLayer()
                    }));
                    f++
                }
            }
            void 0 !== f ? (this.store.insert(f, [a]), window.setTimeout(function() {
                d.reload();
                c.reload()
            })) : this.store.insert(oldRecordIndex, [a]);
            delete d.loader._reordering
        }
        delete this._reordering
    },
    addStoreHandlers: function(a) {
        if (!this._storeHandlers) {
            this._storeHandlers = {
                add: this.onStoreAdd.createDelegate(this, [a], !0),
                remove: this.onStoreRemove.createDelegate(this, [a], !0)
            };
            for (var b in this._storeHandlers) this.store.on(b, this._storeHandlers[b], this)
        }
    },
    removeStoreHandlers: function() {
        if (this._storeHandlers) {
            for (var a in this._storeHandlers) this.store.un(a, this._storeHandlers[a], this);
            delete this._storeHandlers
        }
    },
    createNode: function(a) {
        this.baseAttrs && Ext.apply(a, this.baseAttrs);
        if ("string" == typeof a.uiProvider) a.uiProvider = this.uiProviders[a.uiProvider] || eval(a.uiProvider);
        a.nodeType = a.nodeType || "gx_layer";
        return new Ext.tree.TreePanel.nodeTypes[a.nodeType](a)
    },
    destroy: function() {
        this.removeStoreHandlers()
    }
});
Ext.namespace("GeoExt");
GeoExt.Popup = Ext.extend(Ext.Window, {
    anchored: !0,
    map: null,
    panIn: !0,
    unpinnable: !0,
    location: null,
    insideViewport: null,
    animCollapse: !1,
    draggable: !1,
    shadow: !1,
    popupCls: "gx-popup",
    ancCls: null,
    anchorPosition: "auto",
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
        this.anchored && this.addAnchorEvents();
        this.baseCls = this.popupCls + " " + this.baseCls;
        this.elements += ",anc";
        GeoExt.Popup.superclass.initComponent.call(this)
    },
    onRender: function(a, b) {
        GeoExt.Popup.superclass.onRender.call(this, a, b);
        this.ancCls = this.popupCls + "-anc";
        this.createElement("anc", this.el.dom)
    },
    initTools: function() {
        this.unpinnable && this.addTool({
            id: "unpin",
            handler: this.unanchorPopup.createDelegate(this, [])
        });
        GeoExt.Popup.superclass.initTools.call(this)
    },
    show: function() {
        GeoExt.Popup.superclass.show.apply(this, arguments);
        this.anchored && (this.position(), this.panIn && !this._mapMove && this.panIntoView())
    },
    maximize: function() { ! this.maximized && this.anc && this.unanchorPopup();
        GeoExt.Popup.superclass.maximize.apply(this, arguments)
    },
    setSize: function(a, b) {
        if (this.anc) {
            var c = this.anc.getSize();
            "object" == typeof a ? (b = a.height - c.height, a = a.width) : isNaN(b) || (b -= c.height)
        }
        GeoExt.Popup.superclass.setSize.call(this, a, b)
    },
    position: function() {
        if (!0 === this._mapMove) this.insideViewport = this.map.getExtent().containsLonLat(this.location),
        this.insideViewport !== this.isVisible() && this.setVisible(this.insideViewport);
        if (this.isVisible()) {
            var a = this.map.getPixelFromLonLat(this.location),
            b = Ext.fly(this.map.div).getBox(!0),
            c = a.y + b.y,
            d = a.x + b.x,
            e = this.el.getSize(),
            f = this.anc.getSize(),
            g = this.anchorPosition;
            if ( - 1 < g.indexOf("right") || a.x > b.width / 2) {
                this.anc.addClass("right");
                var h = this.el.getX(!0) + e.width - this.anc.getX(!0) - f.width,
                d = d - (e.width - h - f.width / 2)
            } else this.anc.removeClass("right"),
            h = this.anc.getLeft(!0),
            d -= h + f.width / 2; - 1 < g.indexOf("bottom") || a.y > b.height / 2 ? (this.anc.removeClass("top"), c -= e.height + f.height) : (this.anc.addClass("top"), c += f.height);
            this.setPosition(d, c)
        }
    },
    unanchorPopup: function() {
        this.removeAnchorEvents();
        this.draggable = !0;
        this.header.addClass("x-window-draggable");
        this.dd = new Ext.Window.DD(this);
        this.anc.remove();
        this.anc = null;
        this.tools.unpin.hide()
    },
    panIntoView: function() {
        var a = Ext.fly(this.map.div).getBox(!0),
        b = this.getPosition(!0);
        b[0] -= a.x;
        b[1] -= a.y;
        var a = [a.width, a.height],
        c = this.getSize(),
        d = [b[0], b[1]],
        e = this.map.paddingForPopups;
        b[0] < e.left ? d[0] = e.left: b[0] + c.width > a[0] - e.right && (d[0] = a[0] - e.right - c.width);
        b[1] < e.top ? d[1] = e.top: b[1] + c.height > a[1] - e.bottom && (d[1] = a[1] - e.bottom - c.height);
        this.map.pan(b[0] - d[0], b[1] - d[1])
    },
    onMapMove: function() {
        if (!this.hidden || !this.insideViewport) this._mapMove = !0,
        this.position(),
        delete this._mapMove
    },
    addAnchorEvents: function() {
        this.map.events.on({
            move: this.onMapMove,
            scope: this
        });
        this.on({
            resize: this.position,
            collapse: this.position,
            expand: this.position,
            scope: this
        })
    },
    removeAnchorEvents: function() {
        this.map.events.un({
            move: this.onMapMove,
            scope: this
        });
        this.un("resize", this.position, this);
        this.un("collapse", this.position, this);
        this.un("expand", this.position, this)
    },
    beforeDestroy: function() {
        this.anchored && this.removeAnchorEvents();
        GeoExt.Popup.superclass.beforeDestroy.call(this)
    }
});
Ext.reg("gx_popup", GeoExt.Popup);
Ext.namespace("GeoExt.data");
GeoExt.data.ScaleStore = Ext.extend(Ext.data.Store, {
    map: null,
    constructor: function(a) {
        var b = a.map instanceof GeoExt.MapPanel ? a.map.map: a.map;
        delete a.map;
        a = Ext.applyIf(a, {
            reader: new Ext.data.JsonReader({},
            ["level", "resolution", "scale"])
        });
        GeoExt.data.ScaleStore.superclass.constructor.call(this, a);
        b && this.bind(b)
    },
    bind: function(a) {
        this.map = a instanceof GeoExt.MapPanel ? a.map: a;
        this.map.events.register("changebaselayer", this, this.populateFromMap);
        this.map.baseLayer ? this.populateFromMap() : this.map.events.register("addlayer", this, this.populateOnAdd)
    },
    unbind: function() {
        this.map && (this.map.events.unregister("addlayer", this, this.populateOnAdd), this.map.events.unregister("changebaselayer", this, this.populateFromMap), delete this.map)
    },
    populateOnAdd: function(a) {
        a.layer.isBaseLayer && (this.populateFromMap(), this.map.events.unregister("addlayer", this, this.populateOnAdd))
    },
    populateFromMap: function() {
        for (var a = [], b = this.map.baseLayer.resolutions, c = this.map.baseLayer.units, d = b.length - 1; 0 <= d; d--) {
            var e = b[d];
            a.push({
                level: d,
                resolution: e,
                scale: OpenLayers.Util.getScaleFromResolution(e, c)
            })
        }
        this.loadData(a)
    },
    destroy: function() {
        this.unbind();
        GeoExt.data.ScaleStore.superclass.destroy.apply(this, arguments)
    }
});
Ext.namespace("GeoExt");
GeoExt.LegendPanel = Ext.extend(Ext.Panel, {
    dynamic: !0,
    layerStore: null,
    preferredTypes: null,
    filter: function() {
        return ! 0
    },
    onRender: function() {
        GeoExt.LegendPanel.superclass.onRender.apply(this, arguments);
        if (!this.layerStore) this.layerStore = GeoExt.MapPanel.guess().layers;
        this.layerStore.each(function(a) {
            this.addLegend(a)
        },
        this);
        if (this.dynamic) this.layerStore.on({
            add: this.onStoreAdd,
            remove: this.onStoreRemove,
            clear: this.onStoreClear,
            scope: this
        })
    },
    recordIndexToPanelIndex: function(a) {
        for (var b = this.layerStore,
        c = -1,
        d = this.items ? this.items.length: 0, e, f, g = b.getCount() - 1; 0 <= g && !(e = b.getAt(g), f = e.getLayer(), e = GeoExt.LayerLegend.getTypes(e), f.displayInLayerSwitcher && 0 < e.length && !0 !== b.getAt(g).get("hideInLegend") && (++c, a === g || c > d - 1)); --g);
        return c
    },
    getIdForLayer: function(a) {
        return this.id + "-" + a.id
    },
    onStoreAdd: function(a, b, c) {
        for (var a = this.recordIndexToPanelIndex(c + b.length - 1), c = 0, d = b.length; c < d; c++) this.addLegend(b[c], a);
        this.doLayout()
    },
    onStoreRemove: function(a, b) {
        this.removeLegend(b)
    },
    removeLegend: function(a) {
        if (this.items && (a = this.getComponent(this.getIdForLayer(a.getLayer())))) this.remove(a, !0),
        this.doLayout()
    },
    onStoreClear: function() {
        this.removeAllLegends()
    },
    removeAllLegends: function() {
        this.removeAll(!0);
        this.doLayout()
    },
    addLegend: function(a, b) {
        if (!0 === this.filter(a)) {
            var c = a.getLayer(),
            b = b || 0,
            d = GeoExt.LayerLegend.getTypes(a, this.preferredTypes);
            c.displayInLayerSwitcher && !a.get("hideInLegend") && 0 < d.length && this.insert(b, {
                xtype: d[0],
                id: this.getIdForLayer(c),
                layerRecord: a,
                hidden: !(!c.map && c.visibility || c.getVisibility() && c.calculateInRange())
            })
        }
    },
    onDestroy: function() {
        this.layerStore && (this.layerStore.un("add", this.onStoreAdd, this), this.layerStore.un("remove", this.onStoreRemove, this), this.layerStore.un("clear", this.onStoreClear, this));
        GeoExt.LegendPanel.superclass.onDestroy.apply(this, arguments)
    }
});
Ext.reg("gx_legendpanel", GeoExt.LegendPanel);
Ext.namespace("GeoExt");
GeoExt.LayerLegend = Ext.extend(Ext.Container, {
    layerRecord: null,
    showTitle: !0,
    legendTitle: null,
    labelCls: null,
    layerStore: null,
    initComponent: function() {
        GeoExt.LayerLegend.superclass.initComponent.call(this);
        this.autoEl = {};
        this.add({
            xtype: "label",
            html: this.getLayerTitle(this.layerRecord),
            cls: "x-form-item x-form-item-label" + (this.labelCls ? " " + this.labelCls: "")
        });
        if (this.layerRecord && this.layerRecord.store) this.layerStore = this.layerRecord.store,
        this.layerStore.on("update", this.onStoreUpdate, this),
        this.layerStore.on("add", this.onStoreAdd, this),
        this.layerStore.on("remove", this.onStoreRemove, this)
    },
    getLabel: function() {
        var a = this.items.get(0);
        return a.rendered ? a.el.dom.innerHTML: a.html
    },
    onStoreRemove: function() {},
    onStoreAdd: function() {},
    onStoreUpdate: function(a, b) {
        if (b === this.layerRecord && 0 < this.items.getCount()) {
            var c = b.getLayer();
            this.setVisible(c.getVisibility() && c.calculateInRange() && c.displayInLayerSwitcher && !b.get("hideInLegend"));
            this.update()
        }
    },
    update: function() {
        var a = this.getLayerTitle(this.layerRecord),
        b = this.items.get(0);
        b instanceof Ext.form.Label && this.getLabel() !== a && b.setText(a, !1)
    },
    getLayerTitle: function(a) {
        var b = this.legendTitle || "";
        this.showTitle && !b && a && !a.get("hideTitle") && (b = a.get("title") || a.get("name") || a.getLayer().name || "");
        return b
    },
    beforeDestroy: function() {
        this.layerStore && (this.layerStore.un("update", this.onStoreUpdate, this), this.layerStore.un("remove", this.onStoreRemove, this), this.layerStore.un("add", this.onStoreAdd, this));
        GeoExt.LayerLegend.superclass.beforeDestroy.apply(this, arguments)
    },
    onDestroy: function() {
        this.layerStore = this.layerRecord = null;
        GeoExt.LayerLegend.superclass.onDestroy.apply(this, arguments)
    }
});
GeoExt.LayerLegend.getTypes = function(a, b) {
    var c = (b || []).concat(),
    d = [],
    e,
    f;
    for (f in GeoExt.LayerLegend.types) e = GeoExt.LayerLegend.types[f].supports(a),
    0 < e ? -1 == c.indexOf(f) && d.push({
        type: f,
        score: e
    }) : c.remove(f);
    d.sort(function(a, b) {
        return a.score < b.score ? 1 : a.score == b.score ? 0 : -1
    });
    e = d.length;
    f = Array(e);
    for (var g = 0; g < e; ++g) f[g] = d[g].type;
    return c.concat(f)
};
GeoExt.LayerLegend.supports = function() {};
GeoExt.LayerLegend.types = {};
Ext.namespace("GeoExt");
GeoExt.LegendImage = Ext.extend(Ext.BoxComponent, {
    url: null,
    defaultImgSrc: null,
    imgCls: null,
    noImgCls: "gx-legend-noimage",
    initComponent: function() {
        GeoExt.LegendImage.superclass.initComponent.call(this);
        if (null === this.defaultImgSrc) this.defaultImgSrc = Ext.BLANK_IMAGE_URL;
        this.autoEl = {
            tag: "img",
            "class": this.imgCls ? this.imgCls + " " + this.noImgCls: this.noImgCls,
            src: this.defaultImgSrc
        }
    },
    setUrl: function(a) {
        this.url = a;
        var b = this.getEl();
        if (b) b.un("load", this.onImageLoad, this),
        b.on("load", this.onImageLoad, this, {
            single: !0
        }),
        b.un("error", this.onImageLoadError, this),
        b.on("error", this.onImageLoadError, this, {
            single: !0
        }),
        b.dom.src = a
    },
    onRender: function(a, b) {
        GeoExt.LegendImage.superclass.onRender.call(this, a, b);
        this.url && this.setUrl(this.url)
    },
    onDestroy: function() {
        var a = this.getEl();
        a && (a.un("load", this.onImageLoad, this), a.un("error", this.onImageLoadError, this));
        GeoExt.LegendImage.superclass.onDestroy.apply(this, arguments)
    },
    onImageLoadError: function() {
        var a = this.getEl();
        a.addClass(this.noImgCls);
        a.dom.src = this.defaultImgSrc
    },
    onImageLoad: function() {
        var a = this.getEl();
        OpenLayers.Util.isEquivalentUrl(a.dom.src, this.defaultImgSrc) || a.removeClass(this.noImgCls)
    }
});
Ext.reg("gx_legendimage", GeoExt.LegendImage);
Ext.namespace("GeoExt");
GeoExt.WMSLegend = Ext.extend(GeoExt.LayerLegend, {
    defaultStyleIsFirst: !0,
    useScaleParameter: !0,
    baseParams: null,
    initComponent: function() {
        GeoExt.WMSLegend.superclass.initComponent.call(this);
        var a = this.layerRecord.getLayer();
        this._noMap = !a.map;
        a.events.register("moveend", this, this.onLayerMoveend);
        this.update()
    },
    onLayerMoveend: function(a) {
        if (!0 === a.zoomChanged && !0 === this.useScaleParameter || this._noMap) delete this._noMap,
        this.update()
    },
    getLegendUrl: function(a, b) {
        var c = this.layerRecord,
        d, e = c && c.get("styles"),
        c = c.getLayer(),
        b = b || ("" + c.params.LAYERS).split(","),
        f = c.params.STYLES && ("" + c.params.STYLES).split(","),
        g = b.indexOf(a),
        h = f && f[g];
        e && 0 < e.length && (h ? Ext.each(e,
        function(a) {
            d = a.name == h && a.legend && a.legend.href;
            return ! d
        }) : !0 === this.defaultStyleIsFirst && !f && !c.params.SLD && !c.params.SLD_BODY && (d = e[0].legend && e[0].legend.href));
        d || (d = c.getFullRequestString({
            REQUEST: "GetLegendGraphic",
            WIDTH: null,
            HEIGHT: null,
            EXCEPTIONS: "application/vnd.ogc.se_xml",
            LAYER: a,
            LAYERS: null,
            STYLE: "" !== h ? h: null,
            STYLES: null,
            SRS: null,
            FORMAT: null,
            TIME: null
        }));
        e = Ext.apply({},
        this.baseParams);
        if (c.params._OLSALT) e._OLSALT = c.params._OLSALT;
        d = Ext.urlAppend(d, Ext.urlEncode(e)); - 1 != d.toLowerCase().indexOf("request=getlegendgraphic") && ( - 1 == d.toLowerCase().indexOf("format=") && (d = Ext.urlAppend(d, "FORMAT=image%2Fgif")), !0 === this.useScaleParameter && (e = c.map.getScale(), d = Ext.urlAppend(d, "SCALE=" + e)));
        return d
    },
    update: function() {
        var a = this.layerRecord.getLayer();
        if (a && a.map) {
            GeoExt.WMSLegend.superclass.update.apply(this, arguments);
            var b, c, d;
            b = ("" + a.params.LAYERS).split(",");
            var e = [],
            f = this.items.get(0);
            this.items.each(function(a) {
                d = b.indexOf(a.itemId);
                if (0 > d && a != f) e.push(a);
                else if (a !== f) {
                    c = b[d];
                    var g = this.getLegendUrl(c, b);
                    OpenLayers.Util.isEquivalentUrl(g, a.url) || a.setUrl(g)
                }
            },
            this);
            for (d = 0, a = e.length; d < a; d++) {
                var g = e[d];
                this.remove(g);
                g.destroy()
            }
            for (d = 0, a = b.length; d < a; d++) c = b[d],
            (!this.items || !this.getComponent(c)) && this.add({
                xtype: "gx_legendimage",
                url: this.getLegendUrl(c, b),
                itemId: c
            });
            this.doLayout()
        }
    },
    beforeDestroy: function() {
        if (!0 === this.useScaleParameter) {
            var a = this.layerRecord.getLayer();
            a && a.events && a.events.unregister("moveend", this, this.onLayerMoveend)
        }
        GeoExt.WMSLegend.superclass.beforeDestroy.apply(this, arguments)
    }
});
GeoExt.WMSLegend.supports = function(a) {
    return a.getLayer() instanceof OpenLayers.Layer.WMS ? 1 : 0
};
GeoExt.LayerLegend.types.gx_wmslegend = GeoExt.WMSLegend;
Ext.reg("gx_wmslegend", GeoExt.WMSLegend);
Ext.namespace("GeoExt");
GeoExt.VectorLegend = Ext.extend(GeoExt.LayerLegend, {
    layerRecord: null,
    layer: null,
    rules: null,
    symbolType: null,
    untitledPrefix: "Untitled ",
    clickableSymbol: !1,
    clickableTitle: !1,
    selectOnClick: !1,
    enableDD: !1,
    bodyBorder: !1,
    feature: null,
    selectedRule: null,
    currentScaleDenominator: null,
    initComponent: function() {
        GeoExt.VectorLegend.superclass.initComponent.call(this);
        if (this.layerRecord && (this.layer = this.layerRecord.getLayer(), this.layer.map)) this.map = this.layer.map,
        this.currentScaleDenominator = this.layer.map.getScale(),
        this.layer.map.events.on({
            zoomend: this.onMapZoom,
            scope: this
        });
        if (!this.symbolType) if (this.feature) this.symbolType = this.symbolTypeFromFeature(this.feature);
        else if (this.layer) if (0 < this.layer.features.length) {
            var a = this.layer.features[0].clone();
            a.attributes = {};
            this.feature = a;
            this.symbolType = this.symbolTypeFromFeature(this.feature)
        } else this.layer.events.on({
            featuresadded: this.onFeaturesAdded,
            scope: this
        });
        this.layer && this.feature && !this.rules && this.setRules();
        this.rulesContainer = new Ext.Container({
            autoEl: {}
        });
        this.add(this.rulesContainer);
        this.addEvents("titleclick", "symbolclick", "ruleclick", "ruleselected", "ruleunselected", "rulemoved");
        this.update()
    },
    onMapZoom: function() {
        this.setCurrentScaleDenominator(this.layer.map.getScale())
    },
    symbolTypeFromFeature: function(a) {
        return (a = a.geometry.CLASS_NAME.match(/Point|Line|Polygon/)) && a[0] || "Point"
    },
    onFeaturesAdded: function() {
        this.layer.events.un({
            featuresadded: this.onFeaturesAdded,
            scope: this
        });
        var a = this.layer.features[0].clone();
        a.attributes = {};
        this.feature = a;
        this.symbolType = this.symbolTypeFromFeature(this.feature);
        this.rules || this.setRules();
        this.update()
    },
    setRules: function() {
        var a = this.layer.styleMap && this.layer.styleMap.styles["default"];
        a || (a = new OpenLayers.Style);
        this.rules = 0 === a.rules.length ? [new OpenLayers.Rule({
            title: a.title,
            symbolizer: a.createSymbolizer(this.feature)
        })] : a.rules
    },
    setCurrentScaleDenominator: function(a) {
        if (a !== this.currentScaleDenominator) this.currentScaleDenominator = a,
        this.update()
    },
    getRuleEntry: function(a) {
        return this.rulesContainer.items.get(this.rules.indexOf(a))
    },
    addRuleEntry: function(a, b) {
        this.rulesContainer.add(this.createRuleEntry(a));
        b || this.doLayout()
    },
    removeRuleEntry: function(a, b) {
        var c = this.getRuleEntry(a);
        c && (this.rulesContainer.remove(c), b || this.doLayout())
    },
    selectRuleEntry: function(a) {
        var b = a != this.selectedRule;
        this.selectedRule && this.unselect();
        if (b) this.getRuleEntry(a).body.addClass("x-grid3-row-selected"),
        this.selectedRule = a,
        this.fireEvent("ruleselected", this, a)
    },
    unselect: function() {
        this.rulesContainer.items.each(function(a, b) {
            if (this.rules[b] == this.selectedRule) a.body.removeClass("x-grid3-row-selected"),
            this.selectedRule = null,
            this.fireEvent("ruleunselected", this, this.rules[b])
        },
        this)
    },
    createRuleEntry: function(a) {
        var b = !0;
        null != this.currentScaleDenominator && (a.minScaleDenominator && (b = b && this.currentScaleDenominator >= a.minScaleDenominator), a.maxScaleDenominator && (b = b && this.currentScaleDenominator < a.maxScaleDenominator));
        return {
            xtype: "panel",
            layout: "column",
            border: !1,
            hidden: !b,
            bodyStyle: this.selectOnClick ? {
                cursor: "pointer"
            }: void 0,
            defaults: {
                border: !1
            },
            items: [this.createRuleRenderer(a), this.createRuleTitle(a)],
            listeners: {
                render: function(b) {
                    this.selectOnClick && b.getEl().on({
                        click: function() {
                            this.selectRuleEntry(a)
                        },
                        scope: this
                    }); ! 0 == this.enableDD && this.addDD(b)
                },
                scope: this
            }
        }
    },
    createRuleRenderer: function(a) {
        var b = [this.symbolType, "Point", "Line", "Polygon"],
        c,
        d,
        e = a.symbolizers;
        if (e) {
            var f, g = 0,
            h = b.length;
            a: for (; g < h; ++g) if (c = b[g], f = OpenLayers.Symbolizer[c]) for (var i = 0,
            j = e.length; i < j; ++i) if (e[i] instanceof f) {
                d = !0;
                break a
            }
        } else {
            var e = a.symbolizer,
            g = 0;
            for (f = b.length; g < f; ++g) if (c = b[g], e[c]) {
                e = e[c];
                d = !0;
                break
            }
            e = [e]
        }
        return {
            xtype: "gx_renderer",
            symbolType: d ? c: this.symbolType,
            symbolizers: e,
            style: this.clickableSymbol ? {
                cursor: "pointer"
            }: void 0,
            listeners: {
                click: function() {
                    this.clickableSymbol && (this.fireEvent("symbolclick", this, a), this.fireEvent("ruleclick", this, a))
                },
                scope: this
            }
        }
    },
    createRuleTitle: function(a) {
        return {
            cls: "x-form-item",
            style: "padding: 0.2em 0.5em 0;",
            bodyStyle: Ext.applyIf({
                background: "transparent"
            },
            this.clickableTitle ? {
                cursor: "pointer"
            }: void 0),
            html: this.getRuleTitle(a),
            listeners: {
                render: function(b) {
                    this.clickableTitle && b.getEl().on({
                        click: function() {
                            this.fireEvent("titleclick", this, a);
                            this.fireEvent("ruleclick", this, a)
                        },
                        scope: this
                    })
                },
                scope: this
            }
        }
    },
    addDD: function(a) {
        var b = a.ownerCt,
        c = this;
        new Ext.dd.DragSource(a.getEl(), {
            ddGroup: b.id,
            onDragOut: function(a, b) {
                var c = Ext.getCmp(b);
                c.removeClass("gx-ruledrag-insert-above");
                c.removeClass("gx-ruledrag-insert-below");
                return Ext.dd.DragZone.prototype.onDragOut.apply(this, arguments)
            },
            onDragEnter: function(c, e) {
                var f = Ext.getCmp(e),
                g,
                h = b.items.indexOf(a),
                i = b.items.indexOf(f);
                h > i ? g = "gx-ruledrag-insert-above": h < i && (g = "gx-ruledrag-insert-below");
                g && f.addClass(g);
                return Ext.dd.DragZone.prototype.onDragEnter.apply(this, arguments)
            },
            onDragDrop: function(d, e) {
                c.moveRule(b.items.indexOf(a), b.items.indexOf(Ext.getCmp(e)));
                return Ext.dd.DragZone.prototype.onDragDrop.apply(this, arguments)
            },
            getDragData: function(a) {
                if (a = a.getTarget(".x-column-inner")) {
                    var b = a.cloneNode(!0);
                    b.id = Ext.id();
                    return {
                        sourceEl: a,
                        repairXY: Ext.fly(a).getXY(),
                        ddel: b
                    }
                }
            }
        });
        new Ext.dd.DropTarget(a.getEl(), {
            ddGroup: b.id,
            notifyDrop: function() {
                return ! 0
            }
        })
    },
    update: function() {
        GeoExt.VectorLegend.superclass.update.apply(this, arguments);
        if (this.symbolType && this.rules) {
            if (this.rulesContainer.items) for (var a, b = this.rulesContainer.items.length - 1; 0 <= b; --b) a = this.rulesContainer.getComponent(b),
            this.rulesContainer.remove(a, !0);
            b = 0;
            for (a = this.rules.length; b < a; ++b) this.addRuleEntry(this.rules[b], !0);
            this.doLayout();
            this.selectedRule && this.getRuleEntry(this.selectedRule).body.addClass("x-grid3-row-selected")
        }
    },
    updateRuleEntry: function(a) {
        var b = this.getRuleEntry(a);
        b && (b.removeAll(), b.add(this.createRuleRenderer(a)), b.add(this.createRuleTitle(a)), b.doLayout())
    },
    moveRule: function(a, b) {
        var c = this.rules[a];
        this.rules.splice(a, 1);
        this.rules.splice(b, 0, c);
        this.update();
        this.fireEvent("rulemoved", this, c)
    },
    getRuleTitle: function(a) {
        var b = a.title || a.name || ""; ! b && this.untitledPrefix && (b = this.untitledPrefix + (this.rules.indexOf(a) + 1));
        return b
    },
    beforeDestroy: function() {
        this.layer && (this.layer.events && this.layer.events.un({
            featuresadded: this.onFeaturesAdded,
            scope: this
        }), this.layer.map && this.layer.map.events && this.layer.map.events.un({
            zoomend: this.onMapZoom,
            scope: this
        }));
        delete this.layer;
        delete this.map;
        delete this.rules;
        GeoExt.VectorLegend.superclass.beforeDestroy.apply(this, arguments)
    },
    onStoreRemove: function(a, b) {
        b.getLayer() === this.layer && this.map && this.map.events && this.map.events.un({
            zoomend: this.onMapZoom,
            scope: this
        })
    },
    onStoreAdd: function(a, b) {
        for (var c = 0,
        d = b.length; c < d; c++) if (b[c].getLayer() === this.layer && this.layer.map && this.layer.map.events) this.layer.map.events.on({
            zoomend: this.onMapZoom,
            scope: this
        })
    }
});
GeoExt.VectorLegend.supports = function(a) {
    return a.getLayer() instanceof OpenLayers.Layer.Vector ? 1 : 0
};
GeoExt.LayerLegend.types.gx_vectorlegend = GeoExt.VectorLegend;
Ext.reg("gx_vectorlegend", GeoExt.VectorLegend);
Ext.namespace("GeoExt");
GeoExt.FeatureRenderer = Ext.extend(Ext.BoxComponent, {
    feature: void 0,
    symbolizers: [OpenLayers.Feature.Vector.style["default"]],
    symbolType: "Polygon",
    resolution: 1,
    minWidth: 20,
    minHeight: 20,
    renderers: ["SVG", "VML", "Canvas"],
    rendererOptions: null,
    pointFeature: void 0,
    lineFeature: void 0,
    polygonFeature: void 0,
    textFeature: void 0,
    renderer: null,
    initComponent: function() {
        GeoExt.FeatureRenderer.superclass.initComponent.apply(this, arguments);
        Ext.applyIf(this, {
            pointFeature: new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(0, 0)),
            lineFeature: new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point( - 8, -3), new OpenLayers.Geometry.Point( - 3, 3), new OpenLayers.Geometry.Point(3, -3), new OpenLayers.Geometry.Point(8, 3)])),
            polygonFeature: new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point( - 8, -4), new OpenLayers.Geometry.Point( - 6, -6), new OpenLayers.Geometry.Point(6, -6), new OpenLayers.Geometry.Point(8, -4), new OpenLayers.Geometry.Point(8, 4), new OpenLayers.Geometry.Point(6, 6), new OpenLayers.Geometry.Point( - 6, 6), new OpenLayers.Geometry.Point( - 8, 4)])])),
            textFeature: new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(0, 0))
        });
        this.feature || this.setFeature(null, {
            draw: !1
        });
        this.addEvents("click")
    },
    initCustomEvents: function() {
        this.clearCustomEvents();
        this.el.on("click", this.onClick, this)
    },
    clearCustomEvents: function() {
        this.el && this.el.removeAllListeners && this.el.removeAllListeners()
    },
    onClick: function() {
        this.fireEvent("click", this)
    },
    onRender: function(a, b) {
        if (!this.el) this.el = document.createElement("div"),
        this.el.id = this.getId(); (!this.renderer || !this.renderer.supported()) && this.assignRenderer();
        this.renderer.map = {
            getResolution: function() {
                return this.resolution
            }.createDelegate(this)
        };
        GeoExt.FeatureRenderer.superclass.onRender.apply(this, arguments);
        this.drawFeature()
    },
    afterRender: function() {
        GeoExt.FeatureRenderer.superclass.afterRender.apply(this, arguments);
        this.initCustomEvents()
    },
    onResize: function(a, b) {
        this.setRendererDimensions();
        GeoExt.FeatureRenderer.superclass.onResize.apply(this, arguments)
    },
    setRendererDimensions: function() {
        var a = this.feature.geometry.getBounds(),
        b = a.getWidth(),
        c = a.getHeight(),
        d = this.initialConfig.resolution;
        d || (d = Math.max(b / this.width || 0, c / this.height || 0) || 1);
        this.resolution = d;
        var b = Math.max(this.width || this.minWidth, b / d),
        c = Math.max(this.height || this.minHeight, c / d),
        a = a.getCenterPixel(),
        e = b * d / 2,
        d = c * d / 2,
        d = new OpenLayers.Bounds(a.x - e, a.y - d, a.x + e, a.y + d);
        this.renderer.setSize(new OpenLayers.Size(Math.round(b), Math.round(c)));
        this.renderer.setExtent(d, !0)
    },
    assignRenderer: function() {
        for (var a = 0,
        b = this.renderers.length; a < b; ++a) {
            var c = OpenLayers.Renderer[this.renderers[a]];
            if (c && c.prototype.supported()) {
                this.renderer = new c(this.el, this.rendererOptions);
                break
            }
        }
    },
    setSymbolizers: function(a, b) {
        this.symbolizers = a; (!b || b.draw) && this.drawFeature()
    },
    setSymbolType: function(a, b) {
        this.symbolType = a;
        this.setFeature(null, b)
    },
    setFeature: function(a, b) {
        this.feature = a || this[this.symbolType.toLowerCase() + "Feature"]; (!b || b.draw) && this.drawFeature()
    },
    drawFeature: function() {
        this.renderer.clear();
        this.setRendererDimensions();
        for (var a, b, c = 0,
        d = this.symbolizers.length; c < d; ++c) {
            a = this.symbolizers[c];
            b = this.feature;
            if (a instanceof OpenLayers.Symbolizer) {
                a = a.clone();
                if (OpenLayers.Symbolizer.Text && a instanceof OpenLayers.Symbolizer.Text && !1 === a.graphic) a.fill = a.stroke = !1;
                this.initialConfig.feature || (b = a.CLASS_NAME.split(".").pop().toLowerCase(), b = this[b + "Feature"])
            } else a = Ext.apply({},
            a);
            this.renderer.drawFeature(b.clone(), a)
        }
    },
    update: function(a) {
        a = a || {};
        a.feature ? this.setFeature(a.feature, {
            draw: !1
        }) : a.symbolType && this.setSymbolType(a.symbolType, {
            draw: !1
        });
        a.symbolizers && this.setSymbolizers(a.symbolizers, {
            draw: !1
        });
        this.drawFeature()
    },
    beforeDestroy: function() {
        this.clearCustomEvents();
        this.renderer && this.renderer.destroy()
    }
});
Ext.reg("gx_renderer", GeoExt.FeatureRenderer);
Ext.namespace("GeoExt.form");
GeoExt.form.toFilter = function(a, b, c) {
    a instanceof Ext.form.FormPanel && (a = a.getForm());
    var d = [],
    a = a.getValues(!1),
    e;
    for (e in a) {
        var f = e.split("__"),
        g = a[e],
        h;
        1 < f.length && void 0 !== (h = GeoExt.form.toFilter.FILTER_MAP[f[1]]) ? e = f[0] : h = OpenLayers.Filter.Comparison.EQUAL_TO;
        if (h === OpenLayers.Filter.Comparison.LIKE) switch (c) {
        case GeoExt.form.ENDS_WITH:
            g = ".*" + g;
            break;
        case GeoExt.form.STARTS_WITH:
            g += ".*";
            break;
        case GeoExt.form.CONTAINS:
            g = ".*" + g + ".*"
        }
        d.push(new OpenLayers.Filter.Comparison({
            type: h,
            value: g,
            property: e
        }))
    }
    return 1 == d.length && b != OpenLayers.Filter.Logical.NOT ? d[0] : new OpenLayers.Filter.Logical({
        type: b || OpenLayers.Filter.Logical.AND,
        filters: d
    })
};
GeoExt.form.toFilter.FILTER_MAP = {
    eq: OpenLayers.Filter.Comparison.EQUAL_TO,
    ne: OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
    lt: OpenLayers.Filter.Comparison.LESS_THAN,
    le: OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,
    gt: OpenLayers.Filter.Comparison.GREATER_THAN,
    ge: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
    like: OpenLayers.Filter.Comparison.LIKE
};
GeoExt.form.ENDS_WITH = 1;
GeoExt.form.STARTS_WITH = 2;
GeoExt.form.CONTAINS = 3;
GeoExt.form.recordToField = function(a, b) {
    var b = b || {},
    c = a.get("type");
    if ("object" === typeof c && c.xtype) return c;
    var c = c.split(":").pop(),
    d,
    e = a.get("name"),
    f = a.get("restriction") || {},
    g = a.get("nillable") || !1,
    h = a.get("label"),
    i = b.labelTpl;
    i ? h = (i instanceof Ext.Template ? i: new Ext.XTemplate(i)).apply(a.data) : null == h && (h = e);
    e = {
        name: e,
        labelStyle: g ? "": null != b.mandatoryFieldLabelStyle ? b.mandatoryFieldLabelStyle: "font-weight:bold;"
    };
    g = GeoExt.form.recordToField.REGEXES;
    f.enumeration ? d = Ext.apply({
        xtype: "combo",
        fieldLabel: h,
        mode: "local",
        forceSelection: !0,
        triggerAction: "all",
        editable: !1,
        store: f.enumeration
    },
    e) : c.match(g.text) ? (c = void 0 !== f.maxLength ? parseFloat(f.maxLength) : void 0, f = void 0 !== f.minLength ? parseFloat(f.minLength) : void 0, d = Ext.apply({
        xtype: "textfield",
        fieldLabel: h,
        maxLength: c,
        minLength: f
    },
    e)) : c.match(g.number) ? (c = void 0 !== f.maxInclusive ? parseFloat(f.maxInclusive) : void 0, f = void 0 !== f.minInclusive ? parseFloat(f.minInclusive) : void 0, d = Ext.apply({
        xtype: "numberfield",
        fieldLabel: h,
        maxValue: c,
        minValue: f
    },
    e)) : c.match(g["boolean"]) ? (d = Ext.apply({
        xtype: "checkbox"
    },
    e), d[b.checkboxLabelProperty || "boxLabel"] = h) : c.match(g.date) && (d = Ext.apply({
        xtype: "datefield",
        fieldLabel: h,
        format: "c"
    },
    e));
    return d
};
GeoExt.form.recordToField.REGEXES = {
    text: /^(text|string)$/i,
    number: /^(number|float|decimal|double|int|long|integer|short)$/i,
    "boolean": /^(boolean)$/i,
    date: /^(date|dateTime)$/i
};