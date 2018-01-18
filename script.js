$(function() {
    function randomString(){
        var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
        var str = "";
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass("column");
            var $columnTitle = $("<h2>").addClass("column-title").text(self.name);
            var $columnCardList = $("<ul>").addClass("column-card-list");
            var $columnAddCard = $("<button>").addClass("add-card btn btn-primary").text("Add a new card.");
            var $columnDelete = $("<button>").addClass("btn-delete btn btn-warning").text("x");
            
            $columnDelete.on("click", function(){
                self.removeColumn();
            });

            $columnAddCard.on("click", function() {
                self.addCard(new Card(prompt("Enter the card name.")));
            });

            $column.append($columnTitle)
                .append($columnAddCard)
                .append($columnDelete)
                .append($columnCardList);
            
                return $column;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            var $card = $("<li>").addClass("card");
            var $cardDescription = $("<p>").addClass("card-description").text(self.description);
            var $cardDelete = $("<button>").addClass("btn-delete btn btn-warning").text('x');

            $cardDelete.on("click", function() {
                self.removeCard();
            });

            $card.append($cardDescription)
                .append($cardDelete);
            return $card;
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };

    var board = {
        name: "Kanban Board",
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $("#board .column-container")
    };

    function initSortable() {
        $(".column-card-list").sortable({
            connectWith: ".column-card-list",
            placeholder: "card-placeholder"
        }).disableSelection();
    }

    $(".create-column")
        .click(function(){
            var name = prompt("Enter a column name");
            var column = new Column(name);
                board.addColumn(column);
        });
    
    var toDoColumn = new Column("TO DO");
    var doingColumn = new Column("DOING");
    var doneColumn = new Column("DONE");

    board.addColumn(toDoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    var card1 = new Card("Train JS framework like React or Angular.");
    var card2 = new Card("Develop my Javascript skills.");
    var card3 = new Card("Know the basics of programming.");

    toDoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doneColumn.addCard(card3);
});