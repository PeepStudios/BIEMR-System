//pragma solidity ^0.8.17;
contract Record {
    
    struct Patients{
        string ic;
        string name;
        string phone;
        string gender;
        string dob;
        string height;
        string weight;
        string houseaddr;
        string bloodgroup;
        string allergies;
        string ailments;
        string medication;
        string emergencyName;
        string emergencyContact;
        address addr;
        uint date;
    }

    struct Doctors{
        string ic;
        string name;
        string phone;
        string gender;
        string dob;
        string qualification;
        string major;
        address addr;
        uint date;
    }

    struct Appointments{
        address doctoraddr;
        address patientaddr;
        string date;
        string time;
        string prescription;
        string description;
        string diagnosis;
        string status;
        uint creationDate;
    }
    
    address public owner;
    address[] public patientList;
    address[] public doctorList;
    address[] public appointmentList;

    mapping(address => Patients) patients;
    mapping(address => Doctors) doctors;
    mapping(address => Appointments) appointments;

    mapping(address=>mapping(address=>bool)) isApproved;
    mapping(address => bool) isPatient;
    mapping(address => bool) isDoctor;
    mapping(address => uint) AppointmentPerPatient;

    uint256 public patientCount = 0;
    uint256 public doctorCount = 0;
    uint256 public appointmentCount = 0;
    uint256 public permissionGrantedCount = 0;
    
    constructor () public {
        owner = msg.sender;
    }
    
    //Retrieve patient details from user sign up page and store the details into the blockchain
    function setDetails(string memory _ic, string memory _name, string memory _phone, string memory _gender, string memory _dob, string memory _height, string memory _weight, string memory _houseaddr, string memory _bloodgroup, string memory _allergies,string memory _ailments, string memory _medication, string memory _emergencyName, string memory _emergencyContact) public {
        require(!isPatient[msg.sender]);


   Patients memory Patx =   Patients ({

        ic:_ic,
        name:_name,
        phone :_phone,
        gender : _gender,
        dob : _dob,
        height:_height,
        weight:_weight,
        houseaddr: _houseaddr,
        bloodgroup :_bloodgroup,
        allergies: _allergies,
        ailments:_ailments,
        medication:_medication,
        emergencyName :_emergencyName,
        emergencyContact :_emergencyContact,
        addr :msg.sender,
        date :block.timestamp

   });


 patients[msg.sender] = Patx;
        patientList.push(msg.sender);
        isPatient[msg.sender] = true;
        isApproved[msg.sender][msg.sender] = true;
        patientCount++;
    }
    
    //Allows patient to edit their existing record
    function editDetails(string memory _ic, string memory _name, string memory _phone, string memory _gender, string memory _dob, string memory _height, string memory _weight, string memory _houseaddr, string memory _bloodgroup, string memory _allergies, string memory _ailments, string memory _medication, string memory _emergencyName, string memory _emergencyContact) public {
        require(isPatient[msg.sender]);
        Patients memory p = patients[msg.sender];
        
        p.ic = _ic;
        p.name = _name;
        p.phone = _phone;
        p.gender = _gender;
        p.dob = _dob;
        p.height = _height; 
        p.weight = _weight;
        p.houseaddr = _houseaddr;
        p.bloodgroup = _bloodgroup;
        p.allergies = _allergies;
        p.ailments = _ailments;
        p.medication = _medication;
        p.emergencyName = _emergencyName;
        p.emergencyContact = _emergencyContact;
        p.addr = msg.sender;    
    }

    //Retrieve patient details from doctor registration page and store the details into the blockchain
    function setDoctor(string memory _ic, string memory _name, string memory _phone, string memory _gender, string memory _dob, string memory _qualification, string memory _major) public {
        require(!isDoctor[msg.sender]);
        Doctors memory doctor =  Doctors ({
              
        ic :_ic,
        name :_name,
        phone: _phone,
        gender :_gender,
        dob: _dob,
        qualification :_qualification,
        major :_major,
        addr : msg.sender,
        date :block.timestamp

        });

        doctors[msg.sender] = doctor;
        doctorList.push(msg.sender);
        isDoctor[msg.sender] = true;
        doctorCount++;
    }

    //Allows doctors to edit their existing profile
    function editDoctor(string memory _ic, string memory _name, string memory _phone, string memory _gender, string memory _dob, string memory _qualification, string memory _major) public {
        require(isDoctor[msg.sender]);
        Doctors memory d = doctors[msg.sender];
        
        d.ic = _ic;
        d.name = _name;
        d.phone = _phone;
        d.gender = _gender;
        d.dob = _dob;
        d.qualification = _qualification;
        d.major = _major;
        d.addr = msg.sender;
    }

    //Retrieve appointment details from appointment page and store the details into the blockchain
    function setAppointment(address _addr, string memory _date, string memory _time, string memory _diagnosis, string memory _prescription, string memory _description, string memory _status) public {
        require(isDoctor[msg.sender]);
        Appointments memory appointmentx =  Appointments ({

        doctoraddr : msg.sender,
        patientaddr:_addr,
        date :_date,
        time: _time,
        diagnosis : _diagnosis,
        prescription : _prescription,
        description : _description,
        status : _status,
        creationDate: block.timestamp


        });
        appointments[_addr] =  appointmentx;
        
        

        appointmentList.push(_addr);
        appointmentCount++;
        AppointmentPerPatient[_addr]++;
    }
    
    //Retrieve appointment details from appointment page and store the details into the blockchain
    function updateAppointment(address _addr, string memory _date, string memory _time, string memory _diagnosis, string memory _prescription, string memory _description, string memory _status) public {
        require(isDoctor[msg.sender]);
        Appointments memory a = appointments[_addr];
        
        a.doctoraddr = msg.sender;
        a.patientaddr = _addr;
        a.date = _date;
        a.time = _time;
        a.diagnosis = _diagnosis;
        a.prescription = _prescription; 
        a.description = _description;
        a.status = _status;
    }
    
    //Owner of the record must give permission to doctor only they are allowed to view records
    function givePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = true;
        permissionGrantedCount++;
        return true;
    }

    //Owner of the record can take away the permission granted to doctors to view records
    function RevokePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = false;
        return true;
    }

    //Retrieve a list of all patients address
    function getPatients() public view returns(address[] memory) {
        return patientList;
    }

    //Retrieve a list of all doctors address
    function getDoctors() public view returns(address[] memory) {
        return doctorList;
    }

    //Retrieve a list of all appointments address
    function getAppointments() public view returns(address [] memory) {
        return appointmentList;
    }
    
    //Search patient details by entering a patient address (Only record owner or doctor with permission will be allowed to access)
    function searchPatientDemographic(address _address) public view returns(string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        require(isApproved[_address][msg.sender]);
        
        Patients memory p = patients[_address];
        
        return (p.ic, p.name, p.phone, p.gender, p.dob, p.height, p.weight);
    }

    //Search patient details by entering a patient address (Only record owner or doctor with permission will be allowed to access)
    function searchPatientMedical(address _address) public view returns(Patients memory)  {
        require(isApproved[_address][msg.sender]);
        
        Patients memory p = patients[_address];
        return p;
    }

    //Search doctor details by entering a doctor address (Only doctor will be allowed to access)
    function searchDoctor(address _address) public view returns(string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        require(isDoctor[_address]);
        
        Doctors memory d = doctors[_address];
        
        return (d.ic, d.name, d.phone, d.gender, d.dob, d.qualification, d.major);
    }
    
    //Search appointment details by entering a patient address
    function searchAppointment(address _address) public view returns(address, string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        Appointments memory a = appointments[_address];
        Doctors memory d = doctors[a.doctoraddr];

        return (a.doctoraddr, d.name, a.date, a.time, a.diagnosis, a.prescription, a.description, a.status);
    }

    //Search patient record creation date by entering a patient address
    function searchRecordDate(address _address) public view returns(uint) {
        Patients memory p = patients[_address];
        
        return (p.date);
    }

    //Search doctor profile creation date by entering a patient address
    function searchDoctorDate(address _address) public view returns(uint) {
        Doctors memory d = doctors[_address];
        
        return (d.date);
    }

    //Search appointment creation date by entering a patient address
    function searchAppointmentDate(address _address) public view returns(uint) {
        Appointments memory a = appointments[_address];
        
        return (a.creationDate);
    }

    //Retrieve patient count
    function getPatientCount() public view returns(uint256) {
        return patientCount;
    }

    //Retrieve doctor count
    function getDoctorCount() public view returns(uint256) {
        return doctorCount;
    }

    //Retrieve appointment count
    function getAppointmentCount() public view returns(uint256) {
        return appointmentCount;
    }

    //Retrieve permission granted count
    function getPermissionGrantedCount() public view returns(uint256) {
        return permissionGrantedCount;
    }

    //Retrieve permission granted count
    function getAppointmentPerPatient(address _address) public view returns(uint256) {
        return AppointmentPerPatient[_address];
    }
}