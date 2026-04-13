//=============================================================================
// Zeorem Engine MZ - ZEM_BattleMEControl
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Controls if Victory or Defeat ME play on Battle End
 * @author Zeorem
 *
 * @help
 *
 * This plugin lets the developer disable/enable the 
 * playing of Victory ME and Defeat ME during battle
 * via switches of their choice.
 * This may be useful if you want the battle bgm to continue
 * uninterrupted after the battle ends.
 * 
 * Changelog:
 * 
 * v.0.0.1 - Finished Plugin.
 * 
 * @param victoryMe
 * @type switch
 * @text Enable Victory ME?
 * @desc Enable Victory ME?
 * @default 1
 * 
 * @param defeatMe
 * @type switch
 * @text Enable Defeat ME?
 * @desc Enable Defeat ME?
 * @default 2
 * 
 */

(() => {
    'use strict';

    const zemAssistParameters = PluginManager.parameters('ZEM_BattleMEControl');
    const zemEnableVictoryMe = JSON.parse(zemAssistParameters['victoryMe']);
    const zemEnableDefeatMe = JSON.parse(zemAssistParameters['defeatMe']);

    BattleManager.playVictoryMe = function() {
        if ($gameSwitches.value(zemEnableVictoryMe)) {
            AudioManager.playMe($gameSystem.victoryMe());
        }
    }

    BattleManager.playDefeatMe = function() {
        if ($gameSwitches.value(zemEnableDefeatMe)) {
            AudioManager.playMe($gameSystem.defeatMe());
        }  
    }

})();
