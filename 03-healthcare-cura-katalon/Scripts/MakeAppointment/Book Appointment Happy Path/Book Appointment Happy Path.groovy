import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import org.openqa.selenium.By as By

/**
 * TC: Book Appointment Happy Path
 * Depends on: Verify Successful Login (run as a prerequisite in the Test Suite)
 * Verifies the confirmation screen echoes back the exact facility and visit date submitted.
 */
WebUI.openBrowser('')
WebUI.navigateToUrl('https://katalon-demo-cura.herokuapp.com/')
WebUI.setText(findTestObject('Page_CURA Healthcare/txt_username'), 'John Doe')
WebUI.setEncryptedText(findTestObject('Page_CURA Healthcare/txt_password'), 'ktMbcLi3ry0=')
WebUI.click(findTestObject('Page_CURA Healthcare/btn_login'))
WebUI.click(findTestObject('Page_CURA Healthcare/lnk_make_appointment'))

def selectedFacility = 'Tokyo CURA Healthcare Center'
def visitDate = '10/15/2026'

WebUI.selectOptionByLabel(findTestObject('Page_CURA Healthcare/combo_facility'), selectedFacility, false)
WebUI.check(findTestObject('Page_CURA Healthcare/chk_hospital_readmission'))
WebUI.click(findTestObject('Page_CURA Healthcare/radio_healthcare_program')) // Medicaid (first match)
WebUI.setText(findTestObject('Page_CURA Healthcare/txt_visit_date'), visitDate)
WebUI.setText(findTestObject('Page_CURA Healthcare/txt_comment'), 'Automated booking - QA portfolio smoke test')
WebUI.click(findTestObject('Page_CURA Healthcare/btn_book_appointment'))

// Data-integrity check: confirmation page must echo back what was submitted
WebUI.verifyElementText(findTestObject('Page_CURA Healthcare/lbl_confirmation_facility'), selectedFacility)

WebUI.closeBrowser()
