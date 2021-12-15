export enum Categories {
    HAPPY = "happy",
    SAD = "sad",
    ANGRY = "angry",
    FEAR = "fear",
}

export enum HappyCategories {
    WEDDING = "wedding",
    ENGAGEMENT = "engagement"
}

export enum SadCategories {
    BREAK_UP = "break up"
}

export enum AngryCategories {
    FIGHTING = "fighting"
}

export enum FearCategories {
    ABUSE = "abuse"
}

export type SubCategories = HappyCategories | SadCategories | AngryCategories | FearCategories;