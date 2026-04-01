const inputs = [
    {id: 'inDocType', out: 'outDocType', default: 'Lab Report'},
    {id: 'inDept', out: 'outDept', default: 'Computer Science and Engineering'},
    {id: 'inCode', out: 'outCode', default: 'Course Code'},
    {id: 'inTitle', out: 'outTitle', default: 'Course Title'},
    {id: 'inFacName', out: 'outFacName', default: 'Faculty Name'},
    {id: 'inFacDesig', out: 'outFacDesig', default: 'Designation, IUBAT'},
    {id: 'inStdName', out: 'outStdName', default: 'Student Name'},
    {id: 'inStdId', out: 'outStdId', default: 'ID Number'},
    {id: 'inSection', out: 'outSection', default: 'Section'},
    {id: 'inSemester', out: 'outSemester', default: 'Semester'},
    {id: 'inDate', out: 'outDate', default: 'DD.MM.YYYY'},
];

inputs.forEach(item => {
    const inputEl = document.getElementById(item.id);
    const outputEl = document.getElementById(item.out);
    
    inputEl.addEventListener('input', (e) => {
        outputEl.innerText = e.target.value || item.default;
        if(item.id === 'inCode') {
            document.getElementById('outCodeSmall').innerText = e.target.value || "your code";
        }
    });
});

document.getElementById('inDeptLogo').addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('deptLogoPreview').src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }
});

function generatePDF() {
    const facName = document.getElementById('inFacName').value.trim();
    const facDesig = document.getElementById('inFacDesig').value.trim();
    const subDate = document.getElementById('inDate').value;

    if (!facName || !facDesig || !subDate) {
        alert("ভুল হয়েছে! ফ্যাকাল্টির নাম, পদবী এবং ডেডলাইন অবশ্যই ফিলাপ করতে হবে।");
        return;
    }

    const element = document.getElementById('preview-page');
    const opt = {
        margin: 0,
        filename: 'Cover_Page.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}