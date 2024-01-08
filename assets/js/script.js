// Current day display
$("#currentDay").text(dayjs().format("dddd, MMMM D"));

// Function to create a time block
const createTimeBlock = (hour) => {
    const event = JSON.parse(localStorage.getItem(`hour${hour}`)) || "";
    return `<div class='row'>
        <div class='col-2 hour text-right' id='hour${hour}'>
            <span>${dayjs().hour(hour).minute(0).format("h A")}</span>
        </div>
        <div class='col-8 event-group' id='timeblock${hour}'>
            <textarea class='events col-12' id='eventblock${hour}'>${event}</textarea>
        </div>
        <div class='col-2 saveBtn' id='saveBtn${hour}'>
            <i class='fas fa-save' title='Save Event'></i>
            <i class='fas fa-trash' title='Remove Event'></i>
        </div>
    </div>`;
};

// Generate time blocks
for (let hour = 9; hour <= 17; hour++) {
    $(".container").append(createTimeBlock(hour));
}

// Function to audit time block color
const auditTimeBlock = (hour) => {
    const currentTime = dayjs();
    const timeBlockStart = dayjs().hour(hour).minute(0);
    const timeBlockEnd = dayjs().hour(hour + 1).minute(0);
    const timeblock = $(`#timeblock${hour}`);
    timeblock.removeClass("past present future");

    if (currentTime.isAfter(timeBlockStart) && currentTime.isBefore(timeBlockEnd)) {
        timeblock.addClass("present");
    } else if (currentTime.isBefore(timeBlockStart)) {
        timeblock.addClass("future");
    } else {
        timeblock.addClass("past");
    }
};

// Save and delete event handlers
$(".container").on("click", "i.fa-save", function () {
    const hour = $(this).closest(".row").find(".hour").attr("id").replace("hour", "");
    const event = $(`#eventblock${hour}`).val().trim();
    localStorage.setItem(`hour${hour}`, JSON.stringify(event));
}).on("click", "i.fa-trash", function () {
    const hour = $(this).closest(".row").find(".hour").attr("id").replace("hour", "");
    localStorage.removeItem(`hour${hour}`);
    $(`#eventblock${hour}`).val("");
});

// Audit time blocks every minute and initially
setInterval(() => {
    for (let hour = 9; hour <= 17; hour++) {
        auditTimeBlock(hour);
    }
}, 60000);

for (let hour = 9; hour <= 17; hour++) {
    auditTimeBlock(hour);
}
