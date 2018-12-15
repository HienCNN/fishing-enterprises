var areas = {
    list: [
        "shop",
        "business",
        "lake",
        "river",
        "pier",
        "reef",
        "spear_fishing",
        "deep_sea"
    ],

    initialize() {
        resources.workers.areas = {};

        for (let index of this.list) {
            let area = window[index];
            if (index != "business") {
                buttons.create({
                    parent: "area_selector",
                    id: index,
                    text: area.display,
                    hide: true,
                    on_click: function() {
                        areas.switch_area(area);
                    }
                });
            }

            if (index != "shop" && index != "lake" && index != "reef") {
                shop.buttons[index + "_unlock"] = {
                    condition: function() {
                        return !$("#" + area.unlock + "_button")
                            .is(":hidden");
                    },
                    data: {
                        parent: "misc_section",
                        id: index + "_unlock",
                        text: area.license + " ($" + area.purchased.price + ")",
                        on_click: function() {
                            shop.purchase_area(index);
                        },
                        disabled: function() {
                            return resources.money.count <= area.purchased.price
                                // disable the pier until the river troll has been talked to
                                || (index == "pier" ? !river.queue_change : false);
                        }
                    }
                }
            }

            if (index != "shop" && index != "business" && index != "lake") {
                shop.add_auto_buy_items(area.get_auto_buys());
                for (let button of area.purchased.buttons) {
                    shop.add_item(index, button.resource, button.parent);
                }
            }

            if (index != "shop" && index != "business") {
                area.initialize();

                let work_area = {};
                work_area.workers = 0;
                work_area.unlocked = true;

                if (index == "lake") {
                    work_area.unlocked = true;
                    work_area.break = true;
                }
                
                resources.workers.areas[index] = work_area;
            }
        }
    },

    switch_area(area) {
        $("#resource_buttons")
            .empty();
    
        let children = $("#area_selector")
            .children();
        for (let index = 0; index < children.length; index++) {
            $(children[index])
                .prop("disabled", false);
        }

        $("#" + area.internal + "_button")
            .prop("disabled", true);

        if (this.current_area != null) {
            this.current_area.unload();
        }

        area.load();
        this.current_area = area;
    },

    set_unlocked(area) {
        window[area].unlocked = true;

        $("#" + area + "_button")
            .fadeIn();
    },

    get_header(area) {
        let item = window[area];

        let count = 0;
        if (item.state != null) {
            for (let fish of item.state.fish) {
                if (fish.internal != "minnows") {
                    if (fish.caught != null && fish.caught) {
                        count++;
                    }
                }
            }
        }

        let max = 0;
        if (item.state != null) {
            max = item.state.fish.length;

            if (area == "lake") {
                max--;
            }
        }

        if (count == max) {
            $("#" + area + "_header_count")
                .css("opacity", 0.4);
        }

        return " (" + count + "/" + max + ")";
    }
}