package tests;

import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

// This portfolio's Playwright projects get a retry "for free" via
// playwright.config.ts's retries option - TestNG needs it configured
// explicitly. Used specifically for the CURA appointment booking test,
// whose bootstrap-datepicker widget has a real, CI-load-dependent JS
// attachment race (confirmed across several CI runs: identical code opens
// the calendar reliably in some runs, times out entirely in others).
public class FlakyDemoRetry implements IRetryAnalyzer {
    private int attempts = 0;
    private static final int MAX_RETRIES = 2;

    @Override
    public boolean retry(ITestResult result) {
        if (attempts < MAX_RETRIES) {
            attempts++;
            return true;
        }
        return false;
    }
}
