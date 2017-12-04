class twitch {
    public baseUri: string;
    private clientid: string;
    public userId: number;
    
    constructor(public name: string) {
        this.clientid = "jccqzsee2ome0ua5opwxr6rjjjj8a3";
        this.baseUri = "https://api.twitch.tv/kraken";
        this.userId = 123456;

        this.GetRecentFollowers();
    }

    GetUserId(name: string) {
    }

    GetRecentFollowers() {
        
    }
    
}