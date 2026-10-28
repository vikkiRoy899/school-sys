class Student {
  final String id;
  final String admissionNumber;
  final String firstName;
  final String? middleName;
  final String lastName;
  final String dob;
  final String gender;
  final String? bloodGroup;
  final String className;
  final int rollNumber;
  final String status;

  Student({
    required this.id,
    required this.admissionNumber,
    required this.firstName,
    this.middleName,
    required this.lastName,
    required this.dob,
    required this.gender,
    this.bloodGroup,
    required this.className,
    required this.rollNumber,
    required this.status,
  });

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      id: json['id'],
      admissionNumber: json['admission_number'],
      firstName: json['first_name'],
      middleName: json['middle_name'],
      lastName: json['last_name'],
      dob: json['dob'],
      gender: json['gender'],
      bloodGroup: json['blood_group'],
      className: json['class_name'],
      rollNumber: json['roll_number'],
      status: json['status'],
    );
  }

  String get fullName => '$firstName ${middleName ?? ''} $lastName';
}