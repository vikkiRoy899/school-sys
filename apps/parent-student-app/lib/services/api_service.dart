import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'http://localhost:4000/api/v1';
  static String? _token;

  static void setToken(String token) {
    _token = token;
  }

  static Future<Map<String, dynamic>> _request(
    String endpoint,
    Map<String, dynamic>? data, {
    String method = 'GET',
  }) async {
    final url = Uri.parse('$baseUrl$endpoint');
    
    final headers = {
      'Content-Type': 'application/json',
      if (_token != null) 'Authorization': 'Bearer $_token',
    };

    try {
      final response = method == 'POST'
          ? await http.post(url, headers: headers, body: json.encode(data))
          : await http.get(url, headers: headers);

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to load data');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // Authentication
  static Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    return await _request('/auth/login', {
      'email': email,
      'password': password,
    }, method: 'POST');
  }

  static Future<Map<String, dynamic>> redeemOtr({
    required String secretToken,
    required String deviceId,
    required String deviceName,
  }) async {
    return await _request('/auth/redeem-otr', {
      'secret_token': secretToken,
      'device_id': deviceId,
      'device_name': deviceName,
    }, method: 'POST');
  }

  // Students
  static Future<Map<String, dynamic>> getStudents({
    String? className,
    String? status,
    String? search,
  }) async {
    final query = <String>[];
    if (className != null) query.add('className=$className');
    if (status != null) query.add('status=$status');
    if (search != null) query.add('search=$search');
    
    final endpoint = '/students${query.isNotEmpty ? '?${query.join('&')}' : ''}';
    return await _request(endpoint, null);
  }

  static Future<Map<String, dynamic>> getStudentById(String id) async {
    return await _request('/students/$id', null);
  }

  // Attendance
  static Future<Map<String, dynamic>> recordHomeroomAttendance({
    required String sectionId,
    required String date,
    required List<Map<String, dynamic>> records,
  }) async {
    return await _request('/attendance/record-homeroom', {
      'section_id': sectionId,
      'date': date,
      'records': records,
    }, method: 'POST');
  }

  static Future<Map<String, dynamic>> getAttendance({
    String? studentId,
    String? date,
  }) async {
    final query = <String>[];
    if (studentId != null) query.add('studentId=$studentId');
    if (date != null) query.add('date=$date');
    
    final endpoint = '/attendance${query.isNotEmpty ? '?${query.join('&')}' : ''}';
    return await _request(endpoint, null);
  }

  // Exams
  static Future<Map<String, dynamic>> getMarks({
    String? studentId,
  }) async {
    final query = studentId != null ? '?studentId=$studentId' : '';
    return await _request('/exams/marks$query', null);
  }

  // Finance
  static Future<Map<String, dynamic>> getInvoices({
    String? studentId,
    String? status,
  }) async {
    final query = <String>[];
    if (studentId != null) query.add('studentId=$studentId');
    if (status != null) query.add('status=$status');
    
    final endpoint = '/finance/invoices${query.isNotEmpty ? '?${query.join('&')}' : ''}';
    return await _request(endpoint, null);
  }

  static Future<Map<String, dynamic>> collectOfflinePayment({
    required String invoiceId,
    required double amountPaid,
    required String paymentMode,
    String? transactionReference,
  }) async {
    return await _request('/finance/payments/collect-offline', {
      'invoice_id': invoiceId,
      'amount_paid': amountPaid,
      'payment_mode': paymentMode,
      'transaction_reference': transactionReference,
    }, method: 'POST');
  }

  // Memory
  static Future<Map<String, dynamic>> saveMemory({
    required String buildId,
    required String component,
    required String status,
    required Map<String, dynamic> details,
  }) async {
    return await _request('/memory/save', {
      'build_id': buildId,
      'component': component,
      'status': status,
      'details': details,
    }, method: 'POST');
  }

  static Future<Map<String, dynamic>> loadMemory() async {
    return await _request('/memory/load', null);
  }
}