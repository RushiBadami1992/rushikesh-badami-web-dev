/**
 * Created by rushi on 6/12/16.
 */
(function() {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable",wamSortable);

/*    function wamSortable()
    {
        function linker(scope,element,attributes)
        {

            var startIndex=-1;
            var endIndex=-1;
            element.sortable({
                    axis:'y',
                    sort: function(event, ui) {
                        start = ui.item.index();
                    },
                    stop:
                        function (event, ui) {
                            endIndex = ui.item.index();
                            if(start >= end){
                                start --;
                            }
                            scope.wamCallback({
                                start: start,
                                end: end
                            });

                        }
                        });
        }
            return {
                scope: {
                    wamCallback:'&'
                },
                link: linker
            }
        }*/
    function wamSortable() {
        var start = -1;
        var end = -1;
        function linker(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                sort: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    if(start >= end){
                        start --;
                    }
                    scope.wamCallback({
                        start: start,
                        end: end
                    });
                    console.log(start);
                    console.log(end);
                }
            });
        }
        return {
            scope: {
                wamCallback: '&'
            },
            link: linker
        }
    }

})();