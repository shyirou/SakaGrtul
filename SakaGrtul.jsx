// Create a new window
var win = new Window("palette", "SakaGrtul", undefined, {resizeable: true});

win.orientation = "column"

var group = win.add("group", undefined, "")
group.orientation = "row";
group.spacing = 1
group.alignment = "center";
group.margins.bottom = -12;

var Choose = group.add("dropdownlist", undefined, ["STACK", "GRID"]);
Choose.characters = 50;
Choose.selection = 0;
Choose.preferredSize.height = 30;
Choose.justify = "center";

var group2 = win.add("group", undefined, "")
group2.orientation = "row";
group2.spacing = 1
group2.alignment = "center";
group2.margins.bottom = -12;

var Choose = group2.add("statictext", undefined, "Duration(Sec) : ");
Choose.selection = 0;
Choose.preferredSize.height = 30;

var Input = group2.add("edittext", undefined, "10");
Input.characters = 2;
Input.preferredSize.height = 30;

var button = win.add("button", undefined, "APPLY")
button.characters = 8

win.layout.layout(true);

win.addEventListener("resize", function() {
    var winWidth = win.size[0];
    var groupWidth = group.size[0];
    var centerPos = (winWidth - groupWidth) / 2;
    group.location.x = centerPos;
});

win.addEventListener("resize", function() {
    var winWidth = win.size[0];
    var group2Width = group2.size[0];
    var centerPos = (winWidth - group2Width) / 2;
    group2.location.x = centerPos;
});

win.addEventListener("resize", function() {
    var winWidth = win.size[0];
    var buttoWidth = button.size[0];
    var centerPos = (winWidth - buttoWidth) / 2;
    button.location.x = centerPos;
});

function applySettings() {

    if (Choose.selection.text === "STACK") {
    }

    var selectedItems = app.project.selection;

    if (selectedItems.length > 0) {
        // Create a new composition
        var compName = selectedItems[0].name + "_Works";
        var compWidth = selectedItems[0].width;
        var compHeight = selectedItems[0].height * 3;
        var compDuration = parseFloat(Input.text) * selectedItems.length;

        var newComp = app.project.items.addComp(compName, compWidth, compHeight, 1, compDuration, 30);

        // Loop through selected items
        for (var i = 0; i < selectedItems.length; i++) {
            var selectedItem = selectedItems[i];
            var baseStartTime = i * parseFloat(Input.text); // Base start time for the group of duplicates

            // Duplicate the layer to 3
            for (var j = 0; j < 3; j++) {
                var layer = newComp.layers.add(selectedItem);
                layer.startTime = baseStartTime;
                layer.outPoint = layer.startTime + parseFloat(Input.text);

                // Set position based on layer index
                if (j === 0) {
                    layer.property("Transform").property("Position").setValue([compWidth / 2, selectedItem.height / 2]);
                } else if (j === 1) {
                    layer.property("Transform").property("Position").setValue([compWidth / 2, compHeight / 2]);
                } else if (j === 2) {
                    layer.property("Transform").property("Position").setValue([compWidth / 2, compHeight - selectedItem.height / 2]);
                }
            }
        }
        alert("Applied settings successfully!");
    } else {
        alert("Please select at least one item in the project panel.");
    }
}


button.onClick = applySettings;

win.center();
win.show();
