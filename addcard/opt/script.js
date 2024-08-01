let otpGen;
let timer;
let secondsRemaining = 10;

function OTPFn() {
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    clearFn();
    otpGen = Math.floor(1000 + Math.random() * 9000);
    const temp = document.getElementById('content');
    const showOtp = document.createElement('div');
    showOtp.classList.add('otp-display');
    showOtp.innerHTML = `
        <p class="otp-text">Generated OTP: 
            <span>${otpGen}</span>
        </p>`;
    temp.appendChild(showOtp);
    document.getElementById('otpForm').style.display = 'flex';
    startTimer();
}

function clearFn() {
    const prevOtp = document.querySelector('.otp-display');
    if (prevOtp) {
        prevOtp.remove();
    }
    resetTimer();
    document.getElementById('errorMessage').innerText = '';
    enableInputField();
}

function OTPVerifyFn() {
    const userOtp = document.getElementById('userOTP').value;
    if (userOtp === "") {
        alert("Please enter OTP.");
        return;
    }
    const enterOtp = parseInt(userOtp);
    if (!isNaN(enterOtp)) {
        if (secondsRemaining > 0) {
            if (enterOtp === otpGen) {
                showMsgFn();
                document.getElementById('generateBtn').disabled = false;
                resetTimer();
                enableInputField();
            } else {
                document.getElementById('errorMessage').innerText = 'Invalid OTP. Please try again.';
            }
        } else {
            document.getElementById('errorMessage').innerText = 'OTP Expired. Please generate a new OTP.';
            resetTimer();
        }
    } else {
        alert("Invalid OTP. Please try again.");
    }
}

function showMsgFn() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.animation = 'fadeIn 1s forwards';
    successMessage.style.display = 'flex';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function startTimer() {
    timer = setInterval(function () {
        if (secondsRemaining <= 0) {
            clearInterval(timer);
            document.getElementById('generateBtn').disabled = false;
            document.getElementById('errorMessage').innerText = 'OTP Expired. Please generate a new OTP.';
            resetTimer();
            disableInputField();
        } else {
            document.getElementById('timer').innerText = `Time Remaining: ${secondsRemaining} seconds`;
            secondsRemaining--;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById('timer').innerText = '';
    secondsRemaining = 10;
}

function disableInputField() {
    document.getElementById('userOTP').disabled = true;
}

function enableInputField() {
    document.getElementById('userOTP').disabled = false;
}

function clearFields() {
    document.getElementById('userOTP').value = '';
    clearFn();
}
