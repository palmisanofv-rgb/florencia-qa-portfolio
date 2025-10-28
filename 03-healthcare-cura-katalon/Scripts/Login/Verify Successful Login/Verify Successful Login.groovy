import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI

/**
 * TC: Verify Successful Login
 * Preconditions: none (CURA accepts any non-empty username/password pair)
 */
WebUI.openBrowser('')
WebUI.navigateToUrl('https://katalon-demo-cura.herokuapp.com/')

WebUI.setText(findTestObject('Page_CURA Healthcare/txt_username'), 'John Doe')
WebUI.setEncryptedText(findTestObject('Page_CURA Healthcare/txt_password'), 'ktMbcLi3ry0=') // encrypted 'ThisIsNotAPassword'
WebUI.click(findTestObject('Page_CURA Healthcare/btn_login'))

WebUI.verifyElementPresent(findTestObject('Page_CURA Healthcare/lnk_make_appointment'), 5, FailureHandling.STOP_ON_FAILURE)

WebUI.closeBrowser()
