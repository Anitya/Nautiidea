Ext.namespace("GeoNode");
GeoNode.DataGrid = Ext.extend(Ext.util.Observable, {
    dataTitleHeaderText: "UT:Title",
    dataNameHeaderText: "UT:Name",
    dataDetailText: "UT: Click here for more information about this layer.",
    constructor: function(a) {
        Ext.apply(this, a);
        this.loadData()
    },
    owsURL: function(a) {
        a = this.ows + "?" + Ext.urlEncode(a);
        this.proxy && (a = this.proxy + "?" + Ext.urlEncode({
            url: a
        }));
        return a
    },
    loadData: function() {
        var a = this.owsURL({
            service: "WMS",
            request: "GetCapabilities"
        });
        this.capabilities = new GeoExt.data.WMSCapabilitiesStore({
            url: a,
            fields: [{
                name: "name",
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
                name: "formats"
            },
            {
                name: "styles"
            },
            {
                name: "llbbox"
            },
            {
                name: "minScale"
            },
            {
                name: "maxScale"
            },
            {
                name: "prefix"
            },
            {
                name: "attribution"
            },
            {
                name: "keywords"
            },
            {
                name: "metadataURLs"
            },
            {
                name: "owsType"
            }]
        });
        gxp.util.dispatch([function(a) {
            this.capabilities.load({
                callback: a,
                scope: this
            })
        }], this.doLayout, this)
    },
    doLayout: function() {
        var a = new GeoExplorer.CapabilitiesRowExpander({
            tpl: new Ext.Template("<p><b>" + GeoExplorer.CapabilitiesRowExpander.prototype.abstractText + "</b> {abstract}</p><p><b>" + GeoExplorer.CapabilitiesRowExpander.prototype.attributionText + "</b> {attribution:this.attributionLink}</p><p><b>" + GeoExplorer.CapabilitiesRowExpander.prototype.metadataText + "</b> {metadataURLs:this.metadataLinks}</p><p><b>" + GeoExplorer.CapabilitiesRowExpander.prototype.keywordText + "</b> {keywords:this.keywordList}</p><p><b>" + GeoExplorer.CapabilitiesRowExpander.prototype.downloadText + '</b> <a class="download pdf" href="{name:this.pdfUrl}">PDF</a>, <a class="download kml" href="{name:this.kmlUrl}">KML</a>, <a class="download geotiff" href="{name:this.geoTiffUrl}">GeoTIFF</a><span class="{owsType:this.showWFS}">, <a class="download shp" href="{name:this.shpUrl}">SHP (ZIP)</a></span></p><p><a href="/data/{name}">' + this.dataDetailText + "</a></p>"),
            ows: this.ows
        });
        new Ext.grid.GridPanel({
            store: this.capabilities,
            plugins: [a],
            columns: [a, {
                header: this.dataTitleHeaderText,
                dataIndex: "title"
            },
            {
                header: this.dataNameHeaderText,
                dataIndex: "name"
            }],
            viewConfig: {
                autoFill: !0
            },
            height: 300,
            renderTo: this.renderTo
        })
    }
});
Ext.namespace("GeoNode");
GeoNode.SearchTable = Ext.extend(Ext.util.Observable, {
    selectHeaderText: "UT: Select",
    nameHeaderText: "UT: Name",
    titleHeaderText: "UT: Title",
    selectText: "UT: Select:",
    selectAllText: "UT: All",
    selectNoneText: "UT: None",
    previousText: "UT: Prev",
    nextText: "UT: Next",
    ofText: "UT: of",
    noResultsText: "UT: Your search did not match any items.",
    searchLabelText: "UT: Search Data",
    searchButtonText: "UT: Search",
    showingText: "UT: Showing",
    loadingText: "UT: Loading",
    permalinkText: "UT: permalink",
    unviewableTooltip: "UT: Unviewable Data",
    remoteTooltip: "UT: Remote Data",
    searchOnLoad: !0,
    linkableTitle: !0,
    constructor: function(a) {
        this.addEvents("load");
        Ext.apply(this, a);
        this.initFromQuery();
        this.loadData()
    },
    loadData: function() {
        this.searchStore = new Ext.data.JsonStore({
            url: this.searchURL,
            root: "rows",
            idProperty: "uuid",
            remoteSort: !0,
            totalProperty: "total",
            fields: [{
                name: "name",
                type: "string"
            },
            {
                name: "title",
                type: "string"
            },
            {
                name: "uuid",
                type: "string"
            },
            {
                name: "abstract",
                type: "string"
            },
            {
                name: "keywords"
            },
            {
                name: "detail",
                type: "string"
            },
            {
                name: "attribution"
            },
            {
                name: "download_links"
            },
            {
                name: "metadata_links"
            },
            {
                name: "bbox"
            },
            {
                name: "_local"
            },
            {
                name: "_permissions"
            }]
        });
        this.searchStore.on("load",
        function() {
            this.updateControls();
            this.dataCart && this.dataCart.reselect();
            this.fireEvent("load", this)
        },
        this);
        this.doLayout();
        this.searchOnLoad && this.doSearch()
    },
    initFromQuery: function() {
        if (!this.searchParams) this.searchParams = {};
        if (!this.searchParams.start) this.searchParams.start = 0;
        if (!this.searchParams.limit) this.searchParams.limit = 25;
        if (this.constraints) for (var a = 0; a < this.constraints.length; a++) this.constraints[a].initFromQuery(this, this.searchParams)
    },
    doSearch: function() {
        this.searchParams.start = 0;
        if (this.constraints) for (var a = 0; a < this.constraints.length; a++) this.constraints[a].applyConstraint(this.searchParams);
        this._search(this.searchParams)
    },
    _search: function(a) {
        this.disableControls();
        this.searchStore.load({
            params: a
        });
        this.updatePermalink(a)
    },
    loadNextBatch: function() {
        this.searchParams.start += this.searchParams.limit;
        this._search(this.searchParams)
    },
    loadPrevBatch: function() {
        this.searchParams.start -= this.searchParams.limit;
        if (0 > this.searchParams.start) this.searchParams.start = 0;
        this._search(this.searchParams)
    },
    disableControls: function() {
        this.nextButton.setDisabled(!0);
        this.prevButton.setDisabled(!0);
        this.pagerLabel.setText(this.loadingText)
    },
    updateControls: function() {
        var a = this.searchStore.getTotalCount();
        0 < this.searchParams.start ? this.prevButton.setDisabled(!1) : this.prevButton.setDisabled(!0);
        this.searchParams.start + this.searchParams.limit < a ? this.nextButton.setDisabled(!1) : this.nextButton.setDisabled(!0);
        var b = this.searchParams.start + 1,
        c = b + this.searchParams.limit - 1;
        b > a && (b = a);
        c > a && (c = a);
        this.pagerLabel.setText(this.showingText + " " + b + "-" + c + " " + this.ofText + " " + a)
    },
    updatePermalink: function() {
        if (this.permalink) this.permalink.href = Ext.urlAppend(this.permalinkURL, Ext.urlEncode(this.searchParams))
    },
    updateQuery: function() {
        this.searchParams.q = this.queryInput.getValue();
        this.doSearch()
    },
    hookupSearchButtons: function(a) {
        for (var a = Ext.get(a).query(".search-button"), b = 0; b < a.length; b++) {
            var c = a[b].innerHTML || this.searchButtonText;
            Ext.get(a[b]).update(""); (new Ext.Button({
                text: c,
                renderTo: a[b]
            })).on("click", this.doSearch, this)
        }
    },
    doLayout: function() {
        var a = Ext.get(this.renderTo);
        a.update('<div class="search-results"><div class="search-input"></div><div class="search-table"></div><div class="search-controls"></div></div>');
        var b = a.query(".search-input")[0],
        c = a.query(".search-table")[0],
        a = a.query(".search-controls")[0],
        d = new GeoNode.SearchTableRowExpander({
            fetchURL: this.layerDetailURL
        });
        tableCfg = {
            store: this.searchStore,
            plugins: [d],
            autoExpandColumn: "title",
            viewConfig: {
                autoFill: !0,
                forceFit: !0,
                emptyText: this.noResultsText
            },
            autoHeight: !0,
            renderTo: c
        };
        var f = this.unviewableTooltip,
        e = this.remoteTooltip,
        c = [d, {
            header: this.titleHeaderText,
            dataIndex: "title",
            id: "title",
            sortable: !0,
            renderer: function(a, b, c) {
                var b = c.get("_local"),
                d = c.get("detail");
                b && !0 != c.get("_permissions").view && (d = "");
                return d ? '<a href="' + d + '">' + a + "</a>": a
            }
        },
        {
            dataIndex: "_local",
            id: "layer_info",
            width: 6,
            resizable: !1,
            renderer: function(a, b, c) {
                b = a = "";
                c.get("_local") ? !0 != c.get("_permissions").view ? (detail = "", a = "unviewable-layer", b = f) : a = "info-layer": (a = "remote-layer", b = e);
                return info = '<span class="' + a + '" title="' + b + '"></span>'
            }
        }];
        if (!0 == this.trackSelection) sm = new Ext.grid.CheckboxSelectionModel({
            checkOnly: !0,
            renderer: function(a, b, c) {
                return ! 0 != c.get("_permissions").view ? "<div>&#160;</div>": '<div class="x-grid3-row-checker">&#160;</div>'
            },
            listeners: {
                beforerowselect: function(a, b, c, d) {
                    if (!0 != d.get("_permissions").view) return ! 1
                }
            }
        }),
        this.dataCart = new GeoNode.DataCartStore({
            selModel: sm
        }),
        c.push(sm),
        tableCfg.selModel = sm;
        c = new Ext.grid.ColumnModel({
            defaults: {
                sortable: !1,
                menuDisabled: !0
            },
            columns: c
        });
        tableCfg.colModel = c;
        this.table = new Ext.grid.GridPanel(tableCfg);
        this.queryInput = new Ext.form.TextField({
            fieldLabel: this.searchLabelText,
            name: "search",
            allowBlank: !0,
            width: 350
        });
        this.queryInput.on("specialkey",
        function(a, b) {
            b.getKey() == b.ENTER && this.updateQuery()
        },
        this);
        c = new Ext.Button({
            text: this.searchButtonText
        });
        c.on("click", this.updateQuery, this); (new Ext.Panel({
            frame: !1,
            border: !1,
            layout: new Ext.layout.HBoxLayout({
                defaultMargins: {
                    top: 10,
                    bottom: 10,
                    left: 0,
                    right: 10
                }
            }),
            items: [this.queryInput, c]
        })).render(b);
        this.prevButton = new Ext.Button({
            text: this.previousText
        });
        this.prevButton.on("click", this.loadPrevBatch, this);
        this.nextButton = new Ext.Button({
            text: this.nextText
        });
        this.nextButton.on("click", this.loadNextBatch, this);
        this.pagerLabel = new Ext.form.Label({
            text: ""
        }); (new Ext.Panel({
            frame: !1,
            border: !1,
            layout: new Ext.layout.HBoxLayout({
                defaultMargins: {
                    top: 10,
                    bottom: 10,
                    left: 0,
                    right: 10
                }
            }),
            items: [this.prevButton, this.nextButton, this.pagerLabel]
        })).render(a);
        this.permalink = Ext.query("a.permalink")[0];
        this.disableControls();
        this.searchParams.q && this.queryInput.setValue(this.searchParams.q);
        this.updatePermalink()
    }
});
Ext.namespace("GeoNode");
GeoNode.MapSearchTable = Ext.extend(Ext.util.Observable, {
    autoExpandColumn: "title",
    titleHeaderText: "UT: Title",
    contactHeaderText: "UT: Contact",
    lastModifiedHeaderText: "UT: Last Modified",
    mapAbstractLabelText: "UT: Abstract",
    mapLinkLabelText: "UT:View this Map",
    previousText: "UT: Prev",
    nextText: "UT: Next",
    ofText: "UT: of",
    noResultsText: "UT: Your search did not match any items.",
    searchLabelText: "UT: Search Maps",
    searchButtonText: "UT: Search",
    showingText: "UT: Showing",
    loadingText: "UT: Loading",
    permalinkText: "UT: permalink",
    constructor: function(a) {
        this.addEvents("load");
        Ext.apply(this, a);
        this.initFromQuery();
        this.loadData()
    },
    loadData: function() {
        this.searchStore = new Ext.data.JsonStore({
            url: this.searchURL,
            root: "rows",
            idProperty: "name",
            remoteSort: !0,
            totalProperty: "total",
            fields: [{
                name: "id",
                mapping: "id"
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
                name: "detail",
                type: "string"
            },
            {
                name: "owner",
                type: "string"
            },
            {
                name: "owner_detail",
                type: "string"
            },
            {
                name: "last_modified",
                type: "string"
            }]
        });
        this.searchStore.on("load",
        function() {
            this.updateControls();
            this.fireEvent("load", this)
        },
        this);
        this.doLayout();
        this.doSearch()
    },
    initFromQuery: function() {
        if (!this.searchParams) this.searchParams = {};
        if (!this.searchParams.start) this.searchParams.start = 0;
        if (!this.searchParams.limit) this.searchParams.limit = 25;
        if (this.constraints) for (var a = 0; a < this.constraints.length; a++) this.constraints[a].initFromQuery(this, this.searchParams)
    },
    doSearch: function() {
        this.searchParams.start = 0;
        if (this.constraints) for (var a = 0; a < this.constraints.length; a++) this.constraints[a].applyConstraint(this.searchParams);
        this._search(this.searchParams)
    },
    _search: function(a) {
        this.disableControls();
        this.searchStore.load({
            params: a
        });
        this.updatePermalink(a)
    },
    loadNextBatch: function() {
        this.searchParams.start += this.searchParams.limit;
        this._search(this.searchParams)
    },
    loadPrevBatch: function() {
        this.searchParams.start -= this.searchParams.limit;
        if (0 > this.searchParams.start) this.searchParams.start = 0;
        this._search(this.searchParams)
    },
    disableControls: function() {
        this.nextButton.setDisabled(!0);
        this.prevButton.setDisabled(!0);
        this.pagerLabel.setText(this.loadingText)
    },
    updateControls: function() {
        var a = this.searchStore.getTotalCount();
        0 < this.searchParams.start ? this.prevButton.setDisabled(!1) : this.prevButton.setDisabled(!0);
        this.searchParams.start + this.searchParams.limit < a ? this.nextButton.setDisabled(!1) : this.nextButton.setDisabled(!0);
        var b = this.searchParams.start + 1,
        c = b + this.searchParams.limit - 1;
        c > a && (c = a);
        this.pagerLabel.setText(this.showingText + " " + b + "-" + c + " " + this.ofText + " " + a)
    },
    updatePermalink: function() {
        if (this.permalink) this.permalink.href = Ext.urlAppend(this.permalinkURL, Ext.urlEncode(this.searchParams))
    },
    updateQuery: function() {
        this.searchParams.q = this.queryInput.getValue();
        this.doSearch()
    },
    hookupSearchButtons: function(a) {
        for (var a = Ext.get(a).query(".search-button"), b = 0; b < a.length; b++) {
            var c = a[b].innerHTML || this.searchButtonText;
            Ext.get(a[b]).update(""); (new Ext.Button({
                text: c,
                renderTo: a[b]
            })).on("click", this.doSearch, this)
        }
    },
    doLayout: function() {
        var a = Ext.get(this.renderTo);
        a.update('<div class="search-results"><div class="search-input"></div><div class="search-table"></div><div class="search-controls"></div></div>');
        var b = a.query(".search-input")[0],
        c = a.query(".search-table")[0],
        a = a.query(".search-controls")[0],
        d = new GeoNode.MapSearchTableRowExpander({
            fetchURL: this.mapDetailURL
        });
        tableCfg = {
            store: this.searchStore,
            plugins: [d],
            autoExpandColumn: "title",
            viewConfig: {
                autoFill: !0,
                forceFit: !0,
                emptyText: this.noResultsText,
                listeners: {
                    refresh: function(a) {
                        Ext.select("a", Ext.get(a.mainBody)).on("click",
                        function(a) {
                            a.stopPropagation()
                        })
                    },
                    rowsinserted: function(a, b, c) {
                        for (; b < c; b++) Ext.select("a", Ext.get(a.getRow(b))).on("click",
                        function(a) {
                            a.stopPropagation()
                        })
                    },
                    rowupdated: function(a, b) {
                        Ext.select("a", Ext.get(a.getRow(b))).on("click",
                        function(a) {
                            a.stopPropagation()
                        })
                    }
                }
            },
            autoHeight: !0,
            renderTo: c,
            listeners: {
                rowdblclick: function(a, b) {
                    var c = a.store.getAt(b);
                    if (null != c) location.href = c.get("detail")
                },
                rowclick: function(a, b) {
                    d.toggleRow(b)
                },
                beforerender: function(a) {
                    a.on("render",
                    function() {
                        a.getView().mainBody.un("mousedown", d.onMouseDown, d)
                    })
                }
            }
        };
        c = new Ext.grid.ColumnModel({
            defaults: {
                menuDisabled: !0,
                sortable: !0
            },
            columns: [d, {
                header: this.titleHeaderText,
                dataIndex: "title",
                id: "title",
                renderer: function(a, b, c) {
                    return (b = c.get("detail")) ? '<a href="' + b + '">' + a + "</a>": a
                }
            },
            {
                header: this.contactHeaderText,
                dataIndex: "owner",
                id: "owner",
                renderer: function(a, b, c) {
                    return (b = c.get("owner_detail")) ? '<a href="' + b + '">' + a + "</a>": a
                }
            },
            {
                header: this.lastModifiedHeaderText,
                dataIndex: "last_modified",
                id: "last_modified",
                renderer: function(a) {
                    dt = Date.parseDate(a, "c");
                    return dt.format("F j, Y")
                }
            }]
        });
        tableCfg.colModel = c;
        this.table = new Ext.grid.GridPanel(tableCfg);
        this.queryInput = new Ext.form.TextField({
            fieldLabel: this.searchLabelText,
            name: "search",
            allowBlank: !0,
            width: 350
        });
        this.queryInput.on("specialkey",
        function(a, b) {
            b.getKey() == b.ENTER && this.updateQuery()
        },
        this);
        c = new Ext.Button({
            text: this.searchButtonText
        });
        c.on("click", this.updateQuery, this); (new Ext.Panel({
            frame: !1,
            border: !1,
            layout: new Ext.layout.HBoxLayout({
                defaultMargins: {
                    top: 10,
                    bottom: 10,
                    left: 0,
                    right: 10
                }
            }),
            items: [this.queryInput, c]
        })).render(b);
        this.prevButton = new Ext.Button({
            text: this.previousText
        });
        this.prevButton.on("click", this.loadPrevBatch, this);
        this.nextButton = new Ext.Button({
            text: this.nextText
        });
        this.nextButton.on("click", this.loadNextBatch, this);
        this.pagerLabel = new Ext.form.Label({
            text: ""
        }); (new Ext.Panel({
            frame: !1,
            border: !1,
            layout: new Ext.layout.HBoxLayout({
                defaultMargins: {
                    top: 10,
                    bottom: 10,
                    left: 0,
                    right: 10
                }
            }),
            items: [this.prevButton, this.nextButton, this.pagerLabel]
        })).render(a);
        this.permalink = Ext.query("a.permalink")[0];
        this.disableControls();
        this.searchParams.q && this.queryInput.setValue(this.searchParams.q);
        this.updatePermalink()
    }
});
Ext.namespace("GeoNode");
GeoNode.UserEmailSelector = Ext.extend(Ext.util.Observable, {
    constructor: function(a) {
        Ext.apply(this, a);
        this.initUserStore();
        this.panel = this.doLayout()
    },
    initUserStore: function() {
        if (!this.userstore) {
            var a = {
                proxy: new Ext.data.HttpProxy({
                    url: this.userLookup,
                    method: "POST"
                }),
                reader: new Ext.data.JsonReader({
                    root: "users",
                    totalProperty: "count",
                    fields: [{
                        name: "email"
                    },
                    {
                        name: "user"
                    }]
                })
            };
            Ext.apply(a, this.availableUserConfig || {});
            this.userstore = new Ext.data.Store(a);
            this.userstore.load({
                params: {
                    query: ""
                }
            })
        }
        if (!this.store) this.store = new Ext.data.ArrayStore({
            idIndex: 0,
            fields: ["email", "user"],
            data: []
        })
    },
    doLayout: function() {
        function a() {
            var a = this.availableUsers.getValue(),
            b = this.availableUsers.getValue(),
            c = this.userstore.findExact("email", a); - 1 < c && (b = this.userstore.getAt(c).get("user")); - 1 == this.selectedUsers.store.findExact("email", a) && this.selectedUsers.store.add(new(Ext.data.Record.create(["email", "user"]))({
                email: a,
                user: b
            }))
        }
        var b = this.owner,
        c = function() {
            function a() {
                e.getEl().on("mousedown", c, this, {
                    delegate: "button"
                })
            }
            function c(a, d) {
                var f = e.findItemFromChild(d),
                g = e.indexOf(f);
                e.store.getAt(g).get("email") !== b && e.store.removeAt(e.indexOf(f))
            }
            var e;
            return {
                init: function(b) {
                    e = b;
                    e.on("render", a)
                }
            }
        } ();
        this.selectedUsers = new Ext.DataView({
            store: this.store,
            itemSelector: "div.user_item",
            tpl: new Ext.XTemplate('<div><tpl for="."> <div class="x-btn user_item"><button class="icon-removeuser remove-button">&nbsp;</button>{user}</div></tpl></div>'),
            plugins: [c],
            autoHeight: !0,
            multiSelect: !0
        });
        this.addButton = new Ext.Button({
            iconCls: "icon-adduser",
            handler: a,
            scope: this
        });
        this.availableUsers = new Ext.form.ComboBox({
            width: 180,
            store: this.userstore,
            typeAhead: !0,
            minChars: 0,
            align: "right",
            border: "false",
            displayField: "user",
            valueField: "email",
            emptyText: gettext("Add user..."),
            listeners: {
                scope: this,
                select: a
            }
        });
        return new Ext.Panel({
            border: !1,
            renderTo: this.renderTo,
            items: [this.selectedUsers, {
                layout: "hbox",
                border: !1,
                items: [this.addButton, this.availableUsers]
            }]
        })
    },
    setDisabled: function(a) {
        this.selectedUsers.setDisabled(a);
        this.availableUsers.setDisabled(a);
        this.addButton.setDisabled(a)
    }
});
Ext.namespace("GeoNode");
GeoNode.WorldMapPermissionsEditor = Ext.extend(Ext.util.Observable, {
    viewMode: "EDITORS",
    customGroup: "",
    editMode: "LIST",
    editors: null,
    editorChooser: null,
    managers: null,
    managerChooser: null,
    levels: {
        admin: "layer_admin",
        readwrite: "layer_readwrite",
        readonly: "layer_readonly",
        none: "_none"
    },
    constructor: function(a) {
        Ext.apply(this, a);
        this.addEvents({
            updated: !0
        });
        GeoNode.WorldMapPermissionsEditor.superclass.constructor.call(this, a);
        this.initStores();
        this.readPermissions(a.permissions);
        this.doLayout()
    },
    initStores: function() {
        var a = function(a) {
            return function() {
                return a.fireEvent("updated", a)
            }
        } (this);
        this.editors = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "users",
                totalProperty: "count",
                fields: [{
                    name: "email"
                },
                {
                    name: "user"
                }]
            }),
            listeners: {
                add: a,
                remove: a,
                update: a
            }
        });
        this.managers = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "users",
                totalProperty: "count",
                fields: [{
                    name: "email"
                },
                {
                    name: "user"
                }]
            }),
            listeners: {
                add: a,
                remove: a,
                update: a
            }
        })
    },
    buildUserChooser: function(a) {
        var b = {
            owner: this.permissions.owner_email,
            userLookup: this.userLookup
        };
        Ext.apply(b, a);
        return new GeoNode.UserEmailSelector(b)
    },
    buildViewPermissionChooser: function() {
        var a = [{
            xtype: "radio",
            name: "viewmode",
            inputValue: "ANYONE",
            boxLabel: gettext("Anyone")
        },
        {
            xtype: "radio",
            name: "viewmode",
            inputValue: "REGISTERED",
            boxLabel: gettext("Any registered user")
        }];
        this.customGroup && a.push({
            xtype: "radio",
            name: "viewmode",
            inputValue: "CUSTOM",
            boxLabel: this.customGroup
        });
        a.push({
            xtype: "radio",
            name: "viewmode",
            inputValue: "EDITORS",
            boxLabel: gettext("Only users who can edit")
        });
        return new Ext.Panel({
            border: !1,
            items: [{
                html: "<strong>" + gettext("Who can view or download this?") + "</strong>",
                flex: 1,
                border: !1
            },
            {
                xtype: "radiogroup",
                columns: 1,
                value: this.viewMode,
                items: a,
                listeners: {
                    change: function(a, c) {
                        if (null != c) this.viewMode = c.inputValue,
                        this.fireEvent("updated", this)
                    },
                    scope: this
                }
            }]
        })
    },
    buildEditPermissionChooser: function() {
        this.editorChooser = this.buildUserChooser({
            store: this.editors,
            availableUserConfig: {
                listeners: {
                    load: function(a) {
                        a.filterBy(function(a) {
                            return - 1 == this.editors.findExact("email", a.get("email")) && -1 == this.managers.findExact("email", a.get("email"))
                        },
                        this)
                    },
                    scope: this
                }
            }
        });
        this.editorChooser.setDisabled("LIST" !== this.editMode);
        var a = [{
            xtype: "radio",
            name: "editmode",
            inputValue: "REGISTERED",
            boxLabel: gettext("Any registered user")
        }];
        this.customGroup && a.push({
            xtype: "radio",
            name: "editmode",
            inputValue: "CUSTOM",
            boxLabel: this.customGroup
        });
        a.push({
            xtype: "radio",
            name: "editmode",
            inputValue: "LIST",
            boxLabel: gettext("Only users who can edit")
        });
        return new Ext.Panel({
            border: !1,
            items: [{
                html: "<strong>" + gettext("Who can edit this?") + "</strong>",
                flex: 1,
                border: !1
            },
            {
                xtype: "radiogroup",
                columns: 1,
                value: this.editMode,
                items: a,
                listeners: {
                    change: function(a, c) {
                        if (null != c) this.editMode = c.inputValue,
                        this.editorChooser.setDisabled("LIST" !== this.editMode),
                        this.fireEvent("updated", this)
                    },
                    scope: this
                }
            },
            this.editorChooser.panel]
        })
    },
    buildManagePermissionChooser: function() {
        this.managerChooser = this.buildUserChooser({
            store: this.managers,
            availableUserConfig: {
                listeners: {
                    load: function(a) {
                        a.filterBy(function(a) {
                            return - 1 == this.editors.findExact("email", a.get("email")) && -1 == this.managers.findExact("email", a.get("email"))
                        },
                        this)
                    },
                    scope: this
                }
            }
        });
        return new Ext.Panel({
            border: !1,
            items: [{
                html: "<strong>" + gettext("Who can manage and edit this?") + "</strong>",
                flex: 1,
                border: !1
            },
            this.managerChooser.panel]
        })
    },
    readPermissions: function(a) {
        this.editors.suspendEvents();
        this.managers.suspendEvents();
        this.editMode = a.authenticated == this.levels.readwrite ? "REGISTERED": a.customgroup == this.levels.readwrite ? "CUSTOM": "LIST";
        if (a.anonymous == this.levels.readonly) this.viewMode = "ANYONE";
        else if (a.authenticated == this.levels.readonly) this.viewMode = "REGISTERED";
        else if (a.customgroup == this.levels.readonly) this.viewMode = "CUSTOM";
        for (var b = 0; b < a.users.length; b++) a.users[b][1] === this.levels.readwrite ? this.editors.add(new this.editors.recordType({
            email: a.users[b][0],
            user: a.names[b][1]
        },
        b + 500)) : a.users[b][1] === this.levels.admin && this.managers.add(new this.managers.recordType({
            email: a.users[b][0],
            user: a.names[b][1]
        },
        b + 500));
        this.editors.resumeEvents();
        this.managers.resumeEvents()
    },
    writePermissions: function() {
        var a, b, c, d;
        a = "ANYONE" === this.viewMode ? this.levels.readonly: this.levels.none;
        "CUSTOM" === this.editMode ? (c = this.levels.readwrite, b = "CUSTOM" === this.viewMode ? this.levels.none: "REGISTERED" === this.viewMode ? this.levels.readonly: this.levels.none) : "CUSTOM" === this.viewMode ? (c = this.levels.readonly, b = this.levels.none) : c = "REGISTERED" === this.editMode ? b = this.levels.readwrite: "REGISTERED" === this.viewMode ? b = this.levels.readonly: b = this.levels.none;
        d = [];
        "LIST" === this.editMode && this.editors.each(function(a) {
            d.push([a.get("email"), this.levels.readwrite])
        },
        this);
        this.managers.each(function(a) {
            d.push([a.get("email"), this.levels.admin])
        },
        this);
        return {
            anonymous: a,
            authenticated: b,
            customgroup: c,
            users: d
        }
    },
    doLayout: function() {
        this.container = new Ext.Panel({
            renderTo: this.renderTo,
            border: !1,
            items: [this.buildViewPermissionChooser(), this.buildEditPermissionChooser(), this.buildManagePermissionChooser()]
        })
    }
});
Lang = {
    registerLinks: function() {
        var a = {
            "#spanish": "es",
            "#english": "en"
        },
        b;
        for (b in a) {
            var c = Ext.DomQuery.selectNode(b);
            if (c) c.onclick = function(a) {
                return function() { (new Ext.state.CookieProvider).set("locale", a);
                    window.location.reload();
                    return ! 1
                }
            } (a[b])
        }
    }
};
Ext.onReady(Lang.registerLinks);
Ext.namespace("GeoNode");
GeoNode.BatchDownloadWidget = Ext.extend(Ext.util.Observable, {
    downloadingText: "UT: Downloading...",
    cancelText: "UT: Cancel",
    windowMessageText: "UT: Please wait",
    constructor: function(a) {
        Ext.apply(this, a);
        this.beginDownload()
    },
    beginDownload: function() {
        var a = this;
        Ext.Ajax.request({
            url: this.begin_download_url,
            method: "POST",
            params: {
                layer: this.layers,
                format: this.format
            },
            success: function(b) {
                b = Ext.util.JSON.decode(b.responseText);
                a.monitorDownload(b.id)
            }
        })
    },
    monitorDownload: function(a) {
        var b, c = this,
        d = new Ext.ProgressBar({
            text: this.downloadingText
        }),
        f = function() {
            Ext.Ajax.request({
                url: c.stop_download_url + a,
                method: "GET",
                success: function() {
                    clearInterval(b)
                },
                failure: function() {
                    clearInterval(b)
                }
            })
        },
        e = new Ext.Window({
            width: 250,
            height: 100,
            plain: !0,
            modal: !0,
            closable: !1,
            hideBorders: !0,
            items: [d],
            buttons: [{
                text: this.cancelText,
                handler: function() {
                    f();
                    e.hide()
                }
            }]
        });
        b = setInterval(function() {
            Ext.Ajax.request({
                url: c.begin_download_url + "?id=" + a,
                method: "GET",
                success: function(f) {
                    f = Ext.util.JSON.decode(f.responseText);
                    "FINISHED" === f.process.status ? (clearInterval(b), d.updateProgress(1, "Done....", !0), e.close(), location.href = c.download_url + a) : d.updateProgress(f.process.progress / 100, c.downloadingText, !0)
                },
                failure: function() {
                    clearInterval(b);
                    e.close()
                }
            })
        },
        1E3);
        e.show()
    }
});
Ext.namespace("GeoNode");
GeoNode.BoundingBoxWidget = Ext.extend(Ext.util.Observable, {
    viewerConfig: null,
    height: 300,
    isEnabled: !1,
    useGxpViewer: !1,
    constructor: function(a) {
        Ext.apply(this, a);
        this.doLayout()
    },
    doLayout: function() {
        var a = Ext.get(this.renderTo);
        this.enabledCB = a.query(".bbox-enabled input")[0];
        a = {
            proxy: this.proxy,
            useCapabilities: !1,
            useBackgroundCapabilities: !1,
            useToolbar: !1,
            useMapOverlay: !1,
            portalConfig: {
                collapsed: !0,
                border: !1,
                height: this.height,
                renderTo: a.query(".bbox-expand")[0]
            },
            listeners: {
                ready: function() {
                    this._ready = !0;
                    this.isEnabled && this.enable()
                },
                scope: this
            }
        };
        a = Ext.apply(a, this.viewerConfig);
        this.useGxpViewer ? (a.mapItems = [{
            xtype: "gx_zoomslider",
            vertical: !0,
            height: 100
        }], this.viewer = new gxp.Viewer(a)) : this.viewer = new GeoExplorer.Viewer(a);
        this.isEnabled || this.disable();
        Ext.get(this.enabledCB).on("click",
        function() { ! 0 == this.enabledCB.checked ? this.enable() : this.disable()
        },
        this)
    },
    updateBBox: function(a) {
        a && null != a && this.viewer.mapPanel.map.zoomToExtent(a)
    },
    isActive: function() {
        return ! 0 == this.enabledCB.checked
    },
    hasConstraint: function() {
        return this.isActive()
    },
    applyConstraint: function(a) {
        if (this.hasConstraint()) {
            var b = this.viewer.mapPanel.map.getExtent();
            b.transform(new OpenLayers.Projection(this.viewerConfig.map.projection), new OpenLayers.Projection("EPSG:4326"));
            a.bbox = b.toBBOX()
        } else this._ready && delete a.bbox
    },
    initFromQuery: function(a, b) {
        if (b.bbox) {
            var c = OpenLayers.Bounds.fromString(b.bbox);
            if (c) {
                c.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection(this.viewerConfig.map.projection));
                var d = function() {
                    var a = this.viewer.mapPanel.map;
                    a.events.register("moveend", this,
                    function() {
                        a.events.unregister("moveend", this, arguments.callee);
                        a.zoomToExtent(c, !0)
                    });
                    this.enable()
                };
                if (this._ready) d.call(this);
                else this.viewer.on("ready", d, this)
            }
        }
    },
    enable: function() {
        this.enabledCB.checked = !0;
        this.viewer.portal && this.viewer.portal.expand()
    },
    disable: function() {
        this.enabledCB.checked = !1;
        this.viewer.portal && this.viewer.portal.collapse()
    }
});
Ext.namespace("GeoNode");
GeoNode.DataCart = Ext.extend(Ext.util.Observable, {
    selectedLayersText: "UT: Selected Layers",
    emptySelectionText: "UT: No Layers Selected",
    titleText: "UT: Title",
    clearSelectedButtonText: "UT: Clear Selected",
    clearAllButtonText: "UT: Clear All",
    addLayersButtonText: "UT: Add Layers",
    addToMapButtonFunction: null,
    addToMapButtonTarget: null,
    constructor: function(a) {
        Ext.apply(this, a);
        this.doLayout()
    },
    getSelectedLayerIds: function() {
        var a = [];
        this.grid.selModel.each(function(b) {
            a.push(b.get("name"))
        });
        return a
    },
    doLayout: function() {
        var a = Ext.get(this.renderTo);
        a.update('<div class="selection-table"></div><div class="selection-controls"></div><div class="selection-ops></div>"');
        var b = a.query(".selection-controls")[0],
        c = a.query(".selection-table")[0];
        a.query(".selection-ops");
        sm = new Ext.grid.CheckboxSelectionModel({});
        this.grid = new Ext.grid.GridPanel({
            store: this.store,
            viewConfig: {
                autoFill: !0,
                forceFit: !0,
                emptyText: this.emptySelectionText,
                deferEmptyText: !1
            },
            height: 100,
            renderTo: c,
            selModel: sm,
            hideHeaders: !0,
            colModel: new Ext.grid.ColumnModel({
                defaults: {
                    sortable: !1,
                    menuDisabled: !0
                },
                columns: [sm, {
                    dataIndex: "title"
                }]
            })
        });
        this.store.on("add",
        function(a, b, c) {
            sm.selectRow(c, !0)
        });
        var a = new Ext.Button({
            text: this.addLayersButtonText,
            iconCls: "icon-add",
            cls: "x-btn-link-medium x-btn-text"
        }),
        d = function() {
            this.store.removeAll();
            this.store.reselect()
        };
        if (this.addToMapButtonFunction) {
            var f = this.addToMapButtonFunction,
            e = this.addToMapButtonTarget,
            i = this.grid,
            j = this;
            a.on("click",
            function() {
                f.call(e, i.getSelectionModel().getSelections());
                d.call(j)
            })
        }
        c = new Ext.Button({
            text: this.clearSelectedButtonText
        });
        c.on("click",
        function() {
            sm.each(function(a) {
                a = this.store.indexOfId(a.id);
                0 <= a && this.store.removeAt(a)
            },
            this);
            this.store.reselect()
        },
        this);
        var h = new Ext.Button({
            text: this.clearAllButtonText
        });
        h.on("click", d, this);
        new Ext.Spacer({
            width: 20
        });
        c = new Ext.Panel({
            frame: !1,
            border: !1,
            layout: new Ext.layout.HBoxLayout({
                defaultMargins: {
                    top: 10,
                    bottom: 10,
                    left: 0,
                    right: 0
                }
            }),
            items: [c, h]
        });
        this.addToMapButtonFunction && c.items.insert(0, a);
        c.render(b)
    }
});
Ext.namespace("GeoNode");
GeoNode.DataCartOps = Ext.extend(Ext.util.Observable, {
    failureText: "UT: Operation Failed",
    noLayersText: "UT: No layers are currently selected.",
    constructor: function(a) {
        Ext.apply(this, a);
        this.doLayout()
    },
    doLayout: function() {
        var a = Ext.get(this.renderTo),
        b = Ext.get(a.query("a.create-map")[0]);
        this.createMapForm = Ext.get(a.query("#create_map_form")[0]);
        b.on("click",
        function(a) {
            a.preventDefault(); (a = this.cart.getSelectedLayerIds()) && a.length ? this.createNewMap(a) : Ext.MessageBox.alert(this.failureText, this.noLayersText)
        },
        this);
        batch_links = a.query("a.batch-download");
        for (a = 0; a < batch_links.length; a++) Ext.get(batch_links[a]).on("click",
        function(a, b) {
            a.preventDefault();
            var f = this.cart.getSelectedLayerIds();
            if (f && f.length) {
                var e = Ext.get(b).getAttribute("href").substr(1);
                this.batchDownload(f, e)
            } else Ext.MessageBox.alert(this.failureText, this.noLayersText)
        },
        this)
    },
    createNewMap: function(a) {
        for (var b = [], c = 0; c < a.length; c++) b.push({
            tag: "input",
            type: "hidden",
            name: "layer",
            value: a[c]
        });
        b.push({
            tag: "input",
            type: "hidden",
            name: "csrfmiddlewaretoken",
            value: Ext.util.Cookies.get("csrftoken")
        });
        Ext.DomHelper.overwrite(this.createMapForm, {
            tag: "div",
            cn: b
        });
        this.createMapForm.dom.submit()
    },
    batchDownload: function(a, b) {
        new GeoNode.BatchDownloadWidget({
            layers: a,
            format: b,
            begin_download_url: this.begin_download_url,
            stop_download_url: this.stop_download_url,
            download_url: this.download_url
        })
    }
});
Ext.namespace("GeoNode");
GeoNode.DataCartStore = Ext.extend(Ext.data.Store, {
    constructor: function(a) {
        this.selModel = a.selModel;
        this.reselecting = !1;
        this.selModel.on("rowselect",
        function(a, c, d) { ! 0 != this.reselecting && -1 == this.indexOfId(d.id) && this.add([d])
        },
        this);
        this.selModel.on("rowdeselect",
        function(a, c, d) { ! 0 != this.reselecting && (c = this.indexOfId(d.id), -1 != c && this.removeAt(c))
        },
        this);
        GeoNode.DataCartStore.superclass.constructor.call(this, a)
    },
    reselect: function() {
        this.reselecting = !0;
        this.selModel.clearSelections();
        var a = this.selModel.grid.store;
        this.each(function(b) {
            b = a.indexOfId(b.id); - 1 != b && this.selModel.selectRow(b, !0);
            return ! 0
        },
        this);
        this.reselecting = !1
    }
});
Ext.namespace("GeoNode");
GeoNode.MapSearchTableRowExpander = Ext.extend(Ext.grid.RowExpander, {
    errorText: "UT: Unable to fetch map details.",
    loadingText: "UT: Loading...",
    constructor: function(a) {
        this.fetchURL = a.fetchURL;
        GeoNode.SearchTableRowExpander.superclass.constructor.call(this, a)
    },
    getRowClass: function(a, b, c) {
        c.cols -= 1;
        return this.state[a.id] ? "x-grid3-row-expanded": "x-grid3-row-collapsed"
    },
    fetchBodyContent: function(a, b, c) {
        this.enableCaching || this._fetchBodyContent(a, b, c);
        var d = this.bodyContent[b.id];
        d ? a.innerHTML = d: this._fetchBodyContent(a, b, c)
    },
    _fetchBodyContent: function(a, b) {
        a.innerHTML = this.loadingText;
        var c = this.fetchURL + "?mapid=" + b.get("id"),
        d = this;
        Ext.Ajax.request({
            url: c,
            method: "GET",
            success: function(c) {
                c = c.responseText;
                a.innerHTML = c;
                d.bodyContent[b.id] = c
            },
            failure: function() {
                a.innerHTML = d.errorText
            }
        })
    },
    beforeExpand: function(a, b, c) {
        return ! 1 !== this.fireEvent("beforeexpand", this, a, b, c) ? (this.fetchBodyContent(b, a, c), !0) : !1
    }
});
Ext.namespace("GeoNode");
GeoNode.PermissionsEditor = Ext.extend(Ext.util.Observable, {
    viewMode: "EDITORS",
    editMode: "LIST",
    editors: null,
    editorChooser: null,
    managers: null,
    managerChooser: null,
    levels: {
        admin: "layer_admin",
        readwrite: "layer_readwrite",
        readonly: "layer_readonly",
        none: "_none"
    },
    constructor: function(a) {
        Ext.apply(this, a);
        this.addEvents({
            updated: !0
        });
        GeoNode.PermissionsEditor.superclass.constructor.call(this, a);
        this.initStores();
        this.readPermissions(a.permissions);
        this.doLayout()
    },
    initStores: function() {
        var a = function(a) {
            return function() {
                return a.fireEvent("updated", a)
            }
        } (this);
        this.editors = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "users",
                totalProperty: "count",
                fields: [{
                    name: "username"
                }]
            }),
            listeners: {
                add: a,
                remove: a,
                update: a
            }
        });
        this.managers = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "users",
                totalProperty: "count",
                fields: [{
                    name: "username"
                }]
            }),
            listeners: {
                add: a,
                remove: a,
                update: a
            }
        })
    },
    buildUserChooser: function(a) {
        var b = {
            owner: this.permissions.owner,
            userLookup: this.userLookup
        };
        Ext.apply(b, a);
        return new GeoNode.UserSelector(b)
    },
    buildViewPermissionChooser: function() {
        return new Ext.Panel({
            border: !1,
            items: [{
                html: "<strong>" + gettext("Who can view and download this data?") + "</strong>",
                flex: 1,
                border: !1
            },
            {
                xtype: "radiogroup",
                columns: 1,
                value: this.viewMode,
                items: [{
                    xtype: "radio",
                    name: "viewmode",
                    inputValue: "ANYONE",
                    boxLabel: gettext("Anyone")
                },
                {
                    xtype: "radio",
                    name: "viewmode",
                    inputValue: "REGISTERED",
                    boxLabel: gettext("Any registered user")
                },
                {
                    xtype: "radio",
                    name: "viewmode",
                    inputValue: "EDITORS",
                    boxLabel: gettext("Only users who can edit")
                }],
                listeners: {
                    change: function(a, b) {
                        this.viewMode = b.inputValue;
                        this.fireEvent("updated", this)
                    },
                    scope: this
                }
            }]
        })
    },
    buildEditPermissionChooser: function() {
        this.editorChooser = this.buildUserChooser({
            store: this.editors,
            availableUserConfig: {
                listeners: {
                    load: function(a) {
                        a.filterBy(function(a) {
                            return - 1 == this.editors.findExact("username", a.get("username")) && -1 == this.managers.findExact("username", a.get("username"))
                        },
                        this)
                    },
                    scope: this
                }
            }
        });
        this.editorChooser.setDisabled("LIST" !== this.editMode);
        return new Ext.Panel({
            border: !1,
            items: [{
                html: "<strong>" + gettext("Who can edit this data?") + "</strong>",
                flex: 1,
                border: !1
            },
            {
                xtype: "radiogroup",
                columns: 1,
                value: this.editMode,
                items: [{
                    xtype: "radio",
                    name: "editmode",
                    inputValue: "REGISTERED",
                    boxLabel: gettext("Any registered user")
                },
                {
                    xtype: "radio",
                    name: "editmode",
                    inputValue: "LIST",
                    boxLabel: gettext("Only the following users or groups:")
                }],
                listeners: {
                    change: function(a, b) {
                        this.editMode = b.inputValue;
                        this.editorChooser.setDisabled("LIST" !== this.editMode);
                        this.fireEvent("updated", this)
                    },
                    scope: this
                }
            },
            this.editorChooser.panel]
        })
    },
    buildManagePermissionChooser: function() {
        this.managerChooser = this.buildUserChooser({
            store: this.managers,
            availableUserConfig: {
                listeners: {
                    load: function(a) {
                        a.filterBy(function(a) {
                            return - 1 == this.editors.findExact("username", a.get("username")) && -1 == this.managers.findExact("username", a.get("username"))
                        },
                        this)
                    },
                    scope: this
                }
            }
        });
        return new Ext.Panel({
            border: !1,
            items: [{
                html: "<strong>" + gettext("Who can manage and edit this data?") + "</strong>",
                flex: 1,
                border: !1
            },
            this.managerChooser.panel]
        })
    },
    readPermissions: function(a) {
        this.editors.suspendEvents();
        this.managers.suspendEvents();
        if (a.authenticated == this.levels.readwrite) this.editMode = "REGISTERED";
        else if (a.authenticated == this.levels.readonly) this.viewMode = "REGISTERED";
        if (a.anonymous == this.levels.readonly) this.viewMode = "ANYONE";
        for (var b = 0; b < a.users.length; b++) a.users[b][1] === this.levels.readwrite ? this.editors.add(new this.editors.recordType({
            username: a.users[b][0]
        },
        b + 500)) : a.users[b][1] === this.levels.admin && this.managers.add(new this.managers.recordType({
            username: a.users[b][0]
        },
        b + 500));
        this.editors.resumeEvents();
        this.managers.resumeEvents()
    },
    writePermissions: function() {
        var a, b, c;
        a = "ANYONE" === this.viewMode ? this.levels.readonly: this.levels._none;
        b = "REGISTERED" === this.editMode ? this.levels.readwrite: "REGISTERED" === this.viewMode ? this.levels.readonly: this.levels._none;
        c = [];
        "LIST" === this.editMode && this.editors.each(function(a) {
            c.push([a.get("username"), this.levels.readwrite])
        },
        this);
        this.managers.each(function(a) {
            c.push([a.get("username"), this.levels.admin])
        },
        this);
        return {
            anonymous: a,
            authenticated: b,
            users: c
        }
    },
    doLayout: function() {
        this.container = new Ext.Panel({
            renderTo: this.renderTo,
            border: !1,
            items: [this.buildViewPermissionChooser(), this.buildEditPermissionChooser(), this.buildManagePermissionChooser()]
        })
    }
});
Ext.namespace("GeoNode");
GeoNode.SearchTableRowExpander = Ext.extend(Ext.grid.RowExpander, {
    errorText: "UT: Unable to fetch layer details.",
    loadingText: "UT: Loading...",
    constructor: function(a) {
        this.fetchURL = a.fetchURL;
        GeoNode.SearchTableRowExpander.superclass.constructor.call(this, a)
    },
    getRowClass: function(a, b, c) {
        c.cols -= 1;
        return this.state[a.id] ? "x-grid3-row-expanded": "x-grid3-row-collapsed"
    },
    fetchBodyContent: function(a, b, c) {
        this.enableCaching || this._fetchBodyContent(a, b, c);
        var d = this.bodyContent[b.id];
        d ? a.innerHTML = d: this._fetchBodyContent(a, b, c)
    },
    _fetchBodyContent: function(a, b) {
        a.innerHTML = this.loadingText;
        var c = this.fetchURL + "?uuid=" + b.get("uuid"),
        d = this;
        Ext.Ajax.request({
            url: c,
            method: "GET",
            success: function(c) {
                c = c.responseText;
                a.innerHTML = c;
                d.bodyContent[b.id] = c
            },
            failure: function() {
                a.innerHTML = d.errorText
            }
        })
    },
    beforeExpand: function(a, b, c) {
        return ! 1 !== this.fireEvent("beforeexpand", this, a, b, c) ? (this.fetchBodyContent(b, a, c), !0) : !1
    }
});
Ext.namespace("GeoNode");
GeoNode.UserSelector = Ext.extend(Ext.util.Observable, {
    constructor: function(a) {
        Ext.apply(this, a);
        this.initUserStore();
        this.panel = this.doLayout()
    },
    initUserStore: function() {
        if (!this.userstore) {
            var a = {
                proxy: new Ext.data.HttpProxy({
                    url: this.userLookup,
                    method: "POST"
                }),
                reader: new Ext.data.JsonReader({
                    root: "users",
                    totalProperty: "count",
                    fields: [{
                        name: "username"
                    }]
                })
            };
            Ext.apply(a, this.availableUserConfig || {});
            this.userstore = new Ext.data.Store(a);
            this.userstore.load({
                params: {
                    query: ""
                }
            })
        }
        if (!this.store) this.store = new Ext.data.ArrayStore({
            idIndex: 0,
            fields: ["username"],
            data: []
        })
    },
    doLayout: function() {
        function a() {
            var a = this.availableUsers.getValue(),
            b = this.availableUsers.store.findExact("username", a); - 1 != b && -1 == this.selectedUsers.store.findExact("username", a) && (this.selectedUsers.store.add([this.availableUsers.store.getAt(b)]), this.availableUsers.reset())
        }
        var b = this.owner,
        c = function() {
            function a() {
                e.getEl().on("mousedown", c, this, {
                    delegate: "button"
                })
            }
            function c(a, d) {
                var f = e.findItemFromChild(d),
                g = e.indexOf(f);
                e.store.getAt(g).get("username") !== b && e.store.removeAt(e.indexOf(f))
            }
            var e;
            return {
                init: function(b) {
                    e = b;
                    e.on("render", a)
                }
            }
        } ();
        this.selectedUsers = new Ext.DataView({
            store: this.store,
            itemSelector: "div.user_item",
            tpl: new Ext.XTemplate('<div><tpl for="."> <div class="x-btn user_item"><button class="icon-removeuser remove-button">&nbsp;</button>{username}</div></tpl></div>'),
            plugins: [c],
            autoHeight: !0,
            multiSelect: !0
        });
        this.addButton = new Ext.Button({
            iconCls: "icon-adduser",
            handler: a,
            scope: this
        });
        this.availableUsers = new Ext.form.ComboBox({
            width: 180,
            store: this.userstore,
            typeAhead: !0,
            minChars: 0,
            align: "right",
            border: "false",
            displayField: "username",
            emptyText: gettext("Add user..."),
            listeners: {
                scope: this,
                select: a
            }
        });
        return new Ext.Panel({
            border: !1,
            renderTo: this.renderTo,
            items: [this.selectedUsers, {
                layout: "hbox",
                border: !1,
                items: [this.addButton, this.availableUsers]
            }]
        })
    },
    setDisabled: function(a) {
        this.selectedUsers.setDisabled(a);
        this.availableUsers.setDisabled(a);
        this.addButton.setDisabled(a)
    }
});