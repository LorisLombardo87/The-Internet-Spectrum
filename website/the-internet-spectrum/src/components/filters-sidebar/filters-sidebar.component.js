define([
    'mconfig/app',
    'qlik',
    'mutils/lodash'
], function(app, qlik, _) {
     ;

    app.component('filtersSidebar', {
        templateUrl: 'src/components/filters-sidebar/filters-sidebar.component.html',
        controller: FiltersSidebarController
    });

    function FiltersSidebarController () {
        var self = this;

        self.qlikApp = qlik.currApp();

        self.tabsGroup = [
            {
                label: 'calendar',
                groups: [
                    'period'
                ]
            },
            {
                label: 'basic',
                groups: [
                    'customer',
                    'store',
                    'product'
                ]
            }
        ]

        self.customAdvanceFilters = {
            dimension: {
                id:     'BADzH',
            },
            sellOut: {
                expression: 'mtGTTj',
                increasing: 'mdXrmrm',
                decreasing: 'EYxK',
                lastNWeeks: 'XFhbbKL'
            },
            stock: {
                id:     'pfjyZbM',
            },
            wos: {
                expression: 'RpgK',
                increasing: 'kgAStv',
                decreasing: 'hAAPy',
                lastNWeeks: 'kUwSG'
            },
            select: {
                id: 'Uqadx'
            },
            confirm:{
                id: 'VefaU'
            }
        }

        self.selectedTab = 'calendar';

        self.$onInit = function () {
            self.qlikApp.getList('masterobject')
                .then(
                    (model) => {
                        console.log('[filters sidebar] sidebar model', model);
                        const filters = prepareFilters(model.layout.qAppObjectList.qItems);
                        console.log('[filters sidebar] filter list', filters);
                        self.tabs = groupByCustomTabs(
                            groupByFilterGroup(filters)
                        )
                        console.log('[filters sidebar] filter grouped', self.tabs);
                    },
                    (err) => console.log('[filters sidebar] error', err)
                )
        }

        self.selectTab = function (tabLabel) {
            self.selectedTab = tabLabel;
        } 

        function isDashboardFilter (f) {
            return f.qData.visualization === 'filterpane' &&
                f.qMeta.tags.length === 3;
        }

        function parseTagOrder (tag) {
            const res = tag.split('_');
            if (res.length !== 2 && isNaN(res[1])) {
                return {
                    name: tag,
                    order: 0
                }
            } else {
                return {
                    name: res[0],
                    order: parseInt(res[1])
                }
            }
        }

        function prepareFilters (filtersList) {
            return filtersList
                .filter(isDashboardFilter)
                .map(f => {
                    const tags = _.sortBy(f.qMeta.tags)
                        .map(t => 
                            t.slice(1)
                            .toLocaleLowerCase()
                        )
                    return Object.assign({}, {
                        id:      f.qInfo.qId,
                        tab:     tags[0],
                        group:   tags[1],
                        element: Object.assign({}, parseTagOrder(tags[2]), {
                            class: 'filter-standard'
                        })
                    })
            });
        }

        function groupByFilterGroup (filterList) {
            let tabs = _.groupBy(filterList, 'tab');
            Object.keys(tabs).forEach(function (tk) {
                let groups = _.groupBy(tabs[tk], 'group');
                tabs[tk] = Object.keys(groups).map((gk) => {
                    const tagOrder = parseTagOrder(gk);
                    return Object.assign({}, tagOrder, {
                        filters: groups[gk]
                    });
                })
            })
            return tabs;
        }

        function groupByCustomTabs (byTab) {
            return self.tabsGroup.reduce(
                (acc, item) => {
                    acc[item.label] = _.flatMap(item.groups, g => byTab[g] || []);
                    return acc;
                }, 
                {}
            )
        }
    }


    
});