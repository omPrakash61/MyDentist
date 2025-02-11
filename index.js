const SuccessMessage = document.getElementById("MessageSucces");
const AppointmentForm = document.getElementById("Appointment"),
  PatientName = document.getElementById("Patient"),
  email = document.getElementById("email"),
  DOA = document.getElementById("DateAppointment");
const sendEmail = (e) => {
  e.preventDefault();
  const request = fetch(
    `http://localhost:3000/insert/${PatientName.value}/${email.value}/${DOA.value}`
  );
  request
    .then(async (res) => {
      return res.json();
    })
    .then(async (data) => {
      await console.log(
        "Appointment booked! Here is the response from server : "
      );
    })
    .catch(async (e) => {
      await console.log("Error fetched : ", e);
    });
  console.log("Button Clicked!");
  console.log(DOA.value);
  if (PatientName.value === "" || email.value === "" || DOA.value === "") {
    SuccessMessage.innerText =
      "Please Enter all the required information to get an Appointment! ⚠️";
    

    setTimeout(() => {
      SuccessMessage.innerText = "";
    }, 6000);

    PatientName.value = "";
    email.value = "";
    DOA.value = "";

    return;
  } else {
    emailjs
      .sendForm(
        "service_q4fy0n3",
        "template_b7ck4b6",
        "#AppointmentForm",
        "Y0o2QYGyysDM-bVl8"
      )
      .then(
        () => {
          SuccessMessage.innerText = "Request sent succesfull ✅";
          setTimeout(() => {
            SuccessMessage.innerText = "";
          }, 6000);

          PatientName.value = "";
          email.value = "";
          DOA.value = "";
        },
        (error) => {
          console.error("Error sending email:", error);
          SuccessMessage.innerText = "Something went wrong!⚠️";
        }
      );
  }
};

const button = document.getElementById("bookButton");
button.addEventListener("click", sendEmail);
