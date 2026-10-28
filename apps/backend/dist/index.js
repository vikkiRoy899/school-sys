"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const student_routes_js_1 = __importDefault(require("./routes/student.routes.js"));
const attendance_routes_js_1 = __importDefault(require("./routes/attendance.routes.js"));
const exam_routes_js_1 = __importDefault(require("./routes/exam.routes.js"));
const finance_routes_js_1 = __importDefault(require("./routes/finance.routes.js"));
const class_routes_js_1 = __importDefault(require("./routes/class.routes.js"));
const memory_routes_js_1 = __importDefault(require("./routes/memory.routes.js"));
const error_middleware_js_1 = require("./middleware/error.middleware.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
    res.json({
        status: 'online',
        system: 'K-12 School Management API Engine',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});
app.use('/api/v1/auth', auth_routes_js_1.default);
app.use('/api/v1/students', student_routes_js_1.default);
app.use('/api/v1/attendance', attendance_routes_js_1.default);
app.use('/api/v1/exams', exam_routes_js_1.default);
app.use('/api/v1/finance', finance_routes_js_1.default);
app.use('/api/v1/classes', class_routes_js_1.default);
app.use('/api/v1/memory', memory_routes_js_1.default);
app.use(error_middleware_js_1.errorHandler);
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map