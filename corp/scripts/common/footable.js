/*!
 * FooTable - Awesome Responsive Tables
 * Version : 2.0.1.4
 * http://fooplugins.com/plugins/footable-jquery/
 *
 * Requires jQuery - http://jquery.com/
 *
 * Copyright 2014 Steven Usher & Brad Vincent
 * Released under the MIT license
 * You are free to use FooTable in commercial projects as long as this copyright header is left intact.
 *
 * Date: 16 Feb 2014
 */
(function($, w, undefined) {
    w.footable = {
        options: {
            delay: 10, // The number of millseconds to wait before triggering the react event
            breakpoints: { // The different screen resolution breakpoints. 
                BreakPointA: 440, //table size for viewport 500px
                BreakPointB: 486, //table size for viewport 550px
                BreakPointC: 567, //table size for browser width 639px
                BreakPointD: 666, //table size for browser width 750px
                BreakPointE: 757, //table size  for browser width 850px
                BreakPointF: 804 //table size  for browser width 900px
            },
            parsers: { // The default parser to parse the value out of a cell (values are used in building up row detail)
                alpha: function(cell) {
                    return $(cell).data('value') || $.trim($(cell).text());
                },
                numeric: function(cell) {
                    var val = $(cell).data('value') || $(cell).text().replace(/[^0-9.\-]/g, '');
                    val = parseFloat(val);
                    if (isNaN(val)) val = 0;
                    return val;
                }
            },
            buffer: "",
            addRowToggle: true,
            calculateWidthOverride: null,
            //Aashish added :first-child to escape second row of the double header. Toggle Button will appear at first row only.
            //toggleSelector: ' > tbody > tr:first-child:not(.footable-row-detail)', //the selector to show/hide the detail row 
            //RWD modified to make the toggle happen only on click of last toggle column and not on complete row
            toggleSelector: ' > tbody > tr:first-child:not(.footable-row-detail) > td:last-child', //the selector to show/hide the detail row 
            columnDataSelector: '> thead > tr:first-child > th, > thead > tr:first-child > td', //the selector used to find the column data in the thead. First row
            columnDataSelector2: '> thead > tr:last-child > th, > thead > tr:last-child > td', //the selector used to find the column data in the thead. Second row in case of double heading
            detailSeparator: ':', //the separator character used when building up the detail row
            toggleHTMLElement: '<span />', // override this if you want to insert a click target rather than use a background image.
            createGroupedDetail: function(data) {
                var groups = {
                    '_none': {
                        'name': null,
                        'data': []
                    }
                };
                for (var i = 0; i < data.length; i++) {
                    var groupid = data[i].group;
                    if (groupid !== null) {
                        if (!(groupid in groups))
                            groups[groupid] = {
                                'name': data[i].groupName || data[i].group,
                                'data': []
                            };

                        groups[groupid].data.push(data[i]);
                    } else {
                        groups._none.data.push(data[i]);
                    }
                }
                return groups;
            },
            createDetail: function(element, data, createGroupedDetail, separatorChar, classes, headerFlag, ft) {
                /// <summary>This function is used by FooTable to generate the detail view seen when expanding a collapsed row.</summary>
                /// <param name="element">This is the div that contains all the detail row information, anything could be added to it.</param>
                /// <param name="data">
                ///  This is an array of objects containing the cell information for the current row.
                ///  These objects look like the below:
                ///    obj = {
                ///      'name': String, // The name of the column
                ///      'value': Object, // The value parsed from the cell using the parsers. This could be a string, a number or whatever the parser outputs.
                ///      'display': String, // This is the actual HTML from the cell, so if you have images etc you want moved this is the one to use and is the default value used.
                ///      'group': String, // This is the identifier used in the data-group attribute of the column.
                ///      'groupName': String // This is the actual name of the group the column belongs to.
                ///    }
                /// </param>
                /// <param name="createGroupedDetail">The grouping function to group the data</param>
                /// <param name="separatorChar">The separator charactor used</param>
                /// <param name="classes">The array of class names used to build up the detail row</param>

                if (data.length > 0) {
                    var groups = createGroupedDetail(data);
                    if (!headerFlag)
                        buffer = "";

                    for (var group in groups) {
                        if (groups[group].data.length === 0) continue;
                        if (group !== '_none') element.append('<div class="' + classes.detailInnerGroup + '">' + groups[group].name + '</div>');

                        /*If table is single heading directly append the html to the element*/
                        if (!ft.multiHeader) {
                            buffer = "";
                            for (var j = 0; j < groups[group].data.length; j++) {
                                //surej
                                // var ahyperlink = $table.find('> thead > tr > th> span > a')[j];

                                var separator = (groups[group].data[j].name) ? separatorChar : '';
                                //       element.append('<div class="' + classes.detailInnerRow + '"><div class="' + classes.detailInnerName + '">' + groups[group].data[j].name + separator + '</div><div class="' + classes.detailInnerValue + '">' + groups[group].data[j].display + '</div></div>');
                                element.append('<div class="' + classes.detailInnerRow + '"><div class="' + classes.detailInnerName + '">' + groups[group].data[j].name + '</div><div class="detailInnerChar">' + separator + '</div><div class="' + classes.detailInnerValue + '">' + groups[group].data[j].display + '</div></div>');
                            }
                        }
                        /*If table is double heading there are 2 cases:
                        	1. First we call this fucntion with headerFlag=False for first row. So it will enter into below lock
                        		of code where we append the html to the buffer.
                        		See next block for next comment
                        	*/
                        else if (ft.multiHeader && !headerFlag) {
                            buffer = "";
                            for (var j = 0; j < groups[group].data.length; j++) {
                                //surej
                                // var ahyperlink = $table.find('> thead > tr > th> span > a')[j];

                                var separator = (groups[group].data[j].name) ? separatorChar : '';
                                //    buffer= buffer +('<div class="' + classes.detailInnerRow + '"><div class="' + classes.detailInnerName + '">' + groups[group].data[j].name + separator + '</div><div class="' + classes.detailInnerValue + '">' + groups[group].data[j].display + '</div></div>');
                                buffer = buffer + ('<div class="' + classes.detailInnerRow + '"><div class="' + classes.detailInnerName + '">' + groups[group].data[j].name + '</div><div class="detailInnerChar">' + separator + '</div><div class="' + classes.detailInnerValue + '">' + groups[group].data[j].display + '</div></div>');
                            }


                        }
                        /*
                        	2. Then we call this function with headerFlag=true for second row. So it will enter into below lock
                        		of code where we append the buffer's html to element and append 2nd header's html to the element.
                        		
                        		So here basically we are clubbing 2 html block's in case of double heading
                        */
                        else if (ft.multiHeader && headerFlag) {
                            trCount = $table.find('thead').children('tr').length;
                            element.append(buffer);

                            for (var j = 0; j < groups[group].data.length; j++) {
                                //surej
                                // var ahyperlink = $table.find('> thead > tr > th> span > a')[j];

                                var separator = (groups[group].data[j].name) ? separatorChar : '';
                                if (trCount > 1) {
                                    //	                        element.append('<div class="' + classes.detailInnerRow + '"><div class="' + classes.detailInnerName + '">' + groups[group].data[j].name + separator + '</div><div class="' + classes.detailInnerValue + '">' + groups[group].data[j].display + '</div></div>');
                                    element.append('<div class="' + classes.detailInnerRow + '"><div class="' + classes.detailInnerName + '">' + groups[group].data[j].name + '</div><div class="detailInnerChar">' + separator + '</div><div class="' + classes.detailInnerValue + '">' + groups[group].data[j].display + '</div></div>');
                                }
                            }
                        }
                    }
                } else if (data.length == 0 && buffer != "") {
                    element.append(buffer);
                }
            },
            classes: {
                main: 'footable',
                loading: 'footable-loading',
                loaded: 'footable-loaded',
                toggle: 'footable-toggle',
                disabled: 'footable-disabled',
                detail: 'footable-row-detail',
                detailCell: 'footable-row-detail-cell',
                detailInner: 'footable-row-detail-inner',
                detailInnerRow: 'footable-row-detail-row',
                detailInnerGroup: 'footable-row-detail-group',
                detailInnerName: 'footable-row-detail-name',
                detailInnerValue: 'footable-row-detail-value',
                detailShow: 'footable-detail-show'
            },
            triggers: {
                initialize: 'footable_initialize', //trigger this event to force FooTable to reinitialize
                resize: 'footable_resize', //trigger this event to force FooTable to resize
                redraw: 'footable_redraw', //trigger this event to force FooTable to redraw
                toggleRow: 'footable_toggle_row', //trigger this event to force FooTable to toggle a row
                expandFirstRow: 'footable_expand_first_row', //trigger this event to force FooTable to expand the first row
                expandAll: 'footable_expand_all', //trigger this event to force FooTable to expand all rows
                collapseAll: 'footable_collapse_all' //trigger this event to force FooTable to collapse all rows
            },
            events: {
                alreadyInitialized: 'footable_already_initialized', //fires when the FooTable has already been initialized
                initializing: 'footable_initializing', //fires before FooTable starts initializing
                initialized: 'footable_initialized', //fires after FooTable has finished initializing
                resizing: 'footable_resizing', //fires before FooTable resizes
                resized: 'footable_resized', //fires after FooTable has resized
                redrawn: 'footable_redrawn', //fires after FooTable has redrawn
                breakpoint: 'footable_breakpoint', //fires inside the resize function, when a breakpoint is hit
                columnData: 'footable_column_data', //fires when setting up column data. Plugins should use this event to capture their own info about a column
                rowDetailUpdating: 'footable_row_detail_updating', //fires before a detail row is updated
                rowDetailUpdated: 'footable_row_detail_updated', //fires when a detail row is being updated
                rowCollapsed: 'footable_row_collapsed', //fires when a row is collapsed
                rowExpanded: 'footable_row_expanded', //fires when a row is expanded
                rowRemoved: 'footable_row_removed', //fires when a row is removed
                reset: 'footable_reset' //fires when FooTable is reset
            },
            debug: false, // Whether or not to log information to the console.
            log: null
        },

        version: {
            major: 0,
            minor: 5,
            toString: function() {
                return w.footable.version.major + '.' + w.footable.version.minor;
            },
            parse: function(str) {
                version = /(\d+)\.?(\d+)?\.?(\d+)?/.exec(str);
                return {
                    major: parseInt(version[1], 10) || 0,
                    minor: parseInt(version[2], 10) || 0,
                    patch: parseInt(version[3], 10) || 0
                };
            }
        },

        plugins: {
            _validate: function(plugin) {
                ///<summary>Simple validation of the <paramref name="plugin"/> to make sure any members called by FooTable actually exist.</summary>
                ///<param name="plugin">The object defining the plugin, this should implement a string property called "name" and a function called "init".</param>

                if (!$.isFunction(plugin)) {
                    if (w.footable.options.debug === true) console.error('Validation failed, expected type "function", received type "{0}".', typeof plugin);
                    return false;
                }
                var p = new plugin();
                if (typeof p['name'] !== 'string') {
                    if (w.footable.options.debug === true) console.error('Validation failed, plugin does not implement a string property called "name".', p);
                    return false;
                }
                if (!$.isFunction(p['init'])) {
                    if (w.footable.options.debug === true) console.error('Validation failed, plugin "' + p['name'] + '" does not implement a function called "init".', p);
                    return false;
                }
                if (w.footable.options.debug === true) console.log('Validation succeeded for plugin "' + p['name'] + '".', p);
                return true;
            },
            registered: [], // An array containing all registered plugins.
            register: function(plugin, options) {
                ///<summary>Registers a <paramref name="plugin"/> and its default <paramref name="options"/> with FooTable.</summary>
                ///<param name="plugin">The plugin that should implement a string property called "name" and a function called "init".</param>
                ///<param name="options">The default options to merge with the FooTable's base options.</param>

                if (w.footable.plugins._validate(plugin)) {
                    w.footable.plugins.registered.push(plugin);
                    if (typeof options === 'object') $.extend(true, w.footable.options, options);
                }
            },
            load: function(instance) {
                var loaded = [],
                    registered, i;
                for (i = 0; i < w.footable.plugins.registered.length; i++) {
                    try {
                        registered = w.footable.plugins.registered[i];
                        loaded.push(new registered(instance));
                    } catch (err) {
                        if (w.footable.options.debug === true) console.error(err);
                    }
                }
                return loaded;
            },
            init: function(instance) {
                ///<summary>Loops through all registered plugins and calls the "init" method supplying the current <paramref name="instance"/> of the FooTable as the first parameter.</summary>
                ///<param name="instance">The current instance of the FooTable that the plugin is being initialized for.</param>

                for (var i = 0; i < instance.plugins.length; i++) {
                    try {
                        instance.plugins[i]['init'](instance);
                    } catch (err) {
                        if (w.footable.options.debug === true) console.error(err);
                    }
                }
            }
        }
    };

    var instanceCount = 0;

    $.fn.footable = function(options) {
        ///<summary>The main constructor call to initialize the plugin using the supplied <paramref name="options"/>.</summary>
        ///<param name="options">
        ///<para>A JSON object containing user defined options for the plugin to use. Any options not supplied will have a default value assigned.</para>
        ///<para>Check the documentation or the default options object above for more information on available options.</para>
        ///</param>

        options = options || {};
        var o = $.extend(true, {}, w.footable.options, options); //merge user and default options
        return this.each(function() {
            instanceCount++;
            var footable = new Footable(this, o, instanceCount);
            $(this).data('footable', footable);
        });
    };

    //helper for using timeouts
    function Timer() {
        ///<summary>Simple timer object created around a timeout.</summary>
        var t = this;
        t.id = null;
        t.busy = false;
        t.start = function(code, milliseconds) {
            ///<summary>Starts the timer and waits the specified amount of <paramref name="milliseconds"/> before executing the supplied <paramref name="code"/>.</summary>
            ///<param name="code">The code to execute once the timer runs out.</param>
            ///<param name="milliseconds">The time in milliseconds to wait before executing the supplied <paramref name="code"/>.</param>

            if (t.busy) {
                return;
            }
            t.stop();
            t.id = setTimeout(function() {
                code();
                t.id = null;
                t.busy = false;
            }, milliseconds);
            t.busy = true;
        };
        t.stop = function() {
            ///<summary>Stops the timer if its runnning and resets it back to its starting state.</summary>

            if (t.id !== null) {
                clearTimeout(t.id);
                t.id = null;
                t.busy = false;
            }
        };
    }

    function Footable(t, o, id) {
        ///<summary>Inits a new instance of the plugin.</summary>
        ///<param name="t">The main table element to apply this plugin to.</param>
        ///<param name="o">The options supplied to the plugin. Check the defaults object to see all available options.</param>
        ///<param name="id">The id to assign to this instance of the plugin.</param>

        var ft = this;
        ft.id = id;
        ft.table = t;
        ft.options = o;
        ft.breakpoints = [];
        ft.breakpointNames = '';
        ft.columns = {};
        ft.plugins = w.footable.plugins.load(ft);
        ft.firstHeaderSize = 0;
        ft.multiHeader = false;
        var arrSize = 0;
        var opt = ft.options,
            cls = opt.classes,
            evt = opt.events,
            trg = opt.triggers,
            indexOffset = 0,
            idVar = 1,
            trCount = 0,
            colspan = 0;

        // This object simply houses all the timers used in the FooTable.
        ft.timers = {
            resize: new Timer(),
            register: function(name) {
                ft.timers[name] = new Timer();
                return ft.timers[name];
            }
        };
        ft.init = function() {
            var $window = $(w),
                $table = $(ft.table),
                $index = 0;
            var index1 = 0;
            /*Using trCount we identify if table is single heading or double heading. and we set the flag 'multiHeader'
            	accordingly*/
            trCount = $table.find('thead').children('tr').length;
            if (trCount > 1) {
                ft.multiHeader = true;
            }
            w.footable.plugins.init(ft);

            if ($table.hasClass(cls.loaded)) {
                //already loaded FooTable for the table, so don't init again
                ft.raise(evt.alreadyInitialized);
                return;
            }

            //raise the initializing event
            ft.raise(evt.initializing);

            $table.addClass(cls.loading);

            var flag = -1;


            /* Get the column data once for the life time of the plugin.
				Get column data of first row. Flag is used to identify the first row. as we read toggle button in first row
				only and not in second row. so we disable this flag in second row. see Below block where we set flag=1*/
            $table.find(opt.columnDataSelector).each(function() {
                    flag = 0;
                    var data = ft.getColumnData(this, flag);
                    ft.columns[index1++] = data;
                    arrSize = index1;
                    ft.firstHeaderSize = index1;
                    ft.arrSize = arrSize;
                }

            );

            //          if(trCount>1){
            /* Get the column data once for the life time of the plugin.
				Get column data of second row incase of double heading*/
            $table.find(opt.columnDataSelector2).each(function() {
                //	index=ft.columns.length;
                flag = 1;
                //       	ft.multiHeader=true;

                var data = ft.getColumnData(this, flag);
                var cnt = arrSize++;
                ft.columns[cnt] = data;
                ft.arrSize = cnt;

            });
            //	}
            // Create a nice friendly array to work with out of the breakpoints object.
            for (var name in opt.breakpoints) {
                ft.breakpoints.push({
                    'name': name,
                    'width': opt.breakpoints[name]
                });
                ft.breakpointNames += (name + ' ');
            }

            // Sort the breakpoints so the smallest is checked first
            ft.breakpoints.sort(function(a, b) {
                return a['width'] - b['width'];
            });

            $table
                .unbind(trg.initialize)
                //bind to FooTable initialize trigger
                .bind(trg.initialize, function() {
                    //remove previous "state" (to "force" a resize)
                    $table.removeData('footable_info');
                    $table.data('breakpoint', '');

                    //trigger the FooTable resize
                    $table.trigger(trg.resize);

                    //remove the loading class
                    $table.removeClass(cls.loading);

                    //add the FooTable and loaded class
                    $table.addClass(cls.loaded).addClass(cls.main);

                    //raise the initialized event
                    ft.raise(evt.initialized);
                })
                .unbind(trg.redraw)
                //bind to FooTable redraw trigger
                .bind(trg.redraw, function() {
                    ft.redraw();
                })
                .unbind(trg.resize)
                //bind to FooTable resize trigger
                .bind(trg.resize, function() {
                    ft.resize();
                })
                .unbind(trg.expandFirstRow)
                //bind to FooTable expandFirstRow trigger
                .bind(trg.expandFirstRow, function() {
                    $table.find(opt.toggleSelector).first().not('.' + cls.detailShow).trigger(trg.toggleRow);


                })
                .unbind(trg.expandAll)
                //bind to FooTable expandFirstRow trigger
                .bind(trg.expandAll, function() {
                    $table.find(opt.toggleSelector).not('.' + cls.detailShow).trigger(trg.toggleRow);
                })
                .unbind(trg.collapseAll)
                //bind to FooTable expandFirstRow trigger
                .bind(trg.collapseAll, function() {
                    $table.find('.' + cls.detailShow).trigger(trg.toggleRow);
                });

            //trigger a FooTable initialize
            $table.trigger(trg.initialize);

            //bind to window resize
            $window
                .bind('resize.footable', function() {
                    ft.timers.resize.stop();
                    ft.timers.resize.start(function() {
                        ft.raise(trg.resize);
                    }, opt.delay);
                });
        };

        ft.addRowToggle = function() {
            if (!opt.addRowToggle) return;

            var $table = $(ft.table),
                hasToggleColumn = false;

            //first remove all toggle spans
            $table.find('span.' + cls.toggle).remove();

            for (var c in ft.columns) {
                var col = ft.columns[c];
                if (col.toggle) {

                    hasToggleColumn = true;
                    var selector = '> tbody > tr:not(.' + cls.detail + ',.' + cls.disabled + ') > td:nth-child(' + (parseInt(col.index, 10) + 1) + ')';
                    $table.find(selector).not('.' + cls.detailCell).prepend($(opt.toggleHTMLElement).addClass(cls.toggle));

                    return;
                }
            }
            /*We are removing this feature as we dont want toggle button to appear on first column*/
            //check if we have an toggle column. If not then add it to the first column just to be safe
            /*           if (!hasToggleColumn) {
                            $table
                                .find('> tbody > tr:not(.' + cls.detail + ',.' + cls.disabled + ') > td:first-child')
                                .not('.' + cls.detailCell)
                                .prepend($(opt.toggleHTMLElement).addClass(cls.toggle));
                        }
             */
        };

        ft.setColumnClasses = function() {
            $table = $(ft.table);
            for (var c in ft.columns) {
                var col = ft.columns[c];
                if (col.className !== null) {
                    var selector = '',
                        first = true;
                    $.each(col.matches, function(m, match) { //support for colspans
                        if (!first) selector += ', ';
                        selector += '> tbody > tr:not(.' + cls.detail + ') > td:nth-child(' + (parseInt(match, 10) + 1) + ')';
                        first = false;
                    });
                    //add the className to the cells specified by data-class="blah"
                    $table.find(selector).not('.' + cls.detailCell).addClass(col.className);
                }
            }
        };

        //moved this out into it's own function so that it can be called from other add-ons
        ft.bindToggleSelectors = function() {
            var $table = $(ft.table);

            if (!ft.hasAnyBreakpointColumn()) return;

            $table.find(opt.toggleSelector).unbind(trg.toggleRow).bind(trg.toggleRow, function(e) {
                var $row = $(this).is('tr') ? $(this) : $(this).parents('tr');
                var $row1 = $(this);
                ft.toggleDetail($row, false);
                //         var $row1 = $('> thead > tr:last-child');
                //         ft.toggleDetail($row1);
            });

            $table.find(opt.toggleSelector).unbind('click.footable').bind('click.footable', function(e) {
                if ($table.is('.breakpoint') && $(e.target).is('td,.' + cls.toggle)) {
                    $(this).trigger(trg.toggleRow);
                    if (jQuery('.nextGenUX4').is(':visible')) {
                        if (jQuery(this).parent().parent().find('.footable-row-detail').length > 1) {
                            jQuery(this).parent().parent().find('.footable-row-detail')[1].remove();
                        }
                    }
                }
            });
        };

        ft.parse = function(cell, column) {
            var parser = opt.parsers[column.type] || opt.parsers.alpha;
            return parser(cell);
        };

        ft.getColumnData = function(th, flag) {
            var $th = $(th),
                hide = $th.data('priority'),
                index = $th.index();

            if (hide == "1") {
                hide = 'BreakPointA';
            } else if (hide == "2") {
                hide = 'BreakPointA,BreakPointB';
            } else if (hide == "3") {
                hide = 'BreakPointA,BreakPointB,BreakPointC';
            } else if (hide == "4") {
                hide = 'BreakPointA,BreakPointB,BreakPointC,BreakPointD';
            } else if (hide == "5") {
                hide = 'BreakPointA,BreakPointB,BreakPointC,BreakPointD,BreakPointE';
            } else if (hide == "6") {
                hide = 'BreakPointA,BreakPointB,BreakPointC,BreakPointD,BreakPointE,BreakPointF';
            }


            hide = hide || '';
            hide = jQuery.map(hide.split(','), function(a) {
                return jQuery.trim(a);
            });
            //(flag==0)? ($th.data('toggle') || false):false,
            if (flag == 0) {
                var data = {
                    'index': index,
                    'hide': {},
                    'type': $th.data('type') || 'alpha',
                    'name': $th.data('name') || $.trim($th.text()),
                    'ignore': $th.data('ignore') || false,
                    'toggle': $th.data('toggle') || false,
                    'className': $th.data('class') || null,
                    'matches': [],
                    'names': {},
                    'group': $th.data('group') || null,
                    'groupName': null
                };
            } else {
                var data = {
                    'index': index,
                    'hide': {},
                    'type': $th.data('type') || 'alpha',
                    'name': $th.data('name') || $.trim($th.text()),
                    'ignore': $th.data('ignore') || false,
                    'toggle': false,
                    'className': $th.data('class') || null,
                    'matches': [],
                    'names': {},
                    'group': $th.data('group') || null,
                    'groupName': null
                };

            }
            if (data.group !== null) {
                var $group = $(ft.table).find('> thead > tr.footable-group-row > th[data-group="' + data.group + '"], > thead > tr.footable-group-row > td[data-group="' + data.group + '"]').first();
                data.groupName = ft.parse($group, {
                    'type': 'alpha'
                });
            }

            var pcolspan = parseInt($th.prev().attr('colspan') || 0, 10);
            indexOffset += pcolspan > 1 ? pcolspan - 1 : 0;
            var colspan = parseInt($th.attr('colspan') || 0, 10),
                curindex = data.index + indexOffset;
            if (colspan > 1) {
                var names = $th.data('names');
                names = names || '';
                names = names.split(',');
                for (var i = 0; i < colspan; i++) {
                    data.matches.push(i + curindex);
                    if (i < names.length) data.names[i + curindex] = names[i];
                }
            } else {
                data.matches.push(curindex);
            }

            data.hide['default'] = ($th.data('priority') === "HideAll") || ($.inArray('default', hide) >= 0);

            var hasBreakpoint = false;
            for (var name in opt.breakpoints) {
                data.hide[name] = ($th.data('priority') === "HideAll") || ($.inArray(name, hide) >= 0);
                hasBreakpoint = hasBreakpoint || data.hide[name];
            }
            data.hasBreakpoint = hasBreakpoint;
            var e = ft.raise(evt.columnData, {
                'column': {
                    'data': data,
                    'th': th
                }
            });
            return e.column.data;
        };

        ft.getViewportWidth = function() {
            return window.innerWidth || (document.body ? document.body.offsetWidth : 0);
        };

        ft.calculateWidth = function($table, info) {
            if (jQuery.isFunction(opt.calculateWidthOverride)) {
                return opt.calculateWidthOverride($table, info);
            }
            if (info.viewportWidth < info.width) info.width = info.viewportWidth;
            if (info.parentWidth < info.width) info.width = info.parentWidth;
            return info;
        };

        ft.hasBreakpointColumn = function(breakpoint) {
            for (var c in ft.columns) {
                if (ft.columns[c].hide[breakpoint]) {
                    if (ft.columns[c].ignore) {
                        continue;
                    }
                    return true;
                }
            }
            return false;
        };

        ft.hasAnyBreakpointColumn = function() {
            for (var c in ft.columns) {
                if (ft.columns[c].hasBreakpoint) {
                    return true;
                }
            }
            return false;
        };

        ft.resize = function() {
            var $table = $(ft.table);
            /*Adding script footableWidthCalculate on resize, to identify columns which are collapsed and to distribute its
            	width among other columns. Logic is implemented in footableWidthCalculate.js  script*/
            var script = document.createElement('script');
            script.id = 'id1' + "footableWidthCalculate";
            script.src = "scripts/common/footableWidthCalculate.js?paramId='resized';";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }

            if (!$table.is(':visible')) {
                return;
            } //we only care about FooTables that are visible

            if (!ft.hasAnyBreakpointColumn()) {
                return;
            } //we only care about FooTables that have breakpoints

            var info = {
                'width': $table.width(), //the table width
                'viewportWidth': ft.getViewportWidth(), //the width of the viewport
                'parentWidth': $table.parent().width() //the width of the parent
            };

            info = ft.calculateWidth($table, info);

            var pinfo = $table.data('footable_info');
            $table.data('footable_info', info);
            ft.raise(evt.resizing, {
                'old': pinfo,
                'info': info
            });

            // This (if) statement is here purely to make sure events aren't raised twice as mobile safari seems to do
            if (!pinfo || (pinfo && pinfo.width && pinfo.width !== info.width)) {

                var current = null,
                    breakpoint;
                for (var i = 0; i < ft.breakpoints.length; i++) {
                    breakpoint = ft.breakpoints[i];
                    if (breakpoint && breakpoint.width && info.width <= breakpoint.width) {
                        current = breakpoint;
                        break;
                    }
                }

                var breakpointName = (current === null ? 'default' : current['name']),
                    hasBreakpointFired = ft.hasBreakpointColumn(breakpointName),
                    previousBreakpoint = $table.data('breakpoint');

                $table
                    .data('breakpoint', breakpointName)
                    .removeClass('default breakpoint').removeClass(ft.breakpointNames)
                    .addClass(breakpointName + (hasBreakpointFired ? ' breakpoint' : ''));

                //only do something if the breakpoint has changed
                if (breakpointName !== previousBreakpoint) {
                    //trigger a redraw
                    $table.trigger(trg.redraw);
                    //raise a breakpoint event
                    ft.raise(evt.breakpoint, {
                        'breakpoint': breakpointName,
                        'info': info
                    });
                }
            }

            ft.raise(evt.resized, {
                'old': pinfo,
                'info': info
            });

            var $table = $(ft.table);


            $table.find('> tbody > tr.' + cls.detailShow).each(function() {
                var $row = $(this).is('tr') ? $(this) : $(this).parents('tr');
                ft.toggleDetail($row, true);
            });
            //     feba.domManipulator.loadScript("scripts/common/footableWidthCalculate.js");

        };

        ft.redraw = function() {
            //add the toggler to each row
            ft.addRowToggle();

            //bind the toggle selector click events
            ft.bindToggleSelectors();

            //set any cell classes defined for the columns
            ft.setColumnClasses();
            /*As we can have double heading we have separted this in 2 block.1. tr:first-child 2. tr:last-child which is 
            presentbelow this block */
            var $table = $(ft.table),
                breakpointName = $table.data('breakpoint'),
                hasBreakpointFired = ft.hasBreakpointColumn(breakpointName);

            $table
                .find('> tbody > tr:not(.' + cls.detail + ')').data('detail_created', false).end()
                .find('> thead > tr:first-child > th')
                .each(function() {
                    var data = ft.columns[$(this).index()],
                        selector = '',
                        first = true;
                    $.each(data.matches, function(m, match) {
                        if (!first) {
                            selector += ', ';
                        }
                        var count = match + 1;
                        selector += '> tbody > tr:not(.' + cls.detail + ') > td:nth-child(' + count + ')';
                        selector += ', > tfoot > tr:not(.' + cls.detail + ') > td:nth-child(' + count + ')';
                        selector += ', > colgroup > col:nth-child(' + count + ')';
                        first = false;
                    });

                    selector += ', > thead > tr[data-group-row="true"] > th[data-group="' + data.group + '"]';
                    //                selector += ', > thead > tr:last-child[data-group-row="true"] > th[data-group="' + data.group + '"]';
                    var $column = $table.find(selector).add(this);
                    if (breakpointName !== '') {
                        if (data.hide[breakpointName] === false) $column.addClass('footable-visible').show();
                        else $column.removeClass('footable-visible').hide();
                    }

                    if ($table.find('> thead > tr.footable-group-row').length === 1) {
                        var $groupcols = $table.find('> thead > tr:first-child > th[data-group="' + data.group + '"]:visible, > thead > tr:first-child > th[data-group="' + data.group + '"]:visible'),
                            $group = $table.find('> thead > tr.footable-group-row > th[data-group="' + data.group + '"], > thead > tr.footable-group-row > td[data-group="' + data.group + '"]'),
                            groupspan = 0;

                        $.each($groupcols, function() {
                            groupspan += parseInt($(this).attr('colspan') || 1, 10);
                        });

                        if (groupspan > 0) $group.attr('colspan', groupspan).show();
                        else $group.hide();
                    }
                })
                .end()
                .find('> tbody > tr.' + cls.detailShow).each(function() {
                    ft.createOrUpdateDetailRow(this, false);
                });


            $table
                .find('> tbody > tr:last-child:not(.' + cls.detail + ')').data('detail_created', false).end()
                .find('> thead > tr:last-child > th')
                .each(function() {
                    var data = ft.columns[$(this).index()],
                        selector = '',
                        first = true;
                    $.each(data.matches, function(m, match) {
                        if (!first) {
                            selector += ', ';
                        }
                        var count = match + 1;
                        selector += '> tbody > tr:last-child:not(.' + cls.detail + ') > td:nth-child(' + count + ')';
                        selector += ', > tfoot > tr:last-child:not(.' + cls.detail + ') > td:nth-child(' + count + ')';
                        selector += ', > colgroup > col:nth-child(' + count + ')';
                        first = false;
                    });

                    selector += ', > thead > tr:last-child[data-group-row="true"] > th[data-group="' + data.group + '"]';
                    var $column = $table.find(selector).add(this);
                    if (breakpointName !== '') {
                        if (data.hide[breakpointName] === false) $column.addClass('footable-visible').show();
                        else $column.removeClass('footable-visible').hide();
                    }

                    if ($table.find('> thead > tr:last-child.footable-group-row').length === 1) {
                        var $groupcols = $table.find('> thead > tr:last-child > th[data-group="' + data.group + '"]:visible, > thead > tr:last-child > th[data-group="' + data.group + '"]:visible'),
                            $group = $table.find('> thead > tr:last-child.footable-group-row > th[data-group="' + data.group + '"], > thead > tr:last-child.footable-group-row > td[data-group="' + data.group + '"]'),
                            groupspan = 0;

                        $.each($groupcols, function() {
                            groupspan += parseInt($(this).attr('colspan') || 1, 10);
                        });

                        if (groupspan > 0) $group.attr('colspan', groupspan).show();
                        else $group.hide();
                    }
                })
                .end()
                .find('> tbody > tr:last-child.' + cls.detailShow).each(function() {
                    ft.createOrUpdateDetailRow(this, false);
                });

            $table.find('> tbody > tr.' + cls.detailShow + ':visible').each(function() {
                var $next = $(this).next();
                if ($next.hasClass(cls.detail)) {
                    if (!hasBreakpointFired) $next.hide();
                    else $next.show();
                }
            });

            // adding .footable-first-column and .footable-last-column to the first and last th and td of each row in order to allow
            // for styling if the first or last column is hidden (which won't work using :first-child or :last-child)
            $table.find('> thead > tr > th.footable-last-column, > tbody > tr > td.footable-last-column').removeClass('footable-last-column');
            $table.find('> thead > tr > th.footable-first-column, > tbody > tr > td.footable-first-column').removeClass('footable-first-column');
            $table.find('> thead > tr, > tbody > tr')
                .find('> th.footable-visible:last, > td.footable-visible:last')
                .addClass('footable-last-column')
                .end()
                .find('> th.footable-visible:first, > td.footable-visible:first')
                .addClass('footable-first-column');

            ft.raise(evt.redrawn);
        };

        ft.toggleDetail = function(row, toggleFlag) {
            var $row = (row.jquery) ? row : $(row),
                $next = $row.next(),
                $last = $next.next();

            //check if the row is already expanded
            if ($row.hasClass(cls.detailShow)) {
                $row.removeClass(cls.detailShow);
                $last.removeClass(cls.detailShow);

                //only hide the next row if it's a detail row
                if ($next.hasClass(cls.detail)) $next.hide();
                ft.raise(evt.rowCollapsed, {
                    'row': $row[0]
                });

                if ($last.length !== 0) {
                    if ($last.next().hasClass(cls.detail)) $last.next().hide();
                    ft.raise(evt.rowCollapsed, {
                        'row': $last[0]
                    });
                }
                //      ft.raise(evt.rowCollapsed, { 'row': $row[1] });

            } else if (!toggleFlag) {

                idVar = 1;
                colspan = 0;

                ft.createOrUpdateDetailRow($row[0], false);
                $row.addClass(cls.detailShow)
                    .next().show();
                var $next = $row.next(),
                    $last = $next.next();

                ft.raise(evt.rowExpanded, {
                    'row': $row[0]
                });

                //			if($last.length !==0){	
                ft.createOrUpdateDetailRow($last[0], true);
                $last.addClass(cls.detailShow).next().show();
                ft.raise(evt.rowExpanded, {
                    'row': $last[0]
                });
                //			}				
            }
        };

        ft.removeRow = function(row) {
            var $row = (row.jquery) ? row : $(row);
            if ($row.hasClass(cls.detail)) {
                $row = $row.prev();
            }
            var $next = $row.next();
            if ($row.data('detail_created') === true) {
                //remove the detail row
                $next.remove();
            }
            $row.remove();

            //raise event
            ft.raise(evt.rowRemoved);
        };

        ft.appendRow = function(row) {
            var $row = (row.jquery) ? row : $(row);
            $(ft.table).find('tbody').append($row);

            //redraw the table
            ft.redraw();
        };

        ft.getColumnFromTdIndex = function(index) {
            /// <summary>Returns the correct column data for the supplied index taking into account colspans.</summary>
            /// <param name="index">The index to retrieve the column data for.</param>
            /// <returns type="json">A JSON object containing the column data for the supplied index.</returns>
            var result = null;
            var column = 0;
            /*       for (column in ft.columns) {
                       if ($.inArray(index, ft.columns[column].matches) >= 0) {
                           result = ft.columns[column];
                           break;
                    }  
                    }
                    
                    */
            //Aashish chaged RWD. Get the column data based on index passed   
            if (index <= ft.arrSize) {
                result = ft.columns[index];
            }



            return result;
        };
        /*This function has the logic to paint the html for collpased fields.*/
        ft.createOrUpdateDetailRow = function(actualRow, headerFlag) {
            var $row = $(actualRow),
                $next = $row.next(),
                $detail, values = [];
            if ($row.data('detail_created') === true) return true;

            if ($row.is(':hidden')) return false; //if the row is hidden for some reason (perhaps filtered) then get out of here
            ft.raise(evt.rowDetailUpdating, {
                'row': $row,
                'detail': $next
            });
            $row.find('> td:hidden').each(function() {
                var index = $(this).index();
                if (ft.multiHeader && headerFlag) {
                    index = index + (ft.firstHeaderSize);
                }
                var column = ft.getColumnFromTdIndex(index);
                var name = column.name;
                if (column.ignore === true) return true;

                if (index in column.names) name = column.names[index];
                values.push({
                    'name': name,
                    'value': ft.parse(this, column),
                    'display': $.trim($(this).html()),
                    'group': column.group,
                    'groupName': column.groupName
                });
                return true;
            });
            //         if (values.length === 0) return false; //return if we don't have any data to show

            if (colspan < $row.find('> td:visible').length)
                colspan = $row.find('> td:visible').length;

            var exists = $next.hasClass(cls.detail);
            var colorClass;

            if ($row.hasClass('grouplet_tablelistwhiterow') || $row.hasClass('listwhiterow')) {
                colorClass = 'footableTablelistwhiterow';
            } else if ($row.hasClass('grouplet_tablelistgreyrow') || $row.hasClass('listgreyrow')) {
                colorClass = 'footableTablelistgreyrow';
            }
            if (!exists) { // Create

                if (ft.multiHeader) {
                    $next = $('<tr class="' + colorClass + ' ' + cls.detail + '"><td class="' + cls.detailCell + '"><div id=detailInner' + idVar + ' class="' + cls.detailInner + '"></div></td></tr>');
                    $row.after($next);
                    idVar = idVar + 1;
                } else {
                    idVar = 2;
                    $next = $('<tr class="' + colorClass + ' ' + cls.detail + '"><td class="' + cls.detailCell + '"><div id=detailInner' + idVar + ' class="' + cls.detailInner + '"></div></td></tr>');
                    $row.after($next);

                }


            }
            /*         else if(ft.multiHeader && headerFlag){
            	$next = $('<tr class="' + cls.detail + '"><td class="' + cls.detailCell + '"><div class="' + cls.detailInner + '"></div></td></tr>');
                $row.after($next);
            	$row.addClass(cls.detailShow)
					.next().show();
            }
      */
            $next.find('> td:first').attr('colspan', colspan);
            $detail = $next.find('.' + cls.detailInner).empty();
            opt.createDetail($detail, values, opt.createGroupedDetail, opt.detailSeparator, cls, headerFlag, ft);
            $row.data('detail_created', true);
            ft.raise(evt.rowDetailUpdated, {
                'row': $row,
                'detail': $next
            });
            return !exists;
        };

        ft.raise = function(eventName, args) {

            if (ft.options.debug === true && $.isFunction(ft.options.log)) ft.options.log(eventName, 'event');

            args = args || {};
            var def = {
                'ft': ft
            };
            $.extend(true, def, args);
            var e = $.Event(eventName, def);
            if (!e.ft) {
                $.extend(true, e, def);
            } //pre jQuery 1.6 which did not allow data to be passed to event object constructor
            $(ft.table).trigger(e);
            return e;
        };

        //reset the state of FooTable
        ft.reset = function() {
            var $table = $(ft.table);
            $table.removeData('footable_info')
                .data('breakpoint', '')
                .removeClass(cls.loading)
                .removeClass(cls.loaded);

            $table.find(opt.toggleSelector).unbind(trg.toggleRow).unbind('click.footable');

            $table.find('> tbody > tr').removeClass(cls.detailShow);

            $table.find('> tbody > tr.' + cls.detail).remove();

            ft.raise(evt.reset);
        };

        ft.init();
        return ft;
    }
})(jQuery, window);