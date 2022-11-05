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
  
**  Running Unit Tests**
Executing the Magento 2 unit tests is straight forward. They can be executed in several different ways.

1-Command Line Interface (CLI)
This option is useful for running the tests during Continuous Integration or on remote servers, or if no IDE with PHPUnit support is available. It only requires a minimum amount of setup.

2-PhpStorm IDE
Running the tests inside an IDE like PhpStorm IDE is convenient for developers, since it allows for easier navigation in the code and debugging.

  
  
                                               ** Running Unit Tests in the CLI**
**Running all unit tests**
To run all tests, navigate to the Magento base directory and execute the following command:
      ./vendor/bin/phpunit -c dev/tests/unit/phpunit.xml.dist
  
**Running only a subset of the unit tests**
To run only tests within a specific directory branch, all you have to do is to specify the directory branch after the command.
The following example tells PHPUnit to look for any file ending with Test.php within the directory branch app/code/Example/Module/Test/Unit and try to execute it.

      ./vendor/bin/phpunit -c dev/tests/unit/phpunit.xml.dist app/code/Example/Module/Test/Unit
  
**  Use the correct PHP interpreter**
  
On many development systems, you might have more one PHP version installed. You must know the correct PHP interpreter to use for testing; that is, use the same version of PHP to run the unit tests you use to run Magento.

Some examples follow:

Ubuntu: /usr/bin/php
CentOS: /usr/bin/php
OS X:

System: /usr/bin/php
Homebrew: /usr/local/Cellar/php56/5.6.19/bin/php
MAMP: /Applications/MAMP/bin/php/php5.6.19/bin/php
You can either fix your $PATH (please refer to your system documentation on how to do that), or specify the full path to the PHP interpreter. For example:

/usr/local/Cellar/php56/5.6.19/bin/php -f vendor/bin/phpunit -- -c dev/tests/unit/phpunit.xml.di
  
  
**Memory Limit**
 
If you encounter an error similar to Fatal error: Allowed memory size of 67108864 bytes exhausted, follow these steps to resolve it.
Copy the PHPUnit configuration file dev/tests/unit/phpunit.xml.dist to dev/tests/unit/phpunit.xml

Find the following section:

  <php>
      <ini name="date.timezone" value="America/Los_Angeles"/>
      <ini name="xdebug.max_nesting_level" value="200"/>
  </php>
Add the following line in the <php> block to disable the PHP memory limit during test execution.

  <ini name="memory_limit" value="-1"/>
  
  
  
                                                   ** Running Unit Tests in PhpStorm**
Running tests in PhpStorm requires following steps to setup the system.

1-Configuring the PHP interpreter
2-Configuring PHPUnit
3-Creating a run configuration

  
1-Configuring the PHP interpreter
  
In the PhpStorm preferences, select the PHP interpreter PhpStorm should use to run tests with.  
If you can not select a PHP interpreter because the dropdown is empty, you can add a one by clicking on the button with the three dots beside the dropdown.
Then, click the + (add) button in the top right to select the desired PHP binary on your file system.
  
2-Configuring PHPUnit
  
After configuring the interpreter, the next step is to set up the PHPStorm preferences for how to execute PHPUnit.
1-Click the Use Composer autoloader option.
2-Select the vendor/autoload.php file in your Magento 2 installation.
3-Optionally select the dev/tests/unit/phpunit.xml.dist file as the Default configuration file. Doing this step makes creating temporary run configurations more convenient.
  
3-Creating a run configuration
  
The final step is to create a run configuration to execute the desired tests.
There are many ways to create run configurations in PhpStorm. Here we just show one of the option.
All start by creating a new run configuration. To do so, follow these steps:
1-Select the Run > Edit Configurations action from the top menu.
2-Click the + symbol on the top right and select PHPUnit.
Depending on what tests should be included in the run configuration, the next steps differ.

Running all tests
  
1-Give the run configuration a descriptive name; for example All Unit Tests
2-Test Scope: select the Defined in the configuration file radio button
3-Check the Use alternative configuration file checkbox
4-Select the file dev/tests/unit/phpunit.xml.dist
5-Click OK.

                                                      Writing Testable Code
  
This topic does not aim to be a replacement for existing documentation about testing, but rather tries to highlight some thoughts on the subject.
Although the truth of anything depends somewhat on the context, this topic attempts to provide information that is applicable in most situations.

  Tests should be simple
  
Tests should be trivial to write. Simple, small classes with few collaborators are easy to test. If testing a class is difficult, the class probably has grown too large and does too much. Split the class into several classes, each of which does only one thing.

  Manage dependencies
  
A big part of making code testable is managing its dependencies. Dependencies can take many forms and they can be clearly stated or hidden.
The fewer dependencies a class has and the more obvious they are, the easier it is to maintain and test the class. At the same time, the class is less likely to break because of future changes.

  Creating new instances
  
We strongly recommend you do not:
Use new to instantiate new objects, because that removes the flexibility the Magento dependency configuration offers.
Use the ObjectManager directly in production code.  
  
  
  Interfaces over classes
  
Dependencies on interfaces should be preferred over dependencies on classes because the former decouples your code from implementation details. This helps to isolate your code from future changes.

This guideline is true only if you exclusively use the methods and constants defined in the interface. If your code also uses other public methods specific to the class implementing the interface, your code is no longer independent of the implementation details.

You lose any benefits of having an interface if you use methods of a concrete class.

Even worse, the code is lying, because apparently there is a dependency on the interface only; however, you could not use a different implementation of the same interface. This can lead to considerable maintenance costs down the road. In such cases, using the class name of the concrete implementation is preferable to using the interface name as a dependency.

To illustrate, assume there is a theoretical RequestInterface with two methods, getPathInfo() and getParam($name).

For example:

    interface RequestInterface
    {
        public function getPathInfo();
        public function getParam($name);
    }
Assume there is a concrete implementation HttpRequest that also has a public method getParams() in addition to the two interface methods.

    class HttpRequest implements RequestInterface
    {
        public function getPathInfo() {...}
        public function getParam($name) {...}
        public function getParams() {...}
    }
Any code that depends on RequestInterface should avoid using the getParams() method, because it is not part of the interface.

      class MyClass
      {
          /**
           * @var RequestInterface
           */
          private $request;

          public function __construct(RequestInterface $request)
          {
              $this->request = $request;
          }

          public function doSomething()
          {
              foreach ($this->request->getParams() as $paramName => $value) {
                  // ... some more code
              }
          }
      }
This completely defeats the purpose of the interface. A better solution might be the following:

      public function doSomething()
      {
          foreach (['foo', 'bar'] as $paramName) {
              $value = $this->request->getParam($paramName);
              // ... some more code
          }
      }
The second example method doSomething() does not call the getParams() method.

If getParams() had been called, the class MyClass would have instantly depended on the HttpRequest implementation and the benefit of having an interface would have been completely lost.

If cannot avoid using getParams(), you can do any of the following:

Add the getParams() method to RequestInterface
Make MyClass dependent on HttpRequest directly instead of using RequestInterface as a constructor argument
The benefit interfaces offer is that interfaces keep code decoupled from implementation details. This means that future changes will not cause your code to fail unless the interface is changed too.

Also, interfaces can very easily be replaced by test doubles (also referred to as mocks). Mocking concrete classes can be much more complex.  
