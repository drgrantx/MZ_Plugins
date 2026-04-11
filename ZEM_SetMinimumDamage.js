//=============================================================================
// ZEM_SetMinimumDamage.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Change the minimum damage value for skill formulas.
 * @author Zeorem
 *
 * @help
 * 
 * This plugin modifies of the Damage formula function to make it so
 * instead of 0, the minimum amount of damage dealt by skills is 1 or any 
 * number you set it to in the plugin parameters. Note that if there's an error 
 * in the formula the damage will still evaluate to 0, so you can still 
 * catch formula errors. 
 * 
 * This plugin IS NOT compatible with other plugins that alter how 
 * damage is parsed, since it overwrites the default behaviour. There's no way
 * to get around this due to how the core script was coded.
 * 
 * Changelog:
 * 
 * v 1.0 - Finished plugin. 
 * 
 * @param minValue
 * @text Minimum Damage Value
 * @type number
 * @default 1
 * 
 * 
 */

(() => {
    'use strict';

    const zemMinDmgparameters = PluginManager.parameters('ZEM_SetMinimumDamage');
    const minDamage = Number(zemMinDmgparameters['minValue']);

    // Overwrite damage formula
    Game_Action.prototype.evalDamageFormula = function(target) {
        try {
            const item = this.item();
            const a = this.subject(); 
            const b = target; 
            const v = $gameVariables._data; 
            const sign = [3, 4].includes(item.damage.type) ? -1 : 1;
            const value = Math.max(eval(item.damage.formula), minDamage) * sign;
            return isNaN(value) ? 0 : value;
        } catch (e) {
            return 0;
        }
    };

})();