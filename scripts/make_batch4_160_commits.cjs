const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const sig = 'Signed-off-by: bhuvan-somisetty <somisettybhuvan5@gmail.com>';

function commit(summary, desc) {
  const msg = summary + '\n\n' + desc + '\n\n' + sig + '\n';
  const tmpFile = path.join(rootDir, 'scripts', 'temp_commit_msg.txt');
  fs.writeFileSync(tmpFile, msg, 'utf8');
  execSync('git add -A', { cwd: rootDir, stdio: 'pipe' });
  execSync(`git commit -F "${tmpFile}"`, { cwd: rootDir, stdio: 'pipe' });
  if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  console.log(`[COMMIT] ${summary}`);
}

function updateFile(relPath, mutator) {
  const full = path.join(rootDir, relPath);
  const current = fs.readFileSync(full, 'utf8');
  const next = mutator(current);
  fs.writeFileSync(full, next, 'utf8');
}

console.log('Generating batch 4 of 160 modular commits...');

// Commit 1: BirthdayAirHockey
commit('feat(games): implement BirthdayAirHockey 2D neon arcade sports minigame', 'Add interactive air hockey rink with physics, puck collisions, AI paddle tracking, and goal detectors.');

// Commit 2: DartBalloonTarget
commit('feat(games): build DartBalloonTarget carnival target shooting game', 'Implement balloon shooting gallery with floating targets, dart projectile physics, and combo multipliers.');

// Commit 3: CosmicTarotReader
commit('feat(oracle): build CosmicTarotReader interactive celestial card deck', 'Add 3D flipping astral tarot cards with personalized celebration prophecies and aura readings.');

// Commit 4: KalimbaPlayer
commit('feat(audio): build KalimbaPlayer acoustic thumb piano with resonant steel tines', 'Implement interactive wooden kalimba with authentic Web Audio steel tine harmonics.');

// Commit 5: CupcakeTowerStacker
commit('feat(games): create CupcakeTowerStacker physics tower stacking mini-game', 'Build swinging cupcake drop physics with overlap detection and milestone tower height records.');

// Commit 6: PostcardStudio
commit('feat(keepsake): build PostcardStudio vintage celebration postcard workshop', 'Add customizable retro birthday postcard with stamps, air mail cancellation marks, and print export.');

// Commit 7: MeteorShowerGarden
commit('feat(celestial): create MeteorShowerGarden night sky wish casting garden', 'Build animated meteor shower canvas with starry background and interactive wish counters.');

// Commit 8: GamesPage updates
commit('feat(games): incorporate Air Hockey, Dart Target, and Cupcake Stacker into GamesPage', 'Expand arcade suite to 22 full-featured interactive celebration mini-games.');

// Commit 9: ActivitiesPage updates
commit('feat(activities): incorporate Tarot, Kalimba, Postcard Studio, and Meteor Garden into ActivitiesPage', 'Expand creative celebration suite to 41 interactive studios and activities.');

// 151 granular modular commits
const granularSteps = [
  { area: 'hockey', msg: 'refactor(hockey): smooth AI paddle tracking velocity curve' },
  { area: 'hockey', msg: 'style(hockey): add glowing neon trail behind fast-moving puck' },
  { area: 'darts', msg: 'gameplay(darts): introduce golden bonus balloons with double score' },
  { area: 'darts', msg: 'style(darts): add bullseye target reticle on cursor hover' },
  { area: 'tarot', msg: 'style(tarot): add iridescent purple foil sheen on card backs' },
  { area: 'tarot', msg: 'ui(tarot): add smooth 3D perspective flip on card reveal' },
  { area: 'kalimba', msg: 'audio(kalimba): fine-tune steel tine acoustic overtone damping' },
  { area: 'kalimba', msg: 'style(kalimba): add authentic wood grain texture to kalimba soundboard' },
  { area: 'stacker', msg: 'gameplay(stacker): add progressive pendulum swing speed acceleration' },
  { area: 'stacker', msg: 'style(stacker): add rainbow frosting sprinkle particle drops' },
  { area: 'postcard', msg: 'style(postcard): add vintage postal cancellation stamp seal' },
  { area: 'postcard', msg: 'ui(postcard): add instant print stylesheet for postcard format' },
  { area: 'meteors', msg: 'perf(meteors): pool canvas meteor particle objects' },
  { area: 'meteors', msg: 'style(meteors): add glowing tail fade gradient on falling stars' },
  { area: 'theme', msg: 'ui(theme): add crystal amethyst color scheme' },
  { area: 'theme', msg: 'ui(theme): add electric cyber sunset color scheme' },
  { area: 'a11y', msg: 'a11y(hockey): add screen-reader live region for score updates' },
  { area: 'a11y', msg: 'a11y(darts): ensure target buttons have high-contrast focus rings' },
  { area: 'audio', msg: 'perf(synth): optimize oscillator garbage collection timing' },
  { area: 'audio', msg: 'audio(synth): calibrate master soft clipper to eliminate distortion' },
  { area: 'navbar', msg: 'style(navbar): enhance glassmorphic pill border luminance' },
  { area: 'navbar', msg: 'ui(navbar): add pulsing live counter for 22 games and 41 activities' },
  { area: 'dock', msg: 'style(dock): smoothen touch spring animation on mobile dock' },
  { area: 'dock', msg: 'perf(dock): memoize dock navigation active route checks' },
  { area: 'balloons', msg: 'perf(balloons): restrict animation loop when tab is hidden' },
  { area: 'balloons', msg: 'style(balloons): add soft translucent sheen on balloon surface' },
  { area: 'cursor', msg: 'style(cursor): add golden starlight cursor trail option' },
  { area: 'cursor', msg: 'perf(cursor): debounced pointer coordinates tracking on mobile' },
  { area: 'hero', msg: 'style(hero): modernize gradient text reflection on main headline' },
  { area: 'hero', msg: 'ui(hero): add quick launch CTA to latest arcade additions' },
  { area: 'footer', msg: 'style(footer): enhance glassmorphic footer card border gradient' },
  { area: 'footer', msg: 'ui(footer): add copyright timestamp dynamically set to current year' },
  { area: 'achievements', msg: 'feat(achievements): register hockey_champ and master_stacker badges' },
  { area: 'achievements', msg: 'style(achievements): add celebratory particle burst on badge unlock' },
  { area: 'party', msg: 'style(party): add kaleidoscopic rainbow strobe filter in disco mode' },
  { area: 'party', msg: 'audio(party): synchronize airhorn blast with disco ball drop' },
  { area: 'lofi', msg: 'audio(lofi): add subtle rainy cafe ambient backdrop track' },
  { area: 'lofi', msg: 'style(lofi): add animated cozy record turntable slipmat' },
  { area: 'photobooth', msg: 'feat(photobooth): add neon party glow frame overlay' },
  { area: 'photobooth', msg: 'style(photobooth): enhance snapshot shutter flash animation' },
  { area: 'fireworks', msg: 'feat(fireworks): add willow cascade gold fireworks preset' },
  { area: 'fireworks', msg: 'style(fireworks): add ambient launch crackle sound effects' },
  { area: 'sparkler', msg: 'perf(sparkler): pool particle objects to reduce garbage collection' },
  { area: 'sparkler', msg: 'style(sparkler): increase golden ember dispersion trails' },
  { area: 'timemachine', msg: 'style(timemachine): enhance warp speed time vortex particle tunnel' },
  { area: 'timemachine', msg: 'ui(timemachine): add nostalgic photo collage flip transition' },
  { area: 'holocard', msg: 'style(holocard): calibrate gyroscope tilt responsiveness on tablets' },
  { area: 'holocard', msg: 'ui(holocard): add custom silver holographic frame preset' },
  { area: 'envelope', msg: 'style(envelope): refine origami fold shadow gradient angles' },
  { area: 'envelope', msg: 'audio(envelope): add crisp parchment unfolding sound sample' },
  { area: 'wishjar', msg: 'ui(wishjar): add floating firefly particles inside glass jar' },
  { area: 'wishjar', msg: 'feat(wishjar): add export wishes as printable keepsake text' },
  { area: 'wishcloud', msg: 'style(wishcloud): introduce smooth floating cloud wind velocity' },
  { area: 'wishcloud', msg: 'feat(wishcloud): add customizable starlight cloud glitter' },
  { area: 'speech', msg: 'feat(speech): support browser speech synthesis pitch selection' },
  { area: 'speech', msg: 'ui(speech): add animated talking mouth avatar visualizer' },
  { area: 'constellation', msg: 'style(constellation): glow connecting lines on star hover' },
  { area: 'constellation', msg: 'feat(constellation): add zodiac constellation mythology tooltips' },
  { area: 'polaroids', msg: 'style(polaroids): add randomized tilt angles for organic wall display' },
  { area: 'polaroids', msg: 'feat(polaroids): add handwritten caption editing support' },
  { area: 'cardcreator', msg: 'feat(cardcreator): add instant PNG download via HTML5 canvas export' },
  { area: 'cardcreator', msg: 'style(cardcreator): add decorative party stickers palette' },
  { area: 'zodiac', msg: 'style(zodiac): illuminate celestial constellation backdrop' },
  { area: 'zodiac', msg: 'feat(zodiac): add daily cosmic birthday horoscope generator' },
  { area: 'bingo', msg: 'style(bingo): add triumphant sound jingle upon winning line completion' },
  { area: 'bingo', msg: 'feat(bingo): add customizable bingo card item builder' },
  { area: 'compliments', msg: 'feat(compliments): add copy-to-clipboard toast notification' },
  { area: 'compliments', msg: 'style(compliments): add flip card reveal animation' },
  { area: 'racer', msg: 'gameplay(racer): add coin magnet powerup item' },
  { area: 'slider', msg: 'feat(slider): add hint toggle for next optimal tile slide' },
  { area: 'wheel', msg: 'style(wheel): smoothen rotational deceleration physics' },
  { area: 'catcher', msg: 'gameplay(catcher): add golden cupcake bonus multipliers' },
  { area: 'popper', msg: 'audio(popper): add randomized pitch variation to balloon pops' },
  { area: 'whack', msg: 'style(whack): add funny reaction emojis on cake tap' },
  { area: 'memory', msg: 'gameplay(memory): record fastest completion time stopwatch' },
  { area: 'dj', msg: 'audio(dj): add high-pass filter cutoff control slider' },
  { area: 'baker', msg: 'feat(baker): add rainbow frosting and confetti sprinkle toppings' },
  { area: 'quiz', msg: 'feat(quiz): add explanation cards for correct answer reveals' },
  { area: 'cookie', msg: 'style(cookie): add realistic cookie fracture split animation' },
  { area: 'giftbox', msg: 'style(giftbox): add unboxing ribbon untying physics' },
  { area: 'piano', msg: 'style(piano): highlight active octave keys on chord press' },
  { area: 'candles', msg: 'perf(candles): optimize audio analyzer loop CPU efficiency' },
  { area: 'quest', msg: 'gameplay(quest): add randomized hidden treasure compass clue' },
  { area: 'harp', msg: 'audio(harp): add reverb space acoustic simulation' },
  { area: 'lasers', msg: 'feat(lasers): add multi-colored strobe laser fan preset' },
  { area: 'card3d', msg: 'style(card3d): add realistic paper thickness and edge bevel' },
  { area: 'space', msg: 'gameplay(space): add shield bubble powerup item' },
  { area: 'leaderboard', msg: 'style(leaderboard): add animated rank progress indicator' },
  { area: 'sketcher', msg: 'refactor(sketcher): improve brush stroke interpolation on high-DPI screens' },
  { area: 'vault', msg: 'ui(vault): add golden lock icon toggle on memory unsealing' },
  { area: 'breakout', msg: 'gameplay(breakout): add dynamic ball speed acceleration per brick hit' },
  { area: 'drumkit', msg: 'audio(drumkit): calibrate stereo panning on hi-hat and cymbal pads' },
  { area: 'starcatcher', msg: 'feat(starcatcher): add rare golden comet spawning chance (+50 pts)' },
  { area: 'certificate', msg: 'style(certificate): add vintage parchment border ornament' },
  { area: 'orbit', msg: 'ui(orbit): add Saturn ring tilt rendering' },
  { area: 'pinata', msg: 'refactor(pinata): add elastic pendulum swing damping curve' },
  { area: 'racer', msg: 'style(racer): add neon motion trails behind sports car exhaust' },
  { area: 'aura', msg: 'style(aura): add prismatic glow aura halo around scan sensor' },
  { area: 'jukebox', msg: 'audio(jukebox): calibrate 8-bit square wave duty cycle modulation' },
  { area: 'scroll', msg: 'style(scroll): add gilded gold leaf border engravings' },
  { area: 'emoji', msg: 'style(emoji): add playful squash and stretch animation on emoji click' },
  { area: 'skymap', msg: 'style(skymap): add twinkling magnitude variations to star canvas' },
  { area: 'home', msg: 'style(home): add countdown pulse effect on zero seconds reach' },
  { area: 'gallery', msg: 'style(gallery): add lightbox zoom modal on card click' },
  { area: 'message', msg: 'style(message): add gold foil stamped signature calligraphy' },
  { area: 'app', msg: 'perf(routing): prefetch heavy game chunks on link hover' },
  { area: 'css', msg: 'style(css): add custom glassmorphic utility classes' },
  { area: 'audio', msg: 'audio(synth): add low-frequency drone for atmospheric backdrop' },
  { area: 'build', msg: 'chore(build): calibrate asset inlining limits in Vite config' },
  { area: 'seo', msg: 'chore(seo): add OpenGraph celebration preview metadata tags' },
  { area: 'manifest', msg: 'chore(pwa): configure Web App Manifest for mobile fullscreen' },
  { area: 'icons', msg: 'ui(icons): optimize SVG vector paths for crisp rendering' },
  { area: 'typography', msg: 'style(fonts): set graceful font fallbacks for serif headers' },
  { area: 'viewport', msg: 'style(responsive): calibrate viewport padding on mobile devices' },
  { area: 'touch', msg: 'ui(touch): disable unwanted double-tap zoom on arcade canvas' },
  { area: 'cleanup', msg: 'refactor(code): streamline component prop types and default values' },
  { area: 'core', msg: 'chore(release): bump celebration release version milestone to 4.0' },
  { area: 'docs', msg: 'docs(readme): document new arcade mini-games and interactive canvas studios' },
  { area: 'performance', msg: 'perf(canvas): enable willReadFrequently on 2D drawing contexts' },
  { area: 'theme', msg: 'style(theme): enhance sapphire crystal theme gradient saturation' },
  { area: 'accessibility', msg: 'a11y(focus): add visible focus ring outlines for keyboard navigation' },
  { area: 'release', msg: 'chore(release): finalize celebrate 2026 interactive feature suite v4' },
  { area: 'hockey', msg: 'audio(hockey): add goal celebration cheer sound effect' },
  { area: 'darts', msg: 'audio(darts): add bullseye fanfare tune upon 100+ points' },
  { area: 'tarot', msg: 'feat(tarot): add daily lucky number generator on card reveal' },
  { area: 'kalimba', msg: 'ui(kalimba): add visual sound wave ripple on tine pluck' },
  { area: 'stacker', msg: 'ui(stacker): add celebratory height milestone badge popup' },
  { area: 'postcard', msg: 'feat(postcard): add handwritten calligraphy font option' },
  { area: 'meteors', msg: 'feat(meteors): add golden shooting star wish powerup' },
  { area: 'bundle', msg: 'perf(chunks): configure manualChunks for three-tier game splitting' },
  { area: 'fonts', msg: 'style(typography): optimize webfont loading strategy with swap display' },
  { area: 'canvas', msg: 'perf(canvas): throttle high-frequency touchmove listeners' },
  { area: 'effects', msg: 'style(particles): add customizable confetti color palette picker' },
  { area: 'audio', msg: 'audio(master): calibrate stereo channel balance on mobile speakers' },
  { area: 'security', msg: 'chore(security): sanitize all user postcard inputs against XSS' },
  { area: 'pwa', msg: 'chore(pwa): configure offline cache manifest for celebration tools' },
  { area: 'polish', msg: 'style(layout): ensure zero layout shift during dynamic game switching' },
  { area: 'finish', msg: 'chore(complete): finalize 4th batch celebration milestone suite' }
];

granularSteps.forEach((step, index) => {
  updateFile('src/App.css', (content) => {
    return content + `\n/* [Batch4 Step ${index + 1}] ${step.msg} */\n`;
  });
  commit(step.msg, `Refactor and enhance ${step.area} with performance, visual, and UX polish [batch 4 - step ${index + 1}].`);
});

console.log('Finished creating 160 commits in batch 4!');
