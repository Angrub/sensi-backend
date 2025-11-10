import multer from "multer";
import fs from "fs";
import { AppError } from "../errorHandler.middleware.js";

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/images";
        
        // Crear directorio si no existe
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generar nombre único para el archivo
        const uniqueName = `${Date.now()}_${file.originalname}`;
        cb(null, uniqueName);
    }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        'image/jpeg',
        'image/png', 
        'image/gif',
        'image/webp',
        'image/svg+xml'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError(`Tipo de archivo no permitido. Solo se permiten: ${allowedMimes.join(', ')}`), false);
    }
};

// Configuración de multer
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB límite
        files: 5 // Máximo 5 archivos por request
    }
});