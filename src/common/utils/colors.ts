export class AppColors {
  private static instance: AppColors;

  private constructor() {}

  static getInstance(): AppColors {
    if (!AppColors.instance) {
      AppColors.instance = new AppColors();
    }
    return AppColors.instance;
  }

  getPrimaryColor(): string {
    return '#647FFF';
  }

  getSecondaryColor(): string {
    return '#7F7FFF';
  }

  getGradientColors(): string[] {
    return ['#8A32A9', '#8A00FF'];
  }

  getGradientBlackColors(): string[] {
    return ['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 1)'];
  }

  getGradientTransparentColors(): string[] {
    return ['transparent', 'transparent'];
  }
}
