var deep_sea = {
    internal: "deep_sea",
    ocean: true,

    initialize() {
        this.state = new fishing.state([
            resources.fish.whitefish,
            resources.fish.lingcod,
            resources.fish.stonefish,
            resources.fish.marlin,
            resources.fish.mako_shark,
            resources.fish.thresher_shark
        ]);
    },

    update() {
        fishing.update(this.state);
    },

    unload() {
        fishing.unload(this.state);
    },

    get_auto_buys() {
        return {
            internal: deep_sea.internal,
            auto_buys: [
                {
                    resource: resources.bait.crustaceans,
                    price: 500
                },
                {
                    resource: resources.bait.squid,
                    price: 600
                },
                {
                    resource: resources.bait.ground_fish,
                    price: 700
                },
                {
                    resource: resources.tackle.harpoon,
                    price: 800
                },
                {
                    resource: resources.tackle.spinner_lure,
                    price: 1000
                },
            ]
        };
    }
}