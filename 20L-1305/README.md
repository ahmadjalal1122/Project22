                                                  #Introduction to UI components
UI components are used to represent distinct UI elements, such as tables, buttons, dialogs, and others.

They are designed for simple and flexible user interface (UI) rendering. Components are responsible for rendering result page fragments and providing/supporting further interactions of JavaScript components and server.
To use UI components in your custom module, you need to add a dependency for the Magento_UI module in your component's composer.json file.
The following XSD file contains rules and limitations shared between all components (both definitions and instance configurations):
      <your module root dir>/Magento/Ui/etc/ui_definition.xsd
    
    **A UI component is a combination of:**

1-XML declaration that specifies the component's configuration settings and inner structure.
2-JavaScript class inherited from one of the JavaScript framework UI components base classes (such as UIElement, UIClass or UICollection).
3-Related template(s)

** XML Declaration**
XML is widely used in which allows developers to easily reuse existing functionalities and add customizations.
Compared to XML layouts, UI components use a more semantical approach to declare and configure the user interface.
An instance of a UI component is usually based on the hierarchy of child UI components.
For example:

*the Form component has Fieldsets, Tabs, and inner fields
*the Listing component has Filters, Columns, Bookmark component, and others

**JavaScript class**
The code below shows how the JavaScript class of a UI component is implemented.
    
    define([
            'Magento_Ui/js/form/element/abstract',
            'underScore',
            'UiRegistry'
            ],funtion(abstract,_,registry){
            'use_strict';
            
            rerturn Abstract.extend({
               //Configuration
               default({
                allowimport=true,
                autoImportIfEmpty=true,
                values={},
                mask='',
                queryTemplate:'ns=${$.ns},index='
            }
            //Execution
            initializa:function(){
            this._super();
            If(this.allowImport){
            this.sendHandlers();
            }
    }
    
  **  Templates**
A UI component can be bound to one or more HTML templates using the KnockoutJS bindings.
    
    
** Frontend design area**
Configured through layout XML.
The jsLayout argument is used to specify information.
    
      <block name="block-name" template="Magento_Module::path_to_template.phtml">
        <arguments>
          <argument name="jsLayout" xsi:type="array">
            <item name="components" xsi:type="array">
              ...
            </item>
          </argument>
        </arguments>
      </block>
    
    **Introduction to the Magento Functional Testing Framework**
    
    The Magento Functional Testing Framework (MFTF) is a framework used to perform automated end-to-end functional testing.
    **Goals**
1-To facilitate functional testing and minimize the effort it takes to perform regression testing.
2-Enable extension developers to provide functional tests for their extensions.
3-Ensure a common standard of quality between Magento, extension developers and system integrators.
4-MFTF also focuses on Traceability for clear logging and reporting capabilities.
5-Modularity to run tests based on installed modules and extensions.
6-Customizability for existing tests.
7-Readability using clear and declarative XML test steps.
8-Maintainability based on simple test creation and overall structure.
    
    **Audience**
Contributors: Tests build confidence about the results of changes introduced to the platform.
Extension Developers: Can adjust expected behaviour according to their customizations.
System Integrators: MFTF coverage provided out-of-the-box with Magento is solid base for Acceptance / Regression Tests.
            
  ** MFTF supports two different locations for storing the tests and test artifacts:**

<magento_root>/app/code/<vendor_name>/<module_name>/Test/Mftf/ is the location of local, customized tests.
<magento_root>/vendor/<vendor_name>/<module_name>/Test/Mftf/ is location of tests provided by Magento and vendors.
   ** MFTF output**
Generated PHP Codeception tests
Codeception results and console logs
Screenshots and HTML failure report
Allure formatted XML results
Allure report dashboard of results
