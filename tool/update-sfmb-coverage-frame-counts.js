const fs = require('fs');
const path = require('path');

const siteRoot = path.resolve(__dirname, '..');
const gameRoot = path.resolve(process.argv[2] || 'C:\\Private\\MarioV3');
const dataPath = path.join(siteRoot, 'resource', 'sfmb', 'resource-coverage-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const frameCountCache = new Map();
const missingSprites = new Set();
const itemSharedFrameCounts = new Map(Object.entries({
    I_Coin: 4,
    I_Mushroom: 1,
    I_1UP: 1,
    I_FireFlower: 4,
    I_SuperStar: 4,
    I_MegaMushroom: 1,
    I_BlueShell: 1,
    I_SuperLeaf: 2,
    I_KeyCoin: 4,
    I_Key: 4,
    I_WeirdMushroom: 1,
    I_PropellerMushroom: 5,
    I_Clock: 5,
    I_FrogSuit: 1,
    I_HammerSuit: 1,
    I_TanookiSuit: 1,
    I_PenguinSuit: 1,
    I_IceFlower: 4,
    I_CloudFlower: 1,
    I_FollowingCloud: 4,
    I_10Coin: 4,
    I_30Coin: 4,
    I_50Coin: 4,
    I_Heart: 3,
    I_HeartContainer: 3,
    I_BoomerangFlower: 1,
    I_PoisonMushroom: 1,
    I_RottenMushroom: 1,
    I_MysteryMushroom: 1,
    I_MagicOrb: 4,
    I_3UP: 1,
    I_BubbleFlower: 4,
    I_SuperBallFlower: 4,
}));
const mapObjectSharedFrameCounts = new Map(Object.entries({
    'Flagpole': 25,
    'Castle Flag': 3,
    'Bridge': 3,
    'Sky Bridge': 1,
    'Trampoline': 3,
    'Mini Trampoline': 7,
    'Boss Bridge': 4,
    'Boss Bridge Axe': 6,
    'Toad': 1,
    'Peach': 2,
    'Checkpoint Flag': 26,
    'Vine': 8,
    'P Switch': 3,
    'Door': 3,
    'Key Door': 4,
    'P Door': 4,
    'Key P Door': 5,
    'Start Point Sign': 1,
    'Sign Arrow': 1,
    'One-way Wall': 5,
    'POW Block': 1,
    'Goal Box': 1,
    'Goal Post': 5,
    'Castle': 4,
    'Conveyor Belt': 24,
    'Burner': 1,
    'Bumper': 2,
    'Skewer': 4,
    'Crafted Cloud': 1,
    'Light Block': 2,
    'Banzai Bill Blaster': 2,
    'Blue Lift': 3,
    'Yellow POW Block': 20,
    'Red POW Block': 1,
    'ON/OFF Switch': 6,
}));
const vehicleSharedFrameCounts = new Map(Object.entries({
    'Cloud': 1,
    'Clown Car': 16,
    "Goomba's Shoe": 3,
}));
const resourcesRoot = [
    path.join(gameRoot, 'Resources'),
    path.join(gameRoot, 'BinaryRD', 'Resources'),
    gameRoot,
].find((candidate) => fs.existsSync(path.join(candidate, 'Sprite')));

if (!resourcesRoot)
    throw new Error(`Resources/Sprite directory not found below: ${gameRoot}`);

const enemySharedFrameCounts = new Map();
const enemySchemePath = path.join(gameRoot, 'UserData', 'SpriteSplitter', 'EnemySpriteV2.json');
if (fs.existsSync(enemySchemePath)) {
    const enemyScheme = JSON.parse(fs.readFileSync(enemySchemePath, 'utf8'));
    enemyScheme.SchemeRoot.forEach((entry) => {
        const count = entry.Indexes.reduce((sum, range) => sum + range.To - range.From + 1, 0);
        enemySharedFrameCounts.set(`e_${entry.Name}`.toLowerCase(), count);
    });
}
Object.entries({
    E_RotoDisc: 3,
    E_BallNChain: 2,
    E_IceBros: 4,
    E_SpikeTop: 6,
    E_BanzaiBill: 1,
    E_Goombrat: 5,
    E_Goombud: 4,
    E_AggressivePiranhaPlant: 2,
    E_HeavyBoomerangBros: 4,
    E_HeavyFireBros: 3,
    E_HeavyIceBros: 4,
    E_Pokey: 2,
    E_DryBowser: 4,
    E_Rex: 5,
    E_Eerie: 2,
    E_JumpingPiranhaPlant: 4,
    E_AngrySun: 2,
    E_Sidestepper: 4,
}).forEach(([sprite, count]) => enemySharedFrameCounts.set(sprite.toLowerCase(), count));

function getSharedFrameCount(section, row, cell) {
    let count;
    if (section.id === 'items') count = itemSharedFrameCounts.get(row.sprite);
    else if (section.id === 'enemies') count = enemySharedFrameCounts.get(row.sprite.toLowerCase());
    else if (section.id === 'map-objects') count = mapObjectSharedFrameCounts.get(row.name);
    else if (section.id === 'vehicles') count = vehicleSharedFrameCounts.get(row.name);
    else return Number.isInteger(cell.visibleFrames) ? cell.visibleFrames : null;

    if (!Number.isInteger(count))
        throw new Error(`Shared frame mapping not found: ${section.id}/${row.name}`);
    return count;
}

function readSpriteFrameCount(theme, sprite) {
    const key = `${theme}/${sprite}`;
    if (frameCountCache.has(key)) return frameCountCache.get(key);

    const fileName = `${sprite}.sprite`;
    const spritePath = [
        path.join(resourcesRoot, 'GameThemes', theme, 'Sprite', fileName),
        path.join(gameRoot, 'GameTheme', theme, 'Sprite', fileName),
        path.join(resourcesRoot, 'Sprite', fileName),
    ].find((candidate) => fs.existsSync(candidate));
    if (!spritePath) {
        missingSprites.add(key);
        frameCountCache.set(key, null);
        return null;
    }

    const spriteData = JSON.parse(fs.readFileSync(spritePath, 'utf8'));
    if (!Array.isArray(spriteData.Frames))
        throw new Error(`Frames array not found: ${spritePath}`);

    frameCountCache.set(key, spriteData.Frames.length);
    return spriteData.Frames.length;
}

let counted = 0;
let unavailable = 0;

data.sections.forEach((section) => {
    section.rows.forEach((row) => {
        row.coverage.forEach((cell, themeIndex) => {
            if (cell.status === 'partial' && Number.isInteger(cell.visibleFrames)) {
                cell.actualFrames = cell.visibleFrames;
                counted += 1;
                return;
            }

            if (!cell.available) {
                cell.actualFrames = 0;
                unavailable += 1;
                return;
            }

            const sourceTheme = cell.source || data.themes[themeIndex].id;
            const standaloneSprite = cell.method === 'extended'
                ? cell.sprite || row.sprite
                : section.id === 'characters'
                    ? row.sprite
                    : null;

            const actualFrames = standaloneSprite
                ? readSpriteFrameCount(sourceTheme, standaloneSprite)
                : getSharedFrameCount(section, row, cell);

            if (actualFrames === null)
                delete cell.actualFrames;
            else {
                cell.actualFrames = actualFrames;
                counted += 1;
            }
        });
    });
});

data.version = Math.max(Number(data.version) || 0, 5);
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Resource root: ${resourcesRoot}`);
console.log(`Updated ${counted} known and ${unavailable} missing coverage cells.`);
if (missingSprites.size) {
    console.warn(`${missingSprites.size} sprite definitions were unavailable:`);
    console.warn([...missingSprites].join(', '));
}
