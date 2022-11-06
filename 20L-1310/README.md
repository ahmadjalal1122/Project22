				Web API functional testing

The Web API testing framework allows you to test Magento Web API from the client application point of view. The tests can be used with either REST or SOAP. The REST or SOAP adapter that runs the tests is specified in PHPUnit configuration. See How to Run the Tests for more information.

To run Web API tests for GraphQl, see GraphQL functional testing.

	Implementation Details

The Web API functional testing framework depends on the integration testing framework and reuses most of classes implemented there.

	Custom Annotations for Data Fixtures

In the Web API functional tests only, the custom annotation @magentoApiDataFixture is available for declaring fixtures. The difference of this annotation from @magentoDataFixture is that the fixture will be committed and accessible during HTTP requests made within the test body. The usage rules of @magentoApiDataFixture are the same as @magentoDataFixture usage rules.

If data was added to the DB using @magentoApiDataFixture, it will not be automatically cleared after test execution. The data is cleared when @magentoDataFixture is used.

Do not define fixtures in dev/tests/api-functional. Instead, they must be taken from dev/tests/integration. The integration framework defines most necessary fixtures, and they should be reused during Web API functional testing. If the existing set of fixtures is insufficient, add new fixtures under dev/tests/integration. The fixtures will then be available for both testing frameworks.

To keep your test environment clean, clear all entities created in fixture files or within tests itself from the DB after test execution. This can be done either directly in tearDown or by a corresponding rollback for the fixture file. This file should be named the same as a fixture, but with _rollback suffix.


	How to Create a New Test

All Web API functional tests should inherit from the generic test case Magento\TestFramework\TestCase\WebapiAbstract. It defines the _webApiCall() method, which should be used to perform Web API calls from tests. Clients of _webApiCall() are unaware of which adapter will be used to perform the remote call.

	namespace Magento\Webapi\Routing;
	class CoreRoutingTest extends \Magento\TestFramework\TestCase\WebapiAbstract
	{
    	public function testBasicRoutingExplicitPath()
    	{
        	$itemId = 1;
     	   $serviceInfo = [
            'rest' => [
                'resourcePath' => '/V1/testmodule1/' . $itemId,
                'httpMethod' => \Magento\Framework\Webapi\Rest\Request::HTTP_METHOD_GET,
            ],
          	  'soap' => [
                	'service' => 'testModule1AllSoapAndRestV1',
                	'operation' => 'testModule1AllSoapAndRestV1Item',
            ],
        ];
      		  $requestData = ['itemId' => $itemId];
        	$item = $this->_webApiCall($serviceInfo, $requestData);
        	$this->assertEquals('testProduct1', $item['name'], "Item was retrieved 	unsuccessfully");
  	  }
	}

The test above should be able to test SOAP and REST, depending on what adapter is currently used by the testing framework. The format of $serviceInfo is defined by the Web API client adapter interface:

	namespace Magento\TestFramework\TestCase\Webapi;
	interface AdapterInterface
	{
    	/**
    	 * Perform call to the specified service method.
    	 *
    	 * @param array $serviceInfo <pre>
     	* array(
     	*     'rest' => array(
     	*         'resourcePath' => $resourcePath, // e.g. /products/:id
    	 *         'httpMethod' => $httpMethod,     // e.g. GET
    	 *         'token' => '21hasbtlaqy8t3mj73kjh71cxxkqj4aq'    // optional : for 	token based Authentication. Will
     	*                                                             override default 	OAuth based authentication provided
     	*                                                             by test framework
     	*     ),
     	*     'soap' => array(
     	*         'service' => $soapService,    // soap service name with Version suffix 	e.g. catalogProductV1, customerV2
     	*         'operation' => $operation     // soap operation name e.g. 	catalogProductCreate
	     *     )
	     * );
	     * </pre>
	     * @param array $arguments
	     * @param string|null $storeCode if store code not provided, default store 	code will be used
     	* @param \Magento\Integration\Model\Integration|null $integration
     	* @return array|string|int|float|bool
    	 */
   	 public function call($serviceInfo, $arguments = [], $storeCode = null, 	$integration = null);
	}



	How to Run the Tests

	Prerequisites

Install the PHP Soap extension.

Copy php_soap.dll or php_soap.so to your PHP extensions directory. Edit your php.ini file and enable the PHP Soap extension. Usually this means deleting the leading semi-colon in front of the extension. Then restart Apache.

extension=php_soap.dll

Before running the functional tests you need to clear your cache. Now you are ready to run the tests.

	Running the Tests

Copy dev/tests/api-functional/phpunit_rest.xml.dist and phpunit_soap.xml.dist to dev/tests/api-functional/phpunit_rest.xml and phpunit_soap.xml.

Define the Magento instance URL as a value of TESTS_BASE_URL, Test Webservice User as value of TESTS_WEBSERVICE_USER and Test Webservice API key as value of TESTS_WEBSERVICE_APIKEY in copied file i.e. phpunit_rest.xml or phpunit_soap.xml.

Copy dev/tests/api-functional/config/install-config-mysql.php.dist to dev/tests/api-functional/config/install-config-mysql.php.

Configure your DB connection and install settings in dev/tests/api-functional/config/install-config-mysql.php. Specify the Magento database. The base URL to access this Magento instance must be the same specified in the phpunit_rest.xml or phpunit_soap.xml file.

Run phpunit using the dev/tests/api-functional/phpunit_rest.xml or dev/tests/api-functional/phpunit_soap.xml configuration file::

vendor/bin/phpunit --configuration <full xml file path>
or
vendor/bin/phpunit -c <full xml file path>


				Use REST APIs

The Magento REST API defines a set of functions that a developer can use to perform requests and receive responses. These interactions are performed using the HTTP protocol.

The caller issues an HTTP request, which contains the following elements:

An HTTP header that provides authentication and other instructions
A verb, which can be one of GET, POST, PUT, or DELETE.
An endpoint, which is a Uniform Resource Indicator (URI) that identifies the server, the web service, and the resource being acted on.
The call payload, which is set of input parameters and attributes that you supply with the request.
Magento returns a response payload as well as an HTTP status code.

This guide introduces web API, REST, and cURL command concepts. It shows you how to authenticate and construct and run REST web API calls. You run REST web API calls through cURL commands or a REST client.

	API security

This topic describes best practices for API security.

	Input limiting

Imposing restrictions on the size and number of resources that a user can request through an API can help mitigate denial-of-service (DoS) vulnerabilities. By default, the following built-in API rate limiting is available:

REST requests containing inputs that represent a list of entities. When enabled, the default maximum is 20 for synchronous requests and 5,000 for asynchronous requests.
REST and GraphQL queries that allow paginated results can be limited to a maximum number of items per page. When enabled, the default maximum is 300.
REST queries that allow paginated results can have a default number of items per page imposed. When enabled, the default maximum is 20.
By default, these input limits are disabled, but you can use the following methods to enable them:

Set the values in the Admin.
Run the bin/magento config:set command.
Add entries to the env.php file.
Set environment variables.
When input limiting has been enabled, the system uses the default value for each limitation listed above. You can also configure custom values.

Although some simple examples for configuring these values from the CLI are provided below, all of the values can be configured per website and per store view in addition to being configurable globally. In addition, these values can also be configured via env.php as well as via environment variables.

In addition, the Admin provides a configuration setting for limiting session sizes for Admin users and storefront visitors.
Enable the input limiting system
To enable these input limiting features from the Admin, go to Stores > Settings > Configuration > Services > Web Api Limits or GraphQL Input Limits and set Enable Input Limits to Yes.

To enable with the CLI, run one or both of the following commands:

bin/magento config:set webapi/validation/input_limit_enabled 1
bin/magento config:set graphql/validation/input_limit_enabled 1
Maximum parameter inputs
The EntityArrayValidator class constructor limits the number of objects that can be given to inputs that represent arrays of objects. For example, the PUT /V1/guest-carts/{cartId}/collect-totals endpoint contains the input parameter additionalData->extension_attributes->gift_messages, which represents a list of gift message information objects.

There are four possible input arrays:

additional_data
agreement_ids
gift_messages
custom_attributes
{
  "paymentMethod": {
    "po_number": "string",
    "method": "string",
    "additional_data": [
      "string"
    ],
    "extension_attributes": {
      "agreement_ids": [
        "string"
      ]
    }
  },
  "shippingCarrierCode": "string",
  "shippingMethodCode": "string",
  "additionalData": {
    "extension_attributes": {
      "gift_messages": [
        {
          "gift_message_id": 0,
          "customer_id": 0,
          "sender": "string",
          "recipient": "string",
          "message": "string",
          "extension_attributes": {
            "entity_id": "string",
            "entity_type": "string",
            "wrapping_id": 0,
            "wrapping_allow_gift_receipt": true,
            "wrapping_add_printed_card": true
          }
        }
      ]
    },
    "custom_attributes": [
      {
        "attribute_code": "string",
        "value": "string"
      }
    ]
  }
}

	Construct a request

To configure a web API, developers define some of the elements of each API call in the <module root dir>/vendor/<vendor-name>/<module-name>/etc/webapi.xml file, where <vendor-name> is your vendor name (for example, magento) and <module-name> is your module name (which exactly matches its definition in composer.json). For example, the web API for the Customer service is defined in the <magento_root>/vendor/magento/module-customer/etc/webapi.xml configuration file. Service data interfaces and builders define the required and optional parameters and the return values for the API calls.

	HTTP verb

Specify one of these HTTP verbs in the request:

GET. Requests transfer of a current representation of the target resource. If you omit the verb, GET is the default.
PUT. Requests that the state of the target resource be created or replaced with the state defined by the representation enclosed in the request message payload.
POST. Requests that the origin server accept the representation enclosed in the request as data to be processed by the target resource.
DELETE. Requests that the origin server delete the target resource.
Endpoint
An endpoint is a combination of the server that fulfills a request, the web service, the store code, the resource against which the request is being made, and any template parameters.

For example, in the http://magento.ll/index.php/rest/default/V1/customerGroups/:id endpoint, the server is magento.ll/index.php/, the web service is rest, the resource is /V1/customerGroups, and the template parameter is id.

A store code can have one of the following values.

The store’s assigned store code.
default. This is the default value when no store code is provided.
all. This value only applies to endpoints defined in the CMS and Product modules. If this value is specified, the API call affects all of the merchant’s stores.
HTTP headers
To specify an HTTP header in a cURL command, use the -H option.

	Make GET request using cURL

// get method
$this->curl->get($url);

// output of curl request
$result = $this->curl->getBody();
where $url is the endpoint URL.

	Make POST request using cURL

// post method
$this->curl->post($url, $params);

// output of curl requestt
$result = $this->curl->getBody();

	Status codes and responses

REST responses
Each web API call returns a HTTP status code and a response payload. When an error occurs, the response body also returns an error message.