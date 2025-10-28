import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI

/**
 * TC: Verify Failed Login
 * CURA rejects login when username or password is left empty.
 */
WebUI.openBrowser('')
WebUI.navigateToUrl('https://katalon-demo-cura.herokuapp.com/')

WebUI.setText(findTestObject('Page_CURA Healthcare/txt_username'), '')
WebUI.setEncryptedText(findTestObject('Page_CURA Healthcare/txt_password'), '')
WebUI.click(findTestObject('Page_CURA Healthcare/btn_login'))

WebUI.verifyElementPresent(findTestObject('Page_CURA Healthcare/lbl_login_error'), 5, FailureHandling.STOP_ON_FAILURE)
WebUI.verifyElementText(findTestObject('Page_CURA Healthcare/lbl_login_error'), 'Login failed! Please ensure the username and password are valid.')

WebUI.closeBrowser()
