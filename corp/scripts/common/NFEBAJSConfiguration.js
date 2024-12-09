/**
 * This js file contains configuration controling javascript behaviour across FEBA application.
 */

// Global object to contain all the configuration parameters
var FEBAJSConfig = {
    /** 
     * Parameter to control type system js validations.
     * Y: Type system js validations are enabled.
     * N: Type system js validations are disabled.
     */
    typeSystemJSValRequired: 'Y',
    /** 
     * Parameter to control display of type system js errors.
     * POPUP: error messages will be displayed as Alerts.
     * FIELD: error messages will be displayed along with the field.
     * 
     */
    TYPESYSTEM_ERR_DISPLAY: 'FIELD',
    /** 
     * Parameter to highlight error fields.
     * LABEL: Labels will be highlighted.
     * ROW: Rows will be highlighted.
     * 
     */
    TYPESYSTEM_ERR_HIGHLIGHT: 'ROW'

};