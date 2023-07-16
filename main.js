
let students = []
let checkLocal = localStorage.getItem('students')

if (checkLocal) {
    students = JSON.parse(localStorage.getItem('students'))
} else {
    students = []
}

const studentForm = document.querySelector('#studentForm')

const studentList = document.querySelector('#studentList')

const addButton = document.querySelector('.addButton')



studentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.querySelector('#name').value
    const surname = document.querySelector('#surname').value
    const stuNumber = document.querySelector('#stuNumber').value
    const vize = parseFloat(document.querySelector('#vize').value)
    const final = parseFloat(document.querySelector('#final').value)


    const newStudent = {
        name: name,
        surname: surname,
        stuNumber: stuNumber,
        vize: vize,
        final: final,
    }

    students.push(newStudent)
    console.log(students)

    studentForm.reset()

    savetoLocalStorage()
    viewStudentList()
    
})
viewStudentList()



function viewStudentList() {
    const emptyList = document.querySelector('.empty')


    if (students.length) {

        if(emptyList){
            emptyList.style.display = 'none'
        }
        studentList.innerHTML = 'none'

        students.forEach((thatStudent, index) => {

            const studentCard = `
            
            <div class="studentItemInfo">
                <h3>${thatStudent.name} ${thatStudent.surname} - ${thatStudent.stuNumber}</h3>
                <span>Vize: ${thatStudent.vize} Puan Final: ${thatStudent.final} Puan</span>
                <p>Ortalama: ${((thatStudent.vize + thatStudent.final) / 2)}</p>

            </div>
            <div class="studentItemProcess">
                <i class="fa-solid fa-pen-to-square editButton" onclick='editStudent(${index})'></i>
                <i class="fa-solid fa-trash deleteButton" onclick='deleteStudent(${index})'></i>
            </div>
        
            `

            const studentItem = document.createElement('div')
            studentItem.classList.add('studentItem')
            studentItem.innerHTML = studentCard

            studentList.appendChild(studentItem)
            const ortalama = ((thatStudent.vize + thatStudent.final) / 2)

            if (ortalama > 80) {
                studentItem.style.background = ' rgb(17, 228, 17)'

            } else if (ortalama > 60) {
                studentItem.style.background = ' rgb(245, 144, 3)'

            } else if (ortalama > 45) {
                studentItem.style.background = 'blue'

            } else {
                studentItem.style.background = 'rgb(255, 0, 221)'
            }

        })

    } else {
        const forEmpty = `
        <p class="empty">Listede öğrenci bulunmamaktadır.</p>
        `

        studentList.innerHTML = forEmpty

    }

}


function deleteStudent(gelenIndex) {
    /* console.log("sistem calisti") */
    console.log('students', students)
    const sonuc = students.filter((oankiDeger, index) => {
        if (index === gelenIndex) {
            Toastify({
                text: `${oankiDeger.name} listeden silindi.`,
                duration: 1000
            }).showToast()

        }


        return index !== gelenIndex
    })
    console.log('sonuca göre students', sonuc)
    students = sonuc
    savetoLocalStorage()
    viewStudentList()
    
}

function editStudent (gelenIndex){
    const editStudent = students.find((thatStudent, index)=> index === gelenIndex )

    document.querySelector('#name').value = editStudent.name
    document.querySelector('#surname').value = editStudent.surname
    document.querySelector('#stuNumber').value = editStudent.stuNumber
    document.querySelector('#vize').value = editStudent.vize
    document.querySelector('#final').value = editStudent.final

    deleteStudent(gelenIndex)

    savetoLocalStorage()
}
function savetoLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students))


}