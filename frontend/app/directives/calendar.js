app.directive("calendar", function() {
   return {
 
      restrict: "E",
      templateUrl: "./directives/calendar.html",
      scope: {
         selected: "="
      },

      link: function(scope) {
         scope.selected = getDate(scope.selected || moment());
         scope.month = scope.selected.clone();
         let start = scope.selected.clone();
         start.date(1);
         getDate(start.day(0));
         getMonth(scope, start, scope.month);
         scope.select = function(day) {
            scope.selected = day.date;
         };
         
         //For calendar -- next and prev btns
         scope.nextMonth = function() {
            var next = scope.month.clone();
            getDate(next.month(next.month()+1).date(1));
            scope.month.month(scope.month.month()+1);
            getMonth(scope, next, scope.month);
         };

         scope.prevMonth = function() {
            var previous = scope.month.clone();
            getDate(previous.month(previous.month()-1).date(1));
            scope.month.month(scope.month.month()-1);
            getMonth(scope, previous, scope.month);
         };
      }
   };
 
   function getDate(date) {
      return date.day(0).hour(0).minute(0).second(0).millisecond(0);
   }
 
   //Builds Month for Calendar
   function getMonth(scope, start, month) {
      scope.weeks = [];
      let finished = false;
      let date = start.clone();
      let monthIndex = date.month();
      let count = 0;
      while (!finished) {
         scope.weeks.push({ days: getWeek(date.clone(), month) });
         date.add(1, "w");
         finished = count++ > 2 && monthIndex !== date.month();
         monthIndex = date.month();
      }
   }
 
   // Builds Week for Calendar
   function getWeek(date, month) {
      var days = [];
      for (var i = 0; i < 7; i++) {
         days.push({
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(new Date(), "day"),
            date: date
         });
         date = date.clone();
         date.add(1, "d");
      }
      return days;
   }
 });
 
 
 