import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";


export function Validator(validations: ValidationChain[]) {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		for (const validation of validations) {
			const result = await validation.run(req);
			if (result.context.errors.length) break;
		}

		const errors = validationResult(req);
		if (errors.isEmpty()) { next(); return; }

		res.status(400).json({ errors: errors.array() });
	};
}
